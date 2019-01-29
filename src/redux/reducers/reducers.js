import Actions from '../actions/actions';

const INITIAL_STATE = {
  customer: '',
  books: []
};

function getSessionStorage() {
  return sessionStorage.getItem('loggedUser') || '';
}

function saveSessionStorage(username) {
  return sessionStorage.setItem('loggedUser', username);
}

const BookReducer = (state = INITIAL_STATE, action) => {
  let bookIndex, newBooks;
  switch (action.type) {

  case Actions.LOGIN:
    saveSessionStorage(action.customer);
    return Object.assign(
      {},
      state,
      {
        ...state,
        customer: action.customer
      }
    );

  case Actions.LOGOUT: 
    saveSessionStorage('');
    return Object.assign(
      {},
      state,
      {
        ...state,
        customer: ''
      }
    );

  case Actions.SET_BOOKS:
    return Object.assign(
      {},
      state,
      {
        ...state,
        books: [...action.books]
      }
    );

  case Actions.ADD_BOOK:
    return Object.assign(
      {},
      state,
      {
        ...state,
        books: [...state.books, action.book]
      }
    );

  case Actions.DELETE_BOOK:
    bookIndex = state.books.findIndex(book => book.id === action.bookId);
    newBooks = state.books;
    newBooks.splice(bookIndex, 1);
    return Object.assign(
      {},
      state,
      {
        ...state,
        books: [...newBooks]
      }
    );

  case Actions.UPDATE_BOOK:
    bookIndex = state.books.findIndex(book => book.id === action.payload.bookId);
    newBooks = state.books;
    newBooks[bookIndex] = action.payload.book;
    return Object.assign(
      {},
      state,
      {
        ...state,
        books: [...newBooks]
      }
    );

  default:
    return Object.assign(
      {},
      state,
      {
        ...state,
        customer: getSessionStorage()
      }
    );
  }
};

export default BookReducer;