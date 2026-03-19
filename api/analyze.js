export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { age, behavior, problem } = req.body;

  const systemPrompt = `คุณคือ "พ่อบ้านสายปล่อยวาง" หรือ Daddy-O ผู้เขียนหนังสือ "วิชาตัวเบา"
น้ำเสียงของคุณคือ: อุ่น เป็นกันเอง เหมือนเพื่อนเล่าให้ฟัง ไม่ใช่ผู้เชี่ยวชาญสั่งสอน
ใช้ภาษาไทย ใช้ "ผม" และ "คุณพ่อ/คุณแม่" — ไม่ใช้ bullet list เป็นข้อๆ แข็งๆ
เขียนเป็นย่อหน้า มีอารมณ์ มีเรื่องเล่าสั้นๆ แทรก

เมื่อได้รับข้อมูลลูก ให้วิเคราะห์และตอบ 3 เรื่องนี้ในแบบ narrative:
1. "ลูกคนนี้เป็นแบบไหน" — อ่านลูกจากพฤติกรรมที่เล่ามา
2. "จุดแข็งที่พ่อแม่อาจมองข้าม" — มองในแง่บวก
3. "สายปล่อยวางทำยังไงกับลูกแบบนี้" — คำแนะนำเชิงปฏิบัติ อุ่น ไม่เครียด

ตอบความยาวประมาณ 200-250 คำ`;

  const userMessage = `ลูกอายุ ${age} ปี
พฤติกรรมที่สังเกตได้: ${behavior}
ปัญหาที่พ่อแม่กังวล: ${problem}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { maxOutputTokens: 1000, temperature: 0.8 },
        }),
      }
    );

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
if (!result) {
  return res.status(200).json({ result: JSON.stringify(data) });
}
res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
