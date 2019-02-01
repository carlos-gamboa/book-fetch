import Actions from '../actions/actions';

const INITIAL_STATE = {
  isLoggedIn: false,
  customer: '',
  user: '',
  books: []
};

function getTokenFromLocal() {
  return localStorage.getItem('token') || '';
}

function saveTokenToLocal(token) {
  localStorage.setItem('token', token);
  localStorage.setItem('token-time', new Date().getTime());
}

function removeTokenFromLocal() {
  localStorage.removeItem('token');
}

const BookReducer = (state = INITIAL_STATE, action) => {
  let bookIndex, newBooks;
  switch (action.type) {

  case Actions.SET_LOGGED_IN:
    return Object.assign(
      {},
      state,
      {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        customer: action.payload.customer,
        user: action.payload.username
      }
    );

  case Actions.LOGIN:
    saveTokenToLocal(action.payload.token);
    return Object.assign(
      {},
      state,
      {
        ...state,
        isLoggedIn: true,
        customer: action.payload.customer,
        user: action.payload.username
      }
    );

  case Actions.LOGOUT: 
    removeTokenFromLocal();
    return Object.assign(
      {},
      state,
      {
        ...state,
        isLoggedIn: false,
        customer: '',
        user: ''
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
        isLoggedIn: getTokenFromLocal() !== ''
      }
    );
  }
};

export default BookReducer;