# BingBase

This project has both frontend and backend.

##  Folder Structure
project/
├── frontend/ # React UI
└── backend/ # Node.js + Prisma + MySQL API



##  How to Run Backend
cd movies-backend
npm install
npx prisma generate
npm start or npm run dev

##  How to Run Frontend
cd frontend
npm install
npm run dev


##  Environment Variables
Create a `.env` inside backend:

DATABASE_URL=your-database-url
JWT_SECRET=my-secret-key

##  Login / Signup
The app uses JWT authentication:
- After login, a token is stored in `localStorage`
- Every protected API request sends this token as:


##  Features

 User Signup / Login -----> Done 
 Add Movies ----->  Done 
 Update/Delete Movies ---->Done 
 Mark as Weekend Pick ---->  Done 
 View Weekend Picks Page ---> Done 
Favourites   --->pending

## Tech Stack

 Frontend ------> React, TypeScript, Tailwind 
 Backend ------> Node.js, Express 
 Database -----> MySQL + Prisma ORM 
 Auth ----->JWT (JSON Web Token) 


## More about Bingbase:-
BingBase helps users:

->Maintain a personal library of Movies & TV Shows.

->Track their watchlist.

->Quickly update or delete items when preferences change.

->Highlight shows/movies they want to watch on weekends.

->Store data securely with authentication.

->Add movies/Tv shows with details.




## Upcoming Enhancements
Favorites / Like system