import { NotificationManager } from 'react-notifications';

export default class AppService {
  apiUrl = 'http://10.28.6.4:8080/v2/';

  interceptRequest = (callback, data) => {
    if ((parseInt(localStorage.getItem('token-time'), 10) + 90000) < new Date().getTime()) {
      this.renewToken()
        .then((response) => {
          if (response.status !== 200) {
            throw response;
          }
          else {
            return response.json();
          }
        })
        .then ((responseData) => {
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('token-time', new Date().getTime());
          callback(this, data);
        })
        .catch((error) => {
          if (error.status !== 401) {
            NotificationManager.error('A server error occurred.', 'Error');
          }
        });
    }
    else {
      callback(this, data);
    }
  }

  renewToken = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token', localStorage.getItem('token'));

    const config = { 
      method: 'POST',
      headers: headers
    };

    return fetch(this.apiUrl + 'user/renew', config);
  }

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