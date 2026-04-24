# Movie Tracker App 🎬

A fullstack Movie Tracker application focused on managing movie reviews. The frontend allows users to create, update, delete, and filter reviews, while movies and users are handled through API requests using tools like Postman.

## Problem
This app solves the everyday problem of remembering and organizing movie experiences by allowing users to store, manage, and filter reviews by user or movie.


## Setup (Run in under 5 minutes)

### 1. Clone the repository
```bash
git clone https://github.com/DanielAbbasi21/Movie-tracker-app.git
cd Movie-tracker-app
```

### 2. Install dependencies
```bash
npm install
cd server
npm install
cd ../client
npm install
```

## Database Setup

To run this project, you need a MongoDB connection string.

You can create one for free using MongoDB Atlas:
https://www.mongodb.com/atlas

Add your connection string to the `.env` file in the server folder.

### 3. Environment variables
- Create a .env file inside the server folder and add:
```env
CONNECTION_URL=your_mongodb_connection_string
PORT=5000
```

### 4. Run the application
```bash
cd ..
npm run dev
```

### 5. Open in browser
```
http://localhost:5173
```
-------------------------------------------------------------------------------
### API Usage
Base URL:
http://localhost:5000/api

Movies and users are created via API requests (e.g. using Postman).

### User Endpoints
#### Create User
POST /users
```json
{
  "username": "Daniel",
  "email": "daniel@test.com",
  "password": "123456"
}
```
Note: The password field is currently not used for authentication, but is included for potential future functionality.

#### Update User
PUT /users/:id
```json
{
  "username": "NewName"
}
```

#### Delete User
DELETE /users/:id

(No body required)

-----------------------------------------------------------------------------------

### Movie Endpoints

#### Create Movie
POST /movies
```json
{
  "title": "Scream",
  "genre": "Horror",
  "rating": 9
}
```

#### Update Movie
PUT /movies/:id
```json
{
  "rating": 10
}
```

#### Delete Movie
DELETE /movies/:id

(No body required)


## Features
- Create reviews
- Update reviews
- Delete reviews
- Filter reviews by user
- Filter reviews by movie
- Auto-refresh reviews

### Author
Daniel Owliazadehabbasi
