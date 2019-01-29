import Actions from '../actions/actions';

const INITIAL_STATE = {
  customer: '',
  books: [
    {
      name: 'The Raven',
      author: 'Edgar Allan Poe',
      id: 'a1'
    },
    {
      name: 'The Black Cat',
      author: 'Edgar Allan Poe',
      id: 'a2'
    },
    {
      name: 'The Black Cat 2 ',
      author: 'Edgar Allan Poe',
      id: 'a3'
    },
    {
      name: 'The Black Cat 3',
      author: 'Edgar Allan Poe',
      id: 'a4'
    },
    {
      name: 'The Black Cat 4',
      author: 'Edgar Allan Poe',
      id: 'a5'
    },
    {
      name: 'The Black Cat 5',
      author: 'Edgar Allan Poe',
      id: 'a6'
    }
  ]
};

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('counterAppData'));
}

function saveLocalStorage(newState) {
  return localStorage.setItem('counterAppData', JSON.stringify(newState));
}

function getSessionStorage() {
  return sessionStorage.getItem('loggedUser') || '';
}

function saveSessionStorage(username) {
  return sessionStorage.setItem('loggedUser', username);
}

const BookReducer = (state = INITIAL_STATE, action) => {
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
        books: action.books
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