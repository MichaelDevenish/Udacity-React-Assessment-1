import React, { Component } from 'react'

class Book extends Component {
  /**
   * @constructor
   * @param {*} props the props passed from the parent
   */
  constructor (props) {
    super(props);
    let selectedVar = 'none';
    if (this.props.details.shelf !== undefined) {
      selectedVar = this.props.details.shelf;
    }
    this.state = {
      selected: selectedVar
    }
  }
  /**
   * @description change the current item to the shelf in the event
   * @param {*} event the event fired from clicking a select option
   */
  changeShelf (event) {
    this.setState({ selected: event.target.value });
    this.props.onShelfChange(event.target.value, this.props.details);
  }
  /**
   * @description generates a list of options from the supplied shelf properties
   * @returns {option[]} a list of shelves
   */
  generateSelect () {
    let options = [<option value='none' key='Move to' disabled>Move to...</option>];
    options = options.concat(this.props.shelves.map((shelf) => {
      return (shelf[0] === this.props.details.shelf) ?
        <option
          value={shelf[0]}
          key={shelf[0]}>✔ {shelf[1]}</option>
        : <option
          value={shelf[0]}
          key={shelf[0]}
        >{shelf[1]}</option>;
    }))
    options.push(<option key='none' value='none'>None</option>);
    return options;
  }
   /**
   * @returns the item to be rendered
   */
  render () {
    let author = ''
    if (this.props.details.authors !== undefined) {
      author = this.props.details.authors.join(', ');
    }
    let image = ''
    if (this.props.details.imageLinks !== undefined) {
      image = this.props.details.imageLinks.thumbnail;
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
    );
  }
}

export default Book;
