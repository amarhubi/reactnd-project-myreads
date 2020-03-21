import React from 'react';
import { Link } from 'react-router-dom'
import { search } from './BooksAPI'
import Book from './Book'


class SearchPage extends React.Component{

    state = {
        searchValue: '',
        results: []
    }
    handleChange = (e) => {
        // console.log(e.target.value)
        let search_string = e.target.value.trim()
        search(search_string).then(data => {
            console.log(this.props.books);
            data.map(d => console.log(this.props.books.get(d.id)))
            if(Array.isArray(data))
                this.setState({results: data.filter(d => d.imageLinks), searchValue: search_string })
            else
                this.setState({results: []})
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Search string: ${this.state.searchValue}`)
        search(this.state.searchValue).then(data => {
            console.log(data)
            this.setState({results: data})
        })
    }

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} placeholder="Search by title or author"/>
                    </form>

                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.results.length > 0 ? this.state.results.map(book => (
                    <li>
                        <Book 
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                authors={book.authors}
                                shelf={book.shelf}
                                imageUrl={book.imageLinks.smallThumbnail}
                                onShelfChange={this.props.onShelfChange}
                            />
                    </li>
                    )) : 'No results'}
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage;