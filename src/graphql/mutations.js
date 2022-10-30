/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBookLikes = /* GraphQL */ `
  mutation CreateBookLikes(
    $input: CreateBookLikesInput!
    $condition: ModelBookLikesConditionInput
  ) {
    createBookLikes(input: $input, condition: $condition) {
      id
      owner
      Book {
        id
        title
        description
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      bookLikesBookId
    }
  }
`;
export const updateBookLikes = /* GraphQL */ `
  mutation UpdateBookLikes(
    $input: UpdateBookLikesInput!
    $condition: ModelBookLikesConditionInput
  ) {
    updateBookLikes(input: $input, condition: $condition) {
      id
      owner
      Book {
        id
        title
        description
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      bookLikesBookId
    }
  }
`;
export const deleteBookLikes = /* GraphQL */ `
  mutation DeleteBookLikes(
    $input: DeleteBookLikesInput!
    $condition: ModelBookLikesConditionInput
  ) {
    deleteBookLikes(input: $input, condition: $condition) {
      id
      owner
      Book {
        id
        title
        description
        price
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      bookLikesBookId
    }
  }
`;
export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
      id
      title
      description
      price
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
      id
      title
      description
      price
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
      id
      title
      description
      price
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
