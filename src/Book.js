import React, { Component } from 'react'

class Book extends Component {
  render () {
    let author = ''
    if (this.props.details.authors !== undefined) {
      author = this.props.details.authors.join(', ')
    }
    let image = ''
    if (this.props.details.imageLinks !== undefined) {
      image = this.props.details.imageLinks.thumbnail
    }

    return (
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={{ width: 128, height: 192, backgroundImage: `url(${image})` }} />
          <div className='book-shelf-changer'>
            {this.generateSelect()}
          </div>
        </div>
        <div className='book-title'>{this.props.details.title}</div>
        <div className='book-authors'>{author}</div>
      </div>
    )
  }
  generateSelect () {
    switch (this.props.details.shelf) {
      case 'currentlyReading':
        return (
          <select>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading' selected>✔ Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        )
      case 'wantToRead':
        return (
          <select>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead' selected>✔ Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        )
      case 'read':
        return (
          <select>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read' selected>✔ Read</option>
            <option value='none'>None</option>
          </select>
        )
      default:
        return (
          <select>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none' selected>✔ None</option>
          </select>
        )
    }
  }
}

export default Book

//allow books with no image