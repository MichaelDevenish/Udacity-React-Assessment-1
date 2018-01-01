import React, { Component } from 'react'
import Book from './Book.js'
class BookShelf extends Component {
  generateBooks (books) {
    return books.map((book) => {
      return (
        <li key={book.id} >
          <Book
            details={book}
            shelves={this.props.shelves}
            onShelfChange={this.props.onShelfChange}
          />
        </li>
      )
    })
  }

  render () {
    let renderedBooks = this.generateBooks(this.props.books)
    let title = (this.props.name !== undefined) ? <h2 className='bookshelf-title'>{this.props.name}</h2> : null
    return (
      <div className='bookshelf'>
        {title}
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {renderedBooks}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
