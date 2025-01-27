import React from 'react'

class Book extends React.Component{
    
    handleChange = (e) => {
        this.props.onShelfChange(this.props.book, e.target.value);
    }

    render(){
        const { title, authors, imageUrl, shelf } = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageUrl})` }}></div>
                        <div className="book-shelf-changer">
                        <select
                            onChange={this.handleChange}
                            defaultValue={(shelf ? shelf : "none")}
                        >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors && authors.map(author => `${author}, `)}</div>
                </div>
            </li>
        )
    }
}

export default Book