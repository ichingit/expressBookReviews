const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user) => {
    return user.username === username;
     });
 
     if (userswithsamename.length > 0) {
     return true;
     } else {
     return false;
     }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
});

if (validusers.length > 0) {
    return true;
} else {
    return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

    if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
	}

    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
    }
    return res.status(200).send("User successfully logged in");
	    } else {
	        return res.status(208).json({ message: "Invalid Login. Check username and password" });
	    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.session.authorization['username'];
  const isbn = req.params.isbn;
  let book = books[isbn];
  //book["reviews"] = {username :req.body.review};
  book["reviews"][username]=req.body.review;
  /*let keys = Object.keys(book["reviews"]);
  for(let i = 0; i < keys.length; i++){
    if (keys[i]==username){
    book["reviews"][username]=req.body.review;
    //res.send(JSON.stringify(book["reviews"][username],null,4));
    res.send(JSON.stringify(books[isbn],null,4));
  }else{
    book["reviews"][username]=req.body.review;
  }

  }*/
  res.send(JSON.stringify(books[isbn],null,4));
  //res.send(JSON.stringify(book["reviews"],null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
