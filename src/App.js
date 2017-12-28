import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import BookSearch from './BookSearch.js'
class BooksApp extends React.Component {
  state = {
    Books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books })
      console.log(this.state)

    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.Books} />
        )} />
        <Route path="/search" render={() => (
          <BookSearch />
        )} />
      </div>
    )
  }
}

export default BooksApp
