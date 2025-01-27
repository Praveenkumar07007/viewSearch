# SearchView

SearchView is a full-stack application that allows users to search and browse questions from an external API. The application features a search bar, a paginated list of questions, and a responsive design using Tailwind CSS.

## Prerequisites

- Node.js
- npm
- grpc
- MongoDB (running locally or accessible remotely)

## Getting Started

### Backend Setup

1.**Navigate to the backend directory**:
   ```
   cd backend
  ```

2. **Install the dependency and node modules**:
```
   npm install
```

3. **Create a .env file in the backend directory and add the following environment variables**:

```
  DB_NAME=your_database_name
  MONGODB_URI=mongodb://localhost:27017
```

4. **import that json file into database**:

5. **client request**
 ```
 {
    "query":"hy", // keyword you want to search
    "page":6, // this will ignore first 5 page document of mongodb and it will be show 6 page
    "limit":2 // on the page how many document you want
}
```

### Frontend Setup

1. **Navigate to the frontend directory**:
```
    cd frontend
```

2. install the dependency :
```
  npm install
```

3.  start the frontend developement server :

```
  npm run dev
```

### Project Structure
## Backend
```
backend/
├── .env
├── .gitignore
├── package.json
├── proto/
│   └── questions.proto
├── server.js
├── src/
│   ├── db/
│   │   └── database.js
│   ├── models/
│   │   └── question.model.js
│   ├── services/
│   │   └── question.service.js
│   └── utils/
│       └── importData.js
```

## Frontend

```
  frontend/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── App.jsx
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Pagination.jsx
│   │   ├── QuestionList.jsx
│   │   ├── SearchBar.jsx
│   ├── index.css
│   ├── main.jsx
├── tailwind.config.js
└── vite.config.js
```
