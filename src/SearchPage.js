import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'

/**
 * @description Searches db for books
 * @constructor takes one @param props
 * @method getSearchResults: Retrieves Search results from server
 *         Uses {array} for checking if search term is valid
 * @method AddBookToShelf: Adds Book  from search page to shelf so Data can persist.
 */

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchData: [],
      renderData: []
    }
    BooksAPI.getAll().then(data => this.setState({data}))

  }

  componentDidMount() {
    this.textInput.focus()
    this.addBookToShelf = this.addBookToShelf.bind(this)
  }


  getSearchResults() {
    this.setState({renderData: []})
    const terms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    terms.includes(this.textInput.value) ?
        BooksAPI.search(this.textInput.value, 10)
            .then(data => {
              this.setState({searchData: data})
              this.compareResultsWithBookList()
            })
        : this.setState({searchData: []})

  }

  compareResultsWithBookList() {
    const result = this.state.searchData.filter(item => !this.state.data.some(res => item.id === res.id))
    this.setState({renderData: this.state.renderData.concat(result)})
    const resultIn = this.state.data.filter(item => this.state.searchData.some(res => item.id === res.id))
    this.setState({renderData: this.state.renderData.concat(resultIn)})
  }

  addBookToShelf(id, shelf) {
    BooksAPI.update(id, shelf)
  }

  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">

              <input onChange={this.getSearchResults.bind(this)} onClick={() => this.textInput.focus()}
                     ref={(input) => {
                       this.textInput = input;
                     }} type="text" placeholder="Search by title or author"/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                this.state.renderData.length > 0 ?
                    this.state.renderData.map(item => <Book key={item.id} {...item} update={this.addBookToShelf}/>) :
                    <h1>No Results</h1>
              }
            </ol>
          </div>
        </div>
    )
  }
}

export default SearchPage