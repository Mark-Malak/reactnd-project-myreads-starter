import React from 'react';
import Book from './Book';
class BookShelf extends React.Component {


    render() {
        const { shelfTitle, Books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {Books.map( (book) => (
                            <li key = {book.id}>
                                <Book bookObj = {book} refresh = {this.props.refresh2} title = {book.title}  authors = {book.authors} shelf = {book.shelf} img = {book.imageLinks ? (book.imageLinks).thumbnail : ''} />
                           </li>
                        ))}
                    </ol>
                </div>
            </div>
        )

    }

}

export default BookShelf