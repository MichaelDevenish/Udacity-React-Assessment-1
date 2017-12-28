import React, { Component } from 'react'
import Book from './Book.js'
class BookShelf extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book) => (
                <li key={book.name + book.author}>
                  <Book
                    name={book.name}
                    author={book.author}
                    image={book.image}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  } yarn
}

export default BookShelf;