import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js'

class ListBooks extends Component {

  render () {
    let sortedBooks = this.sortBooks(this.props.books)
    let showingShelves = this.showShelves(sortedBooks)
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {showingShelves}
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>

        </div>
      </div>
    )
  }

  sortBooks (books) {
    let sortedBooks = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
    books.forEach(book => {
      switch (book.shelf) {
        case 'currentlyReading':
          sortedBooks.currentlyReading = sortedBooks.currentlyReading.concat(book)
          break
        case 'wantToRead':
          sortedBooks.wantToRead = sortedBooks.wantToRead.concat(book)
          break
        case 'read':
          sortedBooks.read = sortedBooks.read.concat(book)
          break
      }
    })
    return sortedBooks
  }

  showShelves (sortedBooks) {
    let showingShelves = []
    if (sortedBooks.currentlyReading.length !== 0) {
      showingShelves.push(
        <BookShelf
          key='currentlyReading'
          name='Currently Reading'
          books={sortedBooks.currentlyReading}
          shelves={this.props.shelves}
          onShelfChange={this.props.onShelfChange}
      />)
    }
    if (sortedBooks.wantToRead.length !== 0) {
      showingShelves.push(
        <BookShelf key='wantToRead'
          name='Want to Read'
          books={sortedBooks.wantToRead}
          shelves={this.props.shelves}
          onShelfChange={this.props.onShelfChange}
      />)
    }
    if (sortedBooks.read.length !== 0) {
      showingShelves.push(
        <BookShelf
          key='read'
          name='Read'
          books={sortedBooks.read}
          shelves={this.props.shelves}
          onShelfChange={this.props.onShelfChange}
        />)
    }
    return showingShelves
  }
}

export default ListBooks
