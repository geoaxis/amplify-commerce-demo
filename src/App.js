import React, { useEffect, useState } from 'react'
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify'
import { createBook, updateBook } from './graphql/mutations'
import { listBooks } from './graphql/queries'

import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Text, TextField, Flex, Button, ThemeProvider } from '@aws-amplify/ui-react';
import axios, {isCancel, AxiosError} from 'axios';
import crypto from 'crypto-js';


import moment from 'moment'

import "@aws-amplify/ui-react/styles.css";




import awsExports from "./aws-exports";
import BookList from './components/BookList'
Amplify.configure(awsExports);

const initialState = { title: '', description: '', price: 0.0 }


async function send(access_key, secret_key) {         
  const method = 'GET';
  const service = 'execute-api';
  const host = 'ey2mddza4h.execute-api.eu-west-1.amazonaws.com';
  const region = 'eu-west-1';
  const base = "https://"
  const content_type = 'application/json';

  // DynamoDB requires an x-amz-target header that has this format:
  //     DynamoDB_<API version>.<operationName>
  const amz_target = '';

  function getSignatureKey(key, dateStamp, regionName, serviceName) {
      var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
      var kRegion = crypto.HmacSHA256(regionName, kDate);
      var kService = crypto.HmacSHA256(serviceName, kRegion);
      var kSigning = crypto.HmacSHA256("aws4_request", kService);
      return kSigning;
  }

  // ************* TASK 1: CREATE A CANONICAL REQUEST *************
  // http://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html

  // Step 1 is to define the verb (GET, POST, etc.)--already done.

  // Step 2: Create canonical URI--the part of the URI from domain to query 
  // string (use '/' if no path)
  // Create a date for headers and the credential string
  const amz_date = moment().utc().format("yyyyMMDDThhmmss") + "Z"
  const date_stamp =  moment().utc().format("yyyyMMDD")

  //// Step 3: Create the canonical query string. In this example, request
  // parameters are passed in the body of the request and the query string
  // is blank.

  const canonical_uri = '/token'

  const canonical_querystring = ''
  const request_parameters = ''

  //## DOing step 6 first so that I can include the payload hash in the cannonical header, per https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html
  // Step 6: Create payload hash. In this example, the payload (body of
  // the request) contains the request parameters.
  //const payload_hash = hashlib.sha256(request_parameters.encode('utf-8')).hexdigest()
  const payload_hash = crypto.SHA256(request_parameters);

  // Step 4: Create the canonical headers. Header names must be trimmed
  // and lowercase, and sorted in code point order from low to high.
  // Note that there is a trailing \n.
  const canonical_headers = 'host:' + host + '\n' + 'x-amz-content-sha256:' + payload_hash + '\n' + 'x-amz-date:' + amz_date + '\n'
  
  // Step 5: Create the list of signed headers. This lists the headers
  // in the canonical_headers list, delimited with ";" and in alpha order.
  // Note: The request can include any headers; canonical_headers and
  // signed_headers include those that you want to be included in the
  // hash of the request. "Host" and "x-amz-date" are always required.
  const signed_headers = 'host;x-amz-content-sha256;x-amz-date'

  // Step 7: Combine elements to create canonical request
  const canonical_request = method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash

  // ************* TASK 2: CREATE THE STRING TO SIGN*************
  // Match the algorithm to the hashing algorithm you use, either SHA-1 or
  // SHA-256 (recommended)
  const algorithm = 'AWS4-HMAC-SHA256'
  const credential_scope = date_stamp + '/' + region + '/' + service + '/' + 'aws4_request'
  const string_to_sign = algorithm + '\n' +  amz_date + '\n' +  credential_scope + '\n' +  crypto.SHA256(canonical_request);

  // ************* TASK 3: CALCULATE THE SIGNATURE *************
  // Create the signing key using the function defined above.
  const signing_key = getSignatureKey(secret_key, date_stamp, region, service)

  // Sign the string_to_sign using the signing_key
  const signature = crypto.HmacSHA256(string_to_sign, signing_key);
  // ************* TASK 4: ADD SIGNING INFORMATION TO THE REQUEST *************
  // Put the signature information in a header named Authorization.
  const authorization_header = algorithm + ' ' + 'Credential=' + access_key + '/' + credential_scope + ', ' +  'SignedHeaders=' + signed_headers + ', ' + 'Signature=' + signature

  // For DynamoDB, the request can include any headers, but MUST include "host", "x-amz-date",
  // "x-amz-target", "content-type", and "Authorization". Except for the authorization
  // header, the headers must be included in the canonical_headers and signed_headers values, as
  // noted earlier. Order here is not significant.
  const headers = {
      'X-Amz-Content-Sha256':payload_hash, 
      'X-Amz-Date':amz_date,
      //'X-Amz-Target':amz_target,
      'Authorization':authorization_header,
      'Content-Type':content_type
  }

  // ************* SEND THE REQUEST *************
  var response = await axios({
      method: method,
      baseURL: base + host, 
      url: canonical_uri,
      data:request_parameters,
      headers: headers,
  });
  console.log(response)
}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [books, setBooks] = useState([])
  const [loggedUsername, setLoggedUsername] = useState('')
  const [loggedUserGroups, setLoggedUserGroups] = useState([])


  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then(sess => {
        console.log(sess.signInUserSession.idToken.payload['cognito:groups']);
        setLoggedIn(true);
        setLoggedUsername(sess.attributes.email);
        setLoggedUserGroups(sess.signInUserSession.idToken.payload['cognito:groups']);
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
          console.log('logged in');
          currentAuthMode = "AMAZON_COGNITO_USER_POOLS"
        })
        .catch(() => {
          console.log('not logged in');
        });

      let cred = await Auth.currentCredentials();

       send(cred.accessKeyId, cred.secretAccessKey);

 


        console.log("fetching books using authmode:" + currentAuthMode)


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
