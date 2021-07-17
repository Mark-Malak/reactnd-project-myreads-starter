import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf  from './BookShelf'
import Book from './Book'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    query : '' , 
    showSearchPage: false , 
    books :[] ,
    currentlyReading : [], 
    wantToRead : [] , 
    read : [] , 
    searchResult : []
  }

  updateQuery(query) {
    this.setState(() => ({
      query : query.trim()
    }))
    BooksAPI.search(query.trim()).then(
      (books) => {
        console.log("found theeeeeeeeeeeeeeeeeese "+ books) ;
          this.setState(
              {
                 searchResult: books 
              }
              )
            
            }).catch(function(e) {
              console.error(e.message); // "oh, no!"
            })

    // const showingBooks = query.trim() === '' 
    // ? [] 
    // :searchResult.filter((book)=> (
    //   book.title.toLowerCase().includes(query.toLowerCase()) ||
    //   book.authors.map(a => a.toLowerCase()).includes(query.toLowerCase()) 
    // ))
  }

  updateShelves(book , value ){
    BooksAPI.update(book , value).then(
      BooksAPI.getAll().then(
        (books) => {
            console.log(books);
            this.setState(
                {
                   books : books ,
                   currentlyReading : books.filter(book => book.shelf === 'currentlyReading') ,
                   wantToRead : books.filter(book => book.shelf === 'wantToRead'),
                   read : books.filter(book => book.shelf === 'read'),
                }
                )
              console.log("updated book with name : " + book.title + " to shelf : " + value) ;
              })
    )
    
     
     

  }

  
  componentDidMount() {
    BooksAPI.getAll().then(
        (books) => {
            console.log(books);
            this.setState(
                {
                   books: books , 
                   currentlyReading : books.filter(book => book.shelf === 'currentlyReading') ,
                   wantToRead : books.filter(book => book.shelf === 'wantToRead'),
                   read : books.filter(book => book.shelf === 'read'),
                }
                )
              
              })

                

}
  render() {
    const{ searchResult , books , currentlyReading , wantToRead , read , query  } = this.state;
    // const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    // const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    // const read = books.filter(book => book.shelf === 'read');
     console.log(currentlyReading);
     console.log(wantToRead);
     console.log(read);
    
    
    return (
      <div className="app">
      <Route path= '/search' render = {()=> (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to = '/'>
              <button className="close-search">Close</button>
            </Link>
              <div className="search-books-input-wrapper">
               
                <input type="text" placeholder="Search by title or author"
                  value = {this.state.query}
                  onChange = {(event)=> this.updateQuery(event.target.value)}


                />
              
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {searchResult != undefined && searchResult.length>=1 && ( searchResult.map( (book,index) => (
                            <li key = {index}>
                                <Book bookObj = {book} refresh = {this.props.refresh2} title = {book.title}  authors = {book.authors} shelf = {book.shelf} img = {(book.imageLinks).thumbnail} />
                           </li>
                        )
                        )
                        )}

              </ol>
            </div>
          </div>
      )} />




       <Route exact path = '/' render = {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf refresh2 = {this.updateShelves.bind(this)} shelfTitle = "Currently reading" Books = {currentlyReading}/> 
                <BookShelf refresh2 = {this.updateShelves.bind(this)} shelfTitle = "Want to Read" Books = {wantToRead}/> 
                <BookShelf refresh2 = {this.updateShelves.bind(this)} shelfTitle = "Read" Books = {read}/> 
              </div>
            </div>
            <div className="open-search">
            <Link to = '/search'>
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
