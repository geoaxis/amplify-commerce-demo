import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createBook, updateBook } from './graphql/mutations'
import { listBooks } from './graphql/queries'
import {  Authenticator } from '@aws-amplify/ui-react'


import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { title: '', description: '' , price: 0.0}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchBooks() {
    try {
      const bookData = await API.graphql(graphqlOperation(listBooks))
      const books = bookData.data.listBooks.items
      setBooks(books)
    } catch (err) { console.log('error fetching books'+ err) }
  }

  async function addBook() {
    try {
      console.log(formState.price)
      if (!formState.title || !formState.description || !formState.price ) return
      const book = { ...formState }
      setBooks([...books, book])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createBook, {input: updateBook}))
    } catch (err) {
      console.log('error creating book:', err)
    }
  }

  return (

    <Authenticator>
      {({ signOut, user }) => (
  


    <div style={styles.container}>

      <button onClick={signOut}>Sign out</button>

      <h2>Amplify Books</h2>
      <input
        onChange={event => setInput('title', event.target.value)}
        style={styles.input}
        value={formState.title}
        placeholder="Title"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />

     <input
        onChange={event => setInput('price', event.target.value)}
        style={styles.input}
        value={formState.price}
        placeholder="Price"
        type="number" min="0.00" max="10000.00" step="0.01"
      />
      <button style={styles.button} onClick={addBook}>Create Book</button>
      {
        books.map((book, index) => (
          <div key={book.id ? book.id : index} style={styles.book}>
            <p style={styles.bookName}>{book.name}</p>
            <p style={styles.bookDescription}>{book.description}</p>
            <p style={styles.bookPrice}>{book.price}</p>
          </div>
        ))
      }
    </div>
          )}
          </Authenticator>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  book: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  bookName: { fontSize: 20, fontWeight: 'bold' },
  bookDescription: { marginBottom: 0 },
  bookPrice: { marginBottom: 0 },

  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App;
