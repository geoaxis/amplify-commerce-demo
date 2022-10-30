import React, { useEffect, useState } from 'react'
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify'
import { createBook, updateBook } from './graphql/mutations'
import { listBooks } from './graphql/queries'
import { Button, TextField } from '@aws-amplify/ui-react'

import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { title: '', description: '', price: 0.0 }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [books, setBooks] = useState([])


  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
    console.log("asses")
    Auth.currentAuthenticatedUser()
      .then(sess => {
        console.log('logged in');
        setLoggedIn(true);
      })
      .catch(() => {
        console.log('not logged in');
        setLoggedIn(false);
      });
  };
  useEffect(() => {
    assessLoggedInState();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };


  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchBooks() {
    try {
      const bookData = await API.graphql(
        ( {query: listBooks, authMode: 'AWS_IAM' }))
      const books = bookData.data.listBooks.items
      setBooks(books)
      console.log(books)
    } catch (err) { console.log('error fetching books' + err) }
  }

  async function addBook() {
    try {
      console.log(formState.price)
      if (!formState.title || !formState.description || !formState.price) return
      const book = { ...formState }
      setBooks([...books, book])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createBook, { input: updateBook }))
    } catch (err) {
      console.log('error creating book:', err)
    }
  }

  return (

    <Router>
      <div className="App">
        <header className="App-header">
          {loggedIn ? (
            <Button onClick={signOut} variant="contained" color="primary">
              Log Out
            </Button>
          ) : (
            <Link to="/signin">
              <Button variant="contained" color="primary">
                Log In
              </Button>
            </Link>
          )}
        </header>
        <Routes>

        <Route exact path="/" element={
loggedIn ? (
  <>
  <TextField
    onChange={event => setInput('title', event.target.value)}
    value={formState.title}
    placeholder="Title" />
  <TextField
    onChange={event => setInput('description', event.target.value)}
    value={formState.description}
    placeholder="Description" /><TextField
    onChange={event => setInput('price', event.target.value)}
    value={formState.price}
    placeholder="Price"
    type="number" min="0.00" max="10000.00" step="0.01" />

  <Button onClick={addBook}>Create Book</Button>
  </>)
  : (<></>)}
/* 
  {
    books.map((book, index) => (
      <div key={book.id ? book.id : index}>
        <p>{book.name}</p>
        <p>{book.description}</p>
        <p>{book.price}</p>
      </div>
    ))} */

        ></Route>


        <Route path="/signin" element={<SignIn onSignin={assessLoggedInState} />} />
        </Routes>

      </div>
    </Router>
  )
}


export default App;
