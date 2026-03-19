# วิเคราะห์ลูกฉัน · วิชาตัวเบา

## โครงสร้างไฟล์

```
vicha-app/
├── api/
│   └── analyze.js      ← รับข้อมูลจากหน้าเว็บ แล้วเรียก Gemini
├── src/
│   ├── main.jsx        ← entry point
│   └── App.jsx         ← หน้าแอปหลัก
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## วิธี Deploy (ทำครั้งเดียว)

### ขั้นที่ 1 — สมัคร Gemini API Key (ฟรี)
1. ไปที่ https://aistudio.google.com
2. กด "Get API Key" → "Create API Key"
3. คัดลอก key ไว้

### ขั้นที่ 2 — อัปโหลดขึ้น GitHub
1. ไปที่ https://github.com → สมัครถ้ายังไม่มี account
2. กด "New repository" → ตั้งชื่อ เช่น `vicha-app` → กด Create
3. ลาก folder `vicha-app` ทั้งหมดวางใน GitHub (หรือใช้ GitHub Desktop)

### ขั้นที่ 3 — Deploy บน Vercel
1. ไปที่ https://vercel.com → Sign up ด้วย GitHub account
2. กด "Add New Project" → เลือก repo `vicha-app`
3. กด Deploy (รอประมาณ 1 นาที)

### ขั้นที่ 4 — ใส่ Gemini API Key
1. ใน Vercel Dashboard → เลือกโปรเจกต์ → Settings
2. กด "Environment Variables"
3. ใส่:
   - Name: `GEMINI_API_KEY`
   - Value: (วาง key ที่คัดลอกไว้)
4. กด Save → แล้วกด Redeploy

### เสร็จแล้ว!
ได้ลิงก์แบบ `vicha-app.vercel.app` — แชร์ใน Facebook ได้เลย

## ค่าใช้จ่าย
- Vercel: ฟรี
- Gemini API: ฟรี 1,500 calls/วัน
- รวม: $0/เดือน
