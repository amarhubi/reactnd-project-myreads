import React from 'react'
import BookShelf from './BookShelf'
import { getAll, update } from './BooksAPI'
import { Link } from 'react-router-dom'

class BookShelves extends React.Component {
    state = {
        // books: new Map(),

        currentlyReading:  {
            title: 'Currently Reading',
            id: 'currentlyReading',
            books: []
        },
        wantToRead: {
            title: 'Want to Read',
            id: 'wantToRead',
            books: []
        },
        read: {
            title: 'Read',
            id: 'read',
            books: []
        }
    }

    onShelfChange = (book, newShelf) => {
        let newState = this.state
        update(book, newShelf).then(data => {            
            for(let entry of Object.entries(data)){
                let [shelf, bookIds] = entry;
                newState[shelf].books = bookIds.map(id => this.props.books.get(id))
            }
            this.setState(newState);
        })
    }

    componentDidMount(){
        // const currentlyReading = this.props.books.values().filter(book => book.shelf === 'currentlyReading')
        getAll().then(books => { 
            const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
            const wantToRead = books.filter(book => book.shelf === 'wantToRead')
            const read = books.filter(book => book.shelf === 'read')

            this.setState((oldState) => ({
                // books: books_map,    
                currentlyReading: {
                    title: oldState.currentlyReading.title,
                    id: oldState.currentlyReading.id,
                    books: currentlyReading
                },
                wantToRead: {
                    title: oldState.wantToRead.title,
                    id: oldState.wantToRead.id,
                    books: wantToRead
                },
                read: {
                    title: oldState.read.title,
                    id: oldState.read.id,
                    books: read
                },
                })
            )
        });
    }

    render(){
        const { shelves, books } = this.props
        
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf key={`currentlyReading`} title={`Currently Reading`} books={shelves.currentlyReading.map(bookId => books.get(bookId))} onShelfChange={this.onShelfChange}/>
                        <BookShelf key={`wantToRead`} title={`Want to Read`} books={shelves.wantToRead.map(bookId => books.get(bookId))} onShelfChange={this.onShelfChange}/>
                        <BookShelf key={`read`} title={`Read`} books={shelves.read.map(bookId => books.get(bookId))} onShelfChange={this.onShelfChange}/>
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