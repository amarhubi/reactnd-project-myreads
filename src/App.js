import React from 'react'
import SearchPage from './SearchPage'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'
import { getAll } from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books : new Map(),
    shelves: {
      currentlyReading:  [],
      wantToRead: [],
      read: []
    }
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

      console.log(shelves)
      this.setState({books: books_map, shelves: shelves})
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<BookShelves books={this.state.books} shelves={this.state.shelves} updateBooks={this.updateBooks} />)}/>
        <Route path='/search' render={() => (<SearchPage books={this.state.books} updateBooks={this.updateBooks} />)}/>
      </div>
    )
  }
}

export default BooksApp
