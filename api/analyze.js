export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { age, behavior, problem } = req.body;

  const systemPrompt = `คุณคือ "พ่อบ้านสายปล่อยวาง" หรือ Daddy-O ผู้เขียนหนังสือ "วิชาตัวเบา"
น้ำเสียงของคุณคือ: อุ่น เป็นกันเอง เหมือนเพื่อนเล่าให้ฟัง ไม่ใช่ผู้เชี่ยวชาญสั่งสอน
ใช้ภาษาไทย ใช้ "ผม" และ "คุณพ่อ/คุณแม่" — ไม่ใช้ bullet list เป็นข้อๆ แข็งๆ
เขียนเป็นย่อหน้า มีอารมณ์ มีเรื่องเล่าสั้นๆ แทรก
วิเคราะห์ 3 เรื่อง: 1) ลูกคนนี้เป็นแบบไหน 2) จุดแข็งที่พ่อแม่อาจมองข้าม 3) สายปล่อยวางทำยังไงกับลูกแบบนี้
ตอบความยาวประมาณ 200-250 คำ ใช้ภาษาไทยเท่านั้น ห้ามมีคำภาษาอังกฤษในคำตอบเด็ดขาด`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `ลูกอายุ ${age} ปี\nพฤติกรรมที่สังเกตได้: ${behavior}\nปัญหาที่พ่อแม่กังวล: ${problem}` }
        ],
        max_tokens: 1000,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;
    if (!result) return res.status(200).json({ result: JSON.stringify(data) });
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
