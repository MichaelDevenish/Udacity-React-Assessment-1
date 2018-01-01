import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import BookSearch from './BookSearch.js'
class BooksApp extends React.Component {
  state = {
    Books: [],
    SearchBooks: [],
    Shelves: [
      ['currentlyReading','Currently reading'],
      ['wantToRead', 'want to read'],
      ['read','read']
    ]
  }

  updateBookStatus(shelf,book){
    BooksAPI.update(book, shelf)
    let previousState = null
    if(book.shelf === undefined){
      previousState = false
    }else{
      previousState = true
    }
    if(shelf === 'none'){
      book.shelf = undefined
    }else{
      book.shelf = shelf
    }
    if(!previousState){
      this.setState((prevState) => ({
        Books: prevState.Books.concat(book)
      }));
    }else{
      let index = this.state.Books.findIndex(currentBook => currentBook.id === book.id);
      let updatedBooks  = this.state.Books.slice() 
      updatedBooks[index] = book
      this.setState({Books: updatedBooks})
    }
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
        this.setState({ SearchBooks: outputData })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks 
          books={this.state.Books} 
          shelves={this.state.Shelves}
          onShelfChange={this.updateBookStatus.bind(this)}
          />
        )} />
        <Route path="/search" render={() => (
          <BookSearch 
            books={this.state.SearchBooks} 
            onSearch={this.onBookSearch.bind(this)}
            shelves={this.state.Shelves}
            onShelfChange={this.updateBookStatus.bind(this)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
