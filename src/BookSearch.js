import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js'

class BookSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  updateQuery (event) {
    this.setState({ query: event.target.value })
    this.props.onSearch(event.target.value)
  }
  visibleShelf () {
    if (this.props.books.length !== 0 && this.props.books.error === undefined) {
      return <BookShelf
        books={this.props.books}
        shelves={this.props.shelves}
        onShelfChange={this.props.onShelfChange}
      />
    }
  }

  render () {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(this.updateQuery.bind(this))}
            />

          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.visibleShelf()}
          </ol>
        </div>
      </div>
    )
  }
}
export default BookSearch
//join with current books if they exist to get shelf status