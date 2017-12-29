import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import BookSearch from './BookSearch.js'
class BooksApp extends React.Component {
  state = {
    Books: [],
    SearchBooks: []
  }

  componentDidMount () {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books })
    })
  }

  onBookSearch (query) {
    BooksAPI.search(query).then(books => {
      BooksAPI.getAll().then(currentBooks => {
        let outputData = []
        books.forEach(element => {
          var possibleStatus = currentBooks.filter(book => book.id === element.id);
          if(possibleStatus.length !== 0){
            element.shelf = possibleStatus[0].shelf
          }
          outputData.push(element)
        });
        console.log(outputData)
        this.setState({ SearchBooks: outputData })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.Books} />
        )} />
        <Route path="/search" render={() => (
          <BookSearch 
            books={this.state.SearchBooks} 
            onSearch={this.onBookSearch.bind(this)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
