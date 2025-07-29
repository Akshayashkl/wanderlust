# 🌍 Wanderlust — Discover Unique Stays

**Wanderlust** is a full-stack web application inspired by Airbnb. It allows users to explore, create, edit, and delete vacation rental listings. Built using the MERN stack (minus React), this project demonstrates practical implementation of RESTful routing, dynamic templating, and form validations.

---

## 🛠️ Tech Stack

- **Frontend**: EJS, Bootstrap 5, Custom CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Templating**: EJS + EJS-Mate for layout inheritance
- **Utilities**: Method-Override, CORS, Joi (validation), Custom error handling

---

## ✨ Features

- 🔍 View all listings
- 🏡 Show detailed listing pages
- ✍️ Create, edit, and delete listings
- 🛡️ Server-side validation with Joi
- ⚠️ Custom error pages for 404 and server-side errors
- 📦 RESTful routing structure

---

## 🗂️ Project Structure

wanderlust/
├── models/ # Mongoose schemas (listing.js)
├── public/ # Static files (CSS, client-side JS)
├── utils/ # Custom utilities (error classes, wrappers)
├── views/
│ ├── layouts/ # EJS layout files
│ ├── listings/ # All listing-related templates
│ └── error.ejs # Global error template
├── app.js # Entry point and route definitions
├── schema.js # Joi schema for listing validation
├── package.json


---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Steps to Run Locally

```bash
# Clone the repository
git clone https://github.com/Akshayashkl/wanderlust.git
cd wanderlust

# Install dependencies
npm install

# Start the server (with nodemon if installed)
npm run dev

# Open your browser
http://localhost:8080

