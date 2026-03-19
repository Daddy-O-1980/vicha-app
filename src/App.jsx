import { useState } from "react";

const COLORS = {
  green: "#1a3c34",
  gold: "#c5a059",
  cream: "#fcfaf5",
  body: "#3a3530",
  subtitle: "#888",
  footer: "#aaa",
};

export default function App() {
  const [form, setForm] = useState({ age: "", behavior: "", problem: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyze = async () => {
    if (!form.age || !form.behavior || !form.problem) return;
    setLoading(true);
    setResult("");
    setSubmitted(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setResult(data.result || "ไม่สามารถวิเคราะห์ได้ในขณะนี้");
    } catch {
      setResult("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
    setLoading(false);
  };

  const reset = () => {
    setForm({ age: "", behavior: "", problem: "" });
    setResult("");
    setSubmitted(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Noto Serif Thai', serif", padding: "0 0 60px" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.green}, #2d5e4e, ${COLORS.green})`, padding: "32px 24px 28px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: COLORS.gold, letterSpacing: 3, marginBottom: 8, fontFamily: "Anuphan, sans-serif", textTransform: "uppercase" }}>
          วิชาตัวเบา · เครื่องมือพิเศษ
        </div>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>วิเคราะห์ลูกฉัน</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0, lineHeight: 1.7 }}>
          บอกเรื่องลูกให้ผมฟัง<br />แล้วผมจะอ่านลูกคุณในแบบสายปล่อยวาง
        </p>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 20px" }}>
        {/* Form */}
        {!submitted && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, marginTop: 28, boxShadow: "0 2px 20px rgba(26,60,52,0.08)", border: `1px solid ${COLORS.gold}22` }}>
            <Field label="ลูกอายุเท่าไหร่?" hint="เช่น 4, 7, 10">
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="อายุ (ปี)"
                type="number"
                style={inputStyle}
              />
            </Field>
            <Field label="พฤติกรรมที่สังเกตได้?" hint="เล่าอิสระ ยิ่งละเอียดยิ่งดี">
              <textarea
                name="behavior"
                value={form.behavior}
                onChange={handleChange}
                placeholder="เช่น ชอบอยู่คนเดียว ไม่ค่อยพูด แต่ถ้าทำอะไรสนุกจะโฟกัสได้นาน..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Field>
            <Field label="สิ่งที่คุณพ่อ/แม่กังวล?" hint="พูดตรงๆ ได้เลย">
              <textarea
                name="problem"
                value={form.problem}
                onChange={handleChange}
                placeholder="เช่น กลัวว่าลูกจะเข้าสังคมไม่เก่ง หรือเรียนไม่ทันเพื่อน..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Field>
            <button
              onClick={analyze}
              disabled={!form.age || !form.behavior || !form.problem}
              style={{
                width: "100%",
                padding: "14px",
                background: (!form.age || !form.behavior || !form.problem) ? "#ccc" : COLORS.green,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                fontFamily: "'Noto Serif Thai', serif",
                fontWeight: 700,
                cursor: (!form.age || !form.behavior || !form.problem) ? "not-allowed" : "pointer",
                marginTop: 8,
              }}
            >
              ให้พ่อบ้านอ่านลูกให้หน่อย →
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>☕</div>
            <p style={{ color: COLORS.subtitle, fontSize: 14 }}>กำลังอ่านลูกคุณอยู่นะครับ...</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ marginTop: 28 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 20px rgba(26,60,52,0.08)", borderLeft: `4px solid ${COLORS.gold}` }}>
              <div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: 2, fontFamily: "Anuphan, sans-serif", marginBottom: 16, textTransform: "uppercase" }}>
                จากพ่อบ้านสายปล่อยวาง
              </div>
              <div style={{ color: COLORS.body, fontSize: 14.5, lineHeight: 2, whiteSpace: "pre-wrap" }}>
                {result}
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${COLORS.gold}22`, display: "flex", gap: 12 }}>
                <button onClick={reset} style={{ flex: 1, padding: "11px", background: "transparent", border: `1.5px solid ${COLORS.green}`, color: COLORS.green, borderRadius: 8, fontSize: 13, fontFamily: "'Noto Serif Thai', serif", cursor: "pointer" }}>
                  ← วิเคราะห์ลูกอีกคน
                </button>
                <button
                  onClick={() => navigator.clipboard?.writeText(result)}
                  style={{ flex: 1, padding: "11px", background: COLORS.gold, border: "none", color: "#fff", borderRadius: 8, fontSize: 13, fontFamily: "'Noto Serif Thai', serif", cursor: "pointer" }}
                >
                  คัดลอกผล
                </button>
              </div>
            </div>

            {/* Soft CTA */}
            <div style={{ background: COLORS.green, borderRadius: 12, padding: "20px 24px", marginTop: 16, textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: "0 0 4px", lineHeight: 1.8 }}>
                อยากรู้ลึกกว่านี้ อ่าน <strong style={{ color: COLORS.gold }}>วิชาตัวเบา</strong>
              </p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, margin: 0 }}>
                ฉบับพ่อบ้านสายปล่อยวาง · by Daddy-O
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: 40, color: COLORS.footer, fontSize: 11, fontFamily: "Anuphan, sans-serif" }}>
        วิชาตัวเบา © Daddy-O
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", color: "#1a3c34", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{label}</label>
      {hint && <p style={{ color: "#888", fontSize: 11, margin: "0 0 8px", fontFamily: "Anuphan, sans-serif" }}>{hint}</p>}
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid #e0d8c8",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "'Noto Serif Thai', serif",
  color: "#3a3530",
  background: "#fcfaf5",
  outline: "none",
  boxSizing: "border-box",
  lineHeight: 1.7,
};
