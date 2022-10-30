/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBookLikes = /* GraphQL */ `
  subscription OnCreateBookLikes(
    $filter: ModelSubscriptionBookLikesFilterInput
    $owner: String
  ) {
    onCreateBookLikes(filter: $filter, owner: $owner) {
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
export const onUpdateBookLikes = /* GraphQL */ `
  subscription OnUpdateBookLikes(
    $filter: ModelSubscriptionBookLikesFilterInput
    $owner: String
  ) {
    onUpdateBookLikes(filter: $filter, owner: $owner) {
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
export const onDeleteBookLikes = /* GraphQL */ `
  subscription OnDeleteBookLikes(
    $filter: ModelSubscriptionBookLikesFilterInput
    $owner: String
  ) {
    onDeleteBookLikes(filter: $filter, owner: $owner) {
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
export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook($filter: ModelSubscriptionBookFilterInput) {
    onCreateBook(filter: $filter) {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook($filter: ModelSubscriptionBookFilterInput) {
    onUpdateBook(filter: $filter) {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook($filter: ModelSubscriptionBookFilterInput) {
    onDeleteBook(filter: $filter) {
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
