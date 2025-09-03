# 📝 HD Notes App - React Frontend

A modern, responsive React frontend for the **HD Notes application** that integrates with a **Spring Boot backend**.
This application provides a beautiful user interface for **OTP-based authentication** and **notes management**.

🔗 **Backend Live:** [noteapp-0eu4.onrender.com](https://noteapp-0eu4.onrender.com)
🔗 **Frontend Live:** [note-front-tau.vercel.app](https://note-front-tau.vercel.app/)

---

## ✨ Features

* 📱 **Responsive Design**: Mobile-first, works on all devices
* 🔐 **OTP + JWT Authentication**: Secure login using OTP sent to email
* 📝 **Notes Management**: Create, view, and delete notes
* 🎨 **Modern UI**: Clean and minimal design
* 🔄 **Protected Routes**: Redirects automatically if not authenticated

---

## 📸 Screenshots
https://github.com/Anuragreat/Note_front/blob/main/Screenshot_20250904_001712_Chrome.jpg

Includes:

* **Sign Up**: Register with email
* **Send OTP & Sign In**: Login with OTP (JWT issued after verification)
* **Dashboard**: Manage notes (create, view, delete)

---

## ⚙️ Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* Spring Boot backend running locally (`http://localhost:8080`) or via [deployed backend](https://noteapp-0eu4.onrender.com)

---

## 🛠 Installation

1. **Clone repo**

   ```bash
   git clone https://github.com/Anuragreat/noteapp-frontend.git
   cd noteapp-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Open in browser**

   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── SignUp.js        # User registration
│   ├── SignIn.js        # OTP-based login
│   ├── Dashboard.js     # Notes dashboard
│   └── *.css            # Component styles
├── contexts/
│   └── AuthContext.js   # Handles JWT auth state
├── App.js               # Main app component
└── index.js             # Entry point
```

---

## 🔗 Backend Integration

This frontend works with your **Spring Boot backend APIs**:

### 🔐 Authentication

* `POST /api/auth/signup` → Register new user
* `POST /api/auth/send-otp?email=user@mail.com` → Send OTP
* `POST /api/auth/login` → Login with email + OTP → returns JWT

### 📝 Notes

* `POST /api/notes/add` → Create a new note (requires JWT in headers)
* `GET /api/notes/all/{userId}` → Fetch all notes
* `DELETE /api/notes/delete/{id}` → Delete a note

---

## 📤 Example Requests

### 🔑 Login Request

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### 📝 Create Note Request

```json
{
  "content": "Your note content here"
}
```

---

## 🖌 Styling

* CSS3 with Flexbox & Grid
* Responsive design for both mobile & desktop
* Smooth animations and transitions

---

## 🌍 Browser Support

✅ Chrome, ✅ Firefox, ✅ Safari, ✅ Edge (latest versions)

---

## 🛠 Troubleshooting

* **Backend not connecting** → Check backend is running at port `8080` or update `proxy` in `package.json`
* **Invalid JWT** → Clear localStorage and re-login
* **Port conflict** → Run with custom port:

  ```bash
  PORT=3001 npm start
  ```
