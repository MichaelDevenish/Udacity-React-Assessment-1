import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js'

class ListBooks extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.books.map((shelf) => (
              <BookShelf
                name={shelf.name}
                books={shelf.items}
                key={shelf.name}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  } yarn
}

export default ListBooks;