import { NotificationManager } from 'react-notifications';

export default class AppService {
  apiUrl = 'http://localhost:3000/v2/';

  /**
   * Generates the headers for the requests
   *
   * @param {boolean} includeAuth Include the auth header
   * @returns Headers
   */
  getCustomHeaders = (includeAuth) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (includeAuth) {
      headers.append('auth-token', localStorage.getItem('token'));
    }
    return headers;
  }

  /**
   * Renews the user token if it;s about to expire before sending a request.
   *
   * @param {Function} callback Function to be called if the token hasn´t expired.
   * @param {Object} data Data to be passed to the callback function.
   */
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

  /**
   * Call to the API to renew the user token.
   *
   * @returns Promise with the API response.
   */
  renewToken = () => {
    const config = { 
      method: 'POST',
      headers: this.getCustomHeaders(true)
    };

    return fetch(this.apiUrl + 'user/renew', config);
  }


  /**
   * Call to the API to authenticate the user.
   *
   * @param {Object} data Body of the request.
   * @returns Promise with the API response.
   */
  login = (data) => {
    const config = { 
      method: 'POST',
      headers: this.getCustomHeaders(false),
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'user/login', config);
  }

  /**
   * Call to the API to register a new user.
   *
   * @param {Object} data Body of the request.
   * @returns Promise with the API response.
   */
  register = (data) => {
    const config = { 
      method: 'POST',
      headers: this.getCustomHeaders(false),
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'user', config);
  }

  /**
   * Call to the API to retrieve all the books of a customer.
   *
   * @returns Promise with the API response.
   */
  getAllBooks = () => {
    const config = { 
      method: 'GET',
      headers: this.getCustomHeaders(true)
    };

    return fetch(this.apiUrl + 'book', config);
  }

  /**
   * Call to the API to get the data of a book.
   *
   * @param {string} bookId Id of the book.
   * @returns Promise with the API response.
   */
  getBook = (bookId) => {
    const config = { 
      method: 'GET',
      headers: this.getCustomHeaders(true)
    };

    return fetch(this.apiUrl + 'book/' + bookId, config);
  }

  /**
   * Call to the API to update the data of a book.
   *
   * @param {*} bookId Id of the book.
   * @param {*} data New data of the book.
   * @returns Promise with the API response.
   */
  updateBook = (bookId, data) => {
    const config = { 
      method: 'PUT',
      headers: this.getCustomHeaders(true),
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'book/' + bookId, config);
  }

  /**
   * Call to the API to add a new book.
   *
   * @param {Object} data Data of the new book.
   * @returns Promise with the API response.
   */
  addBook = (data) => {
    const config = { 
      method: 'POST',
      headers: this.getCustomHeaders(true),
      body: JSON.stringify(data)
    };

    return fetch(this.apiUrl + 'book', config);
  }

  /**
   * Call to the API to delete a book.
   *
   * @param {string} bookId Id of the book.
   * @returns Promise with the API Response.
   */
  deleteBook = (bookId) => {
    const config = { 
      method: 'DELETE',
      headers: this.getCustomHeaders(true)
    };

    return fetch(this.apiUrl + 'book/' + bookId, config);
  }

}