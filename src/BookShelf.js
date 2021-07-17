import React from 'react';
import Book from './Book';
class BookShelf extends React.Component {
    state = {
        books: []
    }
    componentDidMount() {


    }


    render() {
        const { shelfTitle, Books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {Books.map(book => (
                            <li key = {book.title}>
                                <Book title = {book.title}  authors = {book.authors} shelf = {book.shelf} img = {(book.imageLinks).thumbnail} />
                           </li>
                        ))}
                    </ol>
                </div>
            </div>
        )

    }

}

export default BookShelf