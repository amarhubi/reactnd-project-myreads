import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class BookShelves extends React.Component {
    
    render(){
        const { shelves, books, onShelfChange } = this.props
        
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf key={`currentlyReading`} title={`Currently Reading`} books={shelves.currentlyReading.map(bookId => books.get(bookId))} onShelfChange={onShelfChange}/>
                        <BookShelf key={`wantToRead`} title={`Want to Read`} books={shelves.wantToRead.map(bookId => books.get(bookId))} onShelfChange={onShelfChange}/>
                        <BookShelf key={`read`} title={`Read`} books={shelves.read.map(bookId => books.get(bookId))} onShelfChange={onShelfChange}/>
                    </div>
                </div>
                <div className="open-search">
                <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookShelves