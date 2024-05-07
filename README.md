Todo App
This is a full-stack web application built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. The application allows users to manage projects and todos within those projects.

Features
-User Authentication: Users can sign up and log in securely using JWT authentication.
-Add Projects: Users can create new projects to organize their todos.
-Add Todos: Users can add todos to their projects with descriptions and statuses (pending/completed).
-Mark Todos as Completed: Users can mark todos as completed when they are done.
-Delete Projects and Todos: Users have the ability to delete both projects and individual todos.
-Update Todo Descriptions: Users can update the descriptions of existing todos.

Installation and Setup
1.Clone the repository:
  git clone:(https://github.com/Ashfaque-calicut/todo.git)
2.Install dependencies:
  cd frontend
  npm install
  cd ../backend
  npm install
3.Set up environment variables:Create a .env file in the backend directory and add the following variables:
  PORT=4000
  MONGODB_URI=<your_mongodb_uri>
  JWT_SECRET=<your_jwt_secret>
4.Run the development server:
  cd backend
  npm start
5.Access the application:Open your web browser and navigate to http://localhost:4000.

Technologies Used
-Frontend: React.js, Axios
-Backend: Node.js, Express.js, MongoDB
-Authentication: JSON Web Tokens (JWT)
-Styling: CSS


