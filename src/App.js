import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Book from './Book'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
class BooksApp extends React.Component {

  state = {
    query: '',
    showSearchPage: false,
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchResult: []
  }

  updateQuery(query) {
    this.setState(() => ({
      query: query
    }))
    BooksAPI.search(query).then(
      (booksReturned) => {
        
        // if (!Array.isArray(booksReturned)) {
        //   //reference : https://dev.to/arikaturika/use-this-trick-to-map-over-single-objects-in-javascript-38nb
        //   console.log("this single book title is " + booksReturned.title);
        //   booksReturned = [booksReturned];
        // }
     
        if (booksReturned.error) {
          this.setState(
            {
              searchResult: []
            }
          )
        } else {
          
          this.setState(
            {
              searchResult: booksReturned
            }
          )
        }


      }).catch((error) => {
        console.log(error)
        this.setState(
          {
            searchResult: []
          }
        )
      });

    // const showingBooks = query.trim() === '' 
    // ? [] 
    // :searchResult.filter((book)=> (
    //   book.title.toLowerCase().includes(query.toLowerCase()) ||
    //   book.authors.map(a => a.toLowerCase()).includes(query.toLowerCase()) 
    // ))
  }

  updateShelves(book, value) {
    BooksAPI.update(book, value).then(() => {
      return BooksAPI.getAll()
    }
    ).then(
      (books) => {
        this.setState(
          {
            books: books
          }
        )
     
      })

  }


  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {
        
        this.setState(
          {
            books: books,
            // currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
            // wantToRead: books.filter(book => book.shelf === 'wantToRead'),
            // read: books.filter(book => book.shelf === 'read'),
          }
        )

      })
  }
  bookExist(book, books) {
    for (var i = 0; i < books.length; i++) {
      if (book.id === books[i].id) {
        return books[i].shelf;
      }
    }
    return '';
  }




  render() {
    const { searchResult, books, query } = this.state;
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');


    return (
      <div className="app">


        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
                <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">

                <input type="text" placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchResult && searchResult.length >= 1 && (searchResult.map((book) => (
                  <li key={book.id}>
                    <Book bookObj={book} refresh={this.updateShelves.bind(this)} title={book.title} authors={book.authors} shelf={this.bookExist(book, books)} img={book.imageLinks ? (book.imageLinks).thumbnail : ''} />
                  </li>
                )
                )
                )}

              </ol>
            </div>
          </div>
        )} />




        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf refresh2={this.updateShelves.bind(this)} shelfTitle="Currently reading" Books={currentlyReading} />
                <BookShelf refresh2={this.updateShelves.bind(this)} shelfTitle="Want to Read" Books={wantToRead} />
                <BookShelf refresh2={this.updateShelves.bind(this)} shelfTitle="Read" Books={read} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button>Add a book</button>
              </Link>

            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
