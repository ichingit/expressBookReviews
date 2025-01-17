const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
	
	    // Check if both username and password are provided
	    if (username && password) {
	        // Check if the user does not already exist
	        if (!isValid(username)) {
	            // Add the new user to the users array
	            users.push({"username": username, "password": password});
	            return res.status(200).json({message: "User successfully registered. Now you can login"});
	        } else {
	            return res.status(404).json({message: "User already exists!"});
	        }
	    }
	    // Return error if username or password is missing
	    return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
/*public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});*/

public_users.get('/',function (req, res) {
    //res.send(JSON.stringify(books,null,4));
    let myPromise = new Promise((resolve,reject) => {
        res.send(JSON.stringify(books,null,4));
    });
    myPromise.then();
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  //res.send(JSON.stringify(books[isbn],null,4));
  let myPromise = new Promise((resolve,reject) => {
    res.send(JSON.stringify(books[isbn],null,4));
    });
    myPromise.then();
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let myPromise = new Promise((resolve,reject) => {
    let arrbooks = Object.keys(books); 
    for(let i = 0; i < arrbooks.length; i++){
        if (books[i+1].author==author){
        res.send(JSON.stringify(books[i+1],null,4));
        }
        }
  });
    myPromise.then();
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let myPromise = new Promise((resolve,reject) => {
    let arrbooks = Object.keys(books); 
    for(let i = 0; i < arrbooks.length; i++){
        if (books[i+1].title==title){
        res.send(JSON.stringify(books[i+1],null,4));
        }
     }
     });
    myPromise.then();
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews,null,4));
});

module.exports.general = public_users;
