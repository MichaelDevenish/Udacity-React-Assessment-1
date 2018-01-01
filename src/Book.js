import React, { Component } from 'react'

class Book extends Component {
  
  constructor (props) {
    super(props)
    let selectedVar = 'none'
    if (this.props.details.shelf !== undefined){
      selectedVar = this.props.details.shelf
    }

    this.state = {
      selected: selectedVar
    }
  }

  changeShelf (event) { 
    this.setState({ selected: event.target.value })
    this.props.onShelfChange(event.target.value, this.props.details)
  }
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
            <select value={this.state.selected} onChange={this.changeShelf.bind(this)}>
              {this.generateSelect()}
            </select>
          </div>
        </div>
        <div className='book-title'>{this.props.details.title}</div>
        <div className='book-authors'>{author}</div>
      </div>
    )
  }
  generateSelect () {
    let options = [<option value='none' disabled>Move to...</option>]
    options = options.concat(this.props.shelves.map((shelf) => {
      if (shelf[0] === this.props.details.shelf) {
        return (
          <option
            value={shelf[0]}
            key={shelf[0]}>✔ {shelf[1]}</option>
        )
      } else {
        return (
          <option
            value={shelf[0]}
            key={shelf[0]}
          >{shelf[1]}</option>
        )
      }
    }))
    options.push(<option value='none'>None</option>)
    return options
  }
}

export default Book

//allow books with no image