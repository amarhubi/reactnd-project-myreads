import React from 'react'
import SearchPage from './SearchPage'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'
import { getAll, update } from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books : new Map(),
    shelves: {
      currentlyReading:  [],
      wantToRead: [],
      read: []
    }
  }

  onShelfChange = (book, newShelf) => {
    let { shelves, books } = this.state;
    if(books.get(book.id))
      books.get(book.id).shelf = newShelf;
    else{
      book.shelf = newShelf;
      books.set(book.id, book);

    }

    update(book, newShelf).then(data => {            
        for(let entry of Object.entries(data)){
            let [shelf, bookIds] = entry;
            shelves[shelf] = bookIds
        }
        this.setState({shelves, books});
    })
  }

  updateBooks = (books) => {
    this.setState({books})
  }

  componentDidMount(){
    let { shelves } = this.state
    getAll().then(books => {
      let books_map = new Map();
      books.forEach(book => {
        books_map.set(book.id, book)
        shelves[book.shelf].push(book.id)
      })

      this.setState({books: books_map, shelves: shelves})
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<BookShelves books={this.state.books} shelves={this.state.shelves} updateBooks={this.updateBooks} onShelfChange={this.onShelfChange}/>)}/>
        <Route path='/search' render={() => (<SearchPage books={this.state.books} updateBooks={this.updateBooks} onShelfChange={this.onShelfChange}/>)}/>
      </div>
    )
  }
}

export default BooksApp
