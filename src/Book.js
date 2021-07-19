import React from 'react';

class Book extends React.Component {


    handleChange = (event) => {
        this.setState({shelf:event.target.value})
       // console.log("changing "+this.props.bookObj.title + "to my current shelf selected is "+ event.target.value) ;
        this.props.refresh(this.props.bookObj , event.target.value)
    }

    render() {
        
       const {title , authors , shelf , img  , bookObj } = this.props ; 
        return (

            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={ { width: 128, height: 193, backgroundImage: `url(${img})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange = {this.handleChange} defaultValue = {shelf ? shelf : 'none'}  >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors &&(authors.toString())}</div>
            </div>



        )

    }
}
export default Book