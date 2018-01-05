import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import BookSearch from './BookSearch.js'
class BooksApp extends React.Component {
  /**
   * @constructor
   * @param {*} props the props passed from the parent
   */
  constructor (props) {
    super(props);
    this.state = {
      Books: [],
      SearchBooks: [],
      Shelves: [
        ['currentlyReading', 'Currently reading'],
        ['wantToRead', 'want to read'],
        ['read', 'read']
      ]
    }
  }

  /**
   * @description moves the requested book to the requested shelf
   * @param {string} shelf the shelf that is being moved to
   * @param {[]} book the book to move
   */
  updateBookStatus (shelf, book) {
    BooksAPI.update(book, shelf);
    let previousState = (book.shelf !== undefined);
    book.shelf = (shelf === 'none') ? book.shelf = undefined : book.shelf = shelf;
    if (!previousState) {
      this.setState((prevState) => ({
        Books: prevState.Books.concat(book)
      }));
    } else {
      let index = this.state.Books.findIndex(currentBook => currentBook.id === book.id);
      let updatedBooks = this.state.Books.slice();
      updatedBooks[index] = book;
      this.setState({Books: updatedBooks});
    }
  }

  /**
   * @description once component mounts get the books from the API
   */
  componentDidMount () {
    BooksAPI.getAll().then(books => {
      this.setState({ Books: books });
    });
  }

  /**
   * @description gets the books relating to the query string
   * @param {string} query the query string to be searched for
   */
  onBookSearch (query) {
    BooksAPI.search(query).then(books => {
      if (books !== undefined && books.length !== undefined && books.length > 0) {
        BooksAPI.getAll().then(currentBooks => {
          let outputData = [];
          books.forEach(element => {
            let possibleStatus = currentBooks.filter(book => book.id === element.id);
            if (possibleStatus.length !== 0) {
              element.shelf = possibleStatus[0].shelf;
            }
            outputData.push(element);
          });
          this.setState({ SearchBooks: outputData });
        });
      }
    });
  }

  /**
   * @returns the item to be rendered
   */
  render () {
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
    );
  }
}

export default BooksApp;
