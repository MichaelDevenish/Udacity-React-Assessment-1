import React, { Component } from 'react'
import Book from './Book.js'
class BookShelf extends Component {

  generateBooks(books) {
    return books.map((book) => {
      return (
        <li key={book.id} >
          <Book
            name={book.title}
            author={book.authors.join(', ')}
            image={book.imageLinks.thumbnail}
          />
        </li>
      )
    })
  }

  render() {
    let renderedBooks = this.generateBooks(this.props.books)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {renderedBooks}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;