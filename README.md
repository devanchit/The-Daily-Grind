# ☕ The Daily Grind

**The Daily Grind** is a full-stack blogging web application that allows users to create, publish, read, and manage blog posts. It provides a simple and user-friendly platform for sharing ideas, experiences, and knowledge.

## 🚀 Features

- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
- **Create Blog Posts:** Authenticated users can create and publish their own blog posts.
- **View Blog Posts:** Browse and read published articles.
- **Manage Posts:** Users can manage their own blog posts.
- **Protected Routes:** Restrict access to authorized users using authentication middleware.
- **Responsive UI:** Clean and user-friendly interface.

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT Authentication

**Database**
- MongoDB
- Mongoose

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/Home%20Page.png)

### Create New Post
![Create Post](./screenshots/Create%20Post.png)

### Login Page
![Login Page](./screenshots/Login%20page.png)

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/devanchit/The-Daily-Grind/
```

### 2. Navigate to the project directory

```bash
cd The-Daily-Grind
```

### 3. Install dependencies

Install frontend and backend dependencies separately:

```bash
npm install
```

Run this command in each application directory containing a `package.json`.

### 4. Configure environment variables

Create a `.env` file in the backend directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your actual configuration.

### 5. Run the application

Start the backend:
Inside api folder

```bash
npx nodemon index.js
```

Start the frontend from its respective directory: client

```bash
npm start
```

*Note: Update the commands according to the scripts defined in your package.json files.*

## 🔐 Authentication

The application uses JWT-based authentication.

- Users authenticate using their credentials.
- The backend generates a JWT after successful authentication.
- The token is used to authenticate requests to protected API endpoints.
- Middleware verifies the token before granting access to protected resources.

## 📂 Project Structure

```text
The-Daily-Grind/
│
├── client/              # React frontend
│   ├── src/
│   └── package.json
│
├── api/                 # Node.js / Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
└── README.md
```

*Adjust the folder structure to match your actual repository.*

## 🔮 Future Enhancements

- Search and filter blog posts.
- Categories and tags.
- Like and bookmark functionality.
- Comment system.
- User profile management.
- Pagination.
- Dark mode.

## 👨‍💻 Author

**Devansh**

- GitHub: https://github.com/devanchit/

---

If you find this project useful, feel free to star the repository!