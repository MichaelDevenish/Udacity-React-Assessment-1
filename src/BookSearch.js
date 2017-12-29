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

  updateQuery (event) { // TODO: Search here
    this.setState({ query: event.target.value })
    this.props.onSearch(event.target.value)
  }
  visibleShelf () {
    if (this.props.books.length !== 0 && this.props.books.error === undefined) {
      return <BookShelf books={this.props.books} />
    }
  }

  render () {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
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