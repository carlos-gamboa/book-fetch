export default class BookService {
  apiUrl = 'http://10.28.6.4:8080/book';

  getCustomerBooks = (customer) => {
    // const headers = new Headers();
    // headers.append('customer', customer);

    // const config = { 
    //   method: 'GET',
    //   headers: headers,
    //   mode: 'cors'
    // };

    // fetch(this.apiUrl,config)
    //   .then(function(response) {
    //     console.log(response);
    //     return response.json();
    //   });
    return [
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
    ];
  }

  createCustomerBook = (customer, book) => {
    const headers = new Headers();
    headers.append('customer', customer);

    const config = { 
      method: 'POST',
      headers: headers,
      mode: 'cors',
      body: JSON.stringify(book)
    };

    fetch(this.apiUrl,config)
      .then(function(response) {
        console.log(response);
        return response.json();
      });
  }

  updateCustomerBook = (customer, bookId, book) => {
    const headers = new Headers();
    headers.append('customer', customer);

    const config = { 
      method: 'PUT',
      headers: headers,
      mode: 'cors',
      body: JSON.stringify(book)
    };

    fetch(this.apiUrl + '/' + bookId,config)
      .then(function(response) {
        console.log(response);
        return response.json();
      });
  }

  deleteCustomerBook = (customer, bookId) => {
    const headers = new Headers();
    headers.append('customer', customer);

    const config = { 
      method: 'DELETE',
      headers: headers,
      mode: 'cors'
    };

    fetch(this.apiUrl + '/' + bookId, config)
      .then(function(response) {
        console.log(response);
        return response.json();
      });
  }
}