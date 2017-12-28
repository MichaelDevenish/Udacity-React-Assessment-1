import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js'

class ListBooks extends Component {

  render() {
    let sortedBooks = this.sortBooks(this.props.books)
    let showingShelves = this.showShelves(sortedBooks);

    console.log(sortedBooks)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {showingShelves}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>

        </div>
      </div>
    )
  }

  sortBooks(books) {
    let sortedBooks = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
    books.forEach(book => {
      switch (book.shelf) {
        case 'currentlyReading':
          sortedBooks.currentlyReading = sortedBooks.currentlyReading.concat(book)
          break;
        case "wantToRead":
          sortedBooks.wantToRead = sortedBooks.wantToRead.concat(book)
          break;
        case 'read':
          sortedBooks.read = sortedBooks.read.concat(book)
          break;
      }
    });
    return sortedBooks;
  }

  showShelves(sortedBooks) {
    let showingShelves = [];
    if (sortedBooks.currentlyReading.length !== 0) {
      showingShelves.push(<BookShelf name='Currently Reading' books={sortedBooks.currentlyReading} />);
    }
    if (sortedBooks.wantToRead.length !== 0) {
      showingShelves.push(<BookShelf name='Want to Read' books={sortedBooks.wantToRead} />);
    }
    if (sortedBooks.read.length !== 0) {
      showingShelves.push(<BookShelf name='Read' books={sortedBooks.read} />);
    }
    return showingShelves;
  }
}

export default ListBooks;