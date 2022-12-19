import React, { useEffect, useState } from 'react'
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify'
import { createBook } from './graphql/mutations'
import { listBooks } from './graphql/queries'

import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Text, TextField, Flex, Button, ThemeProvider } from '@aws-amplify/ui-react';

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import BookList from './components/BookList'
Amplify.configure(awsExports);

const initialState = { title: '', description: '', price: 0.0 }


const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [books, setBooks] = useState([])
  const [jwt, setJwt] = useState('')
  const [globalJwt, setGlobalJwt] = useState('')



  const [loggedUsername, setLoggedUsername] = useState('')
  const [loggedUserGroups, setLoggedUserGroups] = useState([])


  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
    setGlobalJwt('')
    setJwt('')
    Auth.currentAuthenticatedUser()
      .then(sess => {
        console.log(sess.signInUserSession.idToken.payload['cognito:groups']);
        setLoggedIn(true);
        setLoggedUsername(sess.attributes.email);
        setLoggedUserGroups(sess.signInUserSession.idToken.payload['cognito:groups']);
        setGlobalJwt(sess.signInUserSession.accessToken.jwtToken);
      })
      .catch(() => {
        console.log('not logged in');
        setLoggedUserGroups([]);
        setLoggedUsername('');
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

      let currentAuthMode = "AWS_IAM"

      await Auth.currentAuthenticatedUser()
        .then(sess => {
          currentAuthMode = "AMAZON_COGNITO_USER_POOLS"
        })
        .catch(() => {
          console.log('not logged in');
        });


        console.log("fetching books using authmode:" + currentAuthMode)

        const token = await API.get("token", "/token");

        setJwt(token.access_token);



      const bookData = await API.graphql(
        ({
          query: listBooks,
          authMode: currentAuthMode,
        }))
      const books = bookData.data.listBooks.items
      setBooks(books)
    } catch (err) { console.log('error fetching books' + err) }
  }

  async function addBook() {
    try {
      if (!formState.title || !formState.description || !formState.price) return
      const book = { ...formState }
      console.log(book)

      setBooks([...books, book])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createBook, { input: book }))
    } catch (err) {
      console.log('error creating book:', err)
    }
  }

  return (
    <ThemeProvider>

      <Router forceRefresh={true}>
        <div className="App">
          <header className="App-header">
            
            <span style={{ fontSize: 10}}>
              <p  style={{ fontWeight: "bold"}}>
              Lambda Tokn  (client credentials proxied through a lamnda but accessed through cognito unauthenticated token)
              </p>
              <p>{jwt}</p>

            </span>
       
            <span style={{ fontSize: 10}}>
            <p style={{ fontWeight: "bold", width: "100%"}}>
              Cognito Token (access token directly from cognito user pool authentication)
            </p>
            <p>{globalJwt}</p>
            </span>
            {loggedIn ? (

              <>
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  alignItems="stretch"
                  alignContent="flex-start"
                  wrap="nowrap"
                  gap="1rem"
                >

                  <Text>
                    {loggedUsername} {loggedUserGroups}
                  </Text>
                  <Button onClick={signOut} variant="contained" color="primary">
                    Log Out
                  </Button>

                </Flex>

              </>
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
                    placeholder="Title"
                  />
                  <TextField
                    onChange={event => setInput('description', event.target.value)}
                    value={formState.description}
                    placeholder="Description"
                  />

                  <TextField
                    onChange={event => setInput('price', event.target.value)}
                    value={formState.price}
                    placeholder="Price"
                    type="number" min="0.00" max="10000.00" step="0.01"
                  />
                  <Button onClick={addBook}>Create Book</Button>

                  <BookList books={books} />
                </>)
                : (<BookList books={books} />)}

            ></Route>


            <Route path="/signin" element={<SignIn onSignin={assessLoggedInState} />} />
          </Routes>

        </div>
      </Router>
    </ThemeProvider>
  )
}


export default App;
