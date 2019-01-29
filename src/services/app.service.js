export default class AppService {
  apiUrl = 'http://10.28.6.4:8080/v2/';

  login = (data) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const config = { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'user/login', config);
  }

  register = (data) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const config = { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'user', config);
  }

  getAllBooks = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', localStorage.getItem('token'));

    const config = { 
      method: 'GET',
      headers: headers
    };

    return fetch(this.apiUrl + 'book', config);
  }

  getBook = (bookId) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', localStorage.getItem('token'));

    const config = { 
      method: 'GET',
      headers: headers
    };

    return fetch(this.apiUrl + 'book/' + bookId, config);
  }

  updateBook = (bookId, data) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', localStorage.getItem('token'));

    const config = { 
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'book/' + bookId, config);
  }

  addBook = (data) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', localStorage.getItem('token'));

    const config = { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'book', config);
  }

  deleteBook = (bookId) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', localStorage.getItem('token'));

    const config = { 
      method: 'DELETE',
      headers: headers
    };

    return fetch(this.apiUrl + 'book/' + bookId, config);
  }

}