# 🧠 AI Interview Platform

An **AI-powered Interview Practice Platform** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with integrated **speech recognition** and **AI-based interview analysis**.

This project allows users to **create custom mock interviews** by selecting a domain, topics, and question count. Users can **answer questions via speech**, and the app transcribes their responses using **React Speech Recognition**. After the interview, an **AI summary and feedback report** is generated to help improve performance.

---

## 🚀 Features

- 🎯 **Custom Interview Creation**
  - Users can select domain, topics, and number of questions.
  
- 🎤 **Speech-Based Answering**
  - Users answer using their voice, which is converted to text using `react-speech-recognition`.

- 🧾 **AI Summary Generation**
  - After completion, the AI generates a detailed interview summary including strengths, weaknesses, and areas to improve.

- 💾 **Real-Time Data Handling**
  - Uses MongoDB for storing user data, questions, and interview results.

- 🖥️ **Modern UI**
  - Clean and responsive frontend using React + TailwindCSS (or Material UI if applicable).

---

## 🛠️ Tech Stack

### **Frontend**
- React.js (Vite or CRA)
- React Speech Recognition
- Axios (API calls)
- Tailwind CSS / Material UI
- React Router

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- OpenAI API / Gemini API (for AI summary generation)
- JWT Authentication (if implemented)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/gokul8943/Ai-interview-prep.git
cd ai-interview-platform
