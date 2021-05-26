// Intro
// Authentication & Authorization
// passport is a prebuilt strategy/middleware for authentication

// Authentication is identifying who a particular user is, we typically make use of username/password to do that or in advance facial recoginition.
// Auhtorization determines the users access wheather to access a particular resource or not. like a simple user and admin has different powers and access.


// Concept-1
// How to Store Passwords

// # Rule-1 Never Store Passwords as text in DB.
// example this is a very bad practice
const sensitiveDatainDB=[
  {
  username: 'someUser1',
  password: 'user1Pass'
  },
  {
    username: 'someUser2',
    password: 'user2Pass'
  }
]

// # Rule-2 Cryptographical Hashing the password and store the result of Hashed function in DB
// even if hashed string is leaked the hacker cannot generate the original password from it
// i.e Hashing cannot be Reversed.
// similar to one way function is absolute value const x=44 ; and then Math.abs(x) then we cannot find what the initial value of x was.
// small change in original password the hashed ouptut changes drastically.
// hashed function gave same output for same input every time.
// very unlikely to find 2 outputs with same value
// password hash functions are slow.

// # Passwords Salts Rule-3
// an extra step in hashing
// a ingredient added by the owner to the hashed password , this ingredient is highly random and is appended in middle or last or start of the hashed password.
// so when someone login we add that salt to the entered password and then compare with the hashed password in DB as we had appendde the salt at the time of hashing and storing the passowrd in DB.

// ---------------------------------------------------------------------------------------------------------------

// Introduction to bcrypt
