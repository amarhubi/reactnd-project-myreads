import React from 'react'
import BookShelf from './BookShelf'
import { getAll, update } from './BooksAPI'

class BookShelves extends React.Component {

    state = {
        books: [],
        bookShelves: [
            {
                title: 'Currently Reading',
                id: 'currentlyReading',
                books: []
            },
            {
                title: 'Want to Read',
                id: 'wantToRead',
                books: []
            },
            {
                title: 'Read',
                id: 'read',
                books: []
            }   
        ],

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
                let newBooks = [];
                bookIds.map(id => {
                    let filteredBook = this.state.books.filter(book => book.id === id)
                    newBooks.push(filteredBook[0])
                    return null;
                })
                newState[shelf].books = newBooks 
            }

            this.setState(newState);
        })
    }

    componentDidMount(){
        getAll().then(books => { 
            console.log(books);
            const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
            const wantToRead = books.filter(book => book.shelf === 'wantToRead')
            const read = books.filter(book => book.shelf === 'read')

            this.setState((oldState) => ({
                books: books,    
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
        const { currentlyReading, read, wantToRead } = this.state;
        
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title={`Currently Reading`} books={currentlyReading.books} onShelfChange={this.onShelfChange}/>
                        <BookShelf title={`Want to Read`} books={wantToRead.books} onShelfChange={this.onShelfChange}/>
                        <BookShelf title={`Read`} books={read.books} onShelfChange={this.onShelfChange}/>
                    </div>
                </div>
                <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default BookShelves