import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentDidMount() {
  BooksAPI
      .getAll()
      .then(data => this.setState({books: data}))
  }


  updateBook(id, shelf){
    console.log(id, shelf)
    this.setState({books: [
        ...this.state.books.map(item => item.id === id ? {...item, shelf: shelf} : item)
    ]})
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.state.books
                    .filter(item => item.shelf === "currentlyReading")
                    .map((item, i) => <Book key={item.id} {...item} update={this.updateBook.bind(this)}/>)

                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.state.books
                    .filter(item => item.shelf === "wantToRead")
                    .map((item, i) => <Book key={item.id} {...item} update={this.updateBook.bind(this)}/>)
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  this.state.books
                  .filter(item => item.shelf === "read" )
                  .map((item, i) => <Book key={item.id} {...item} update={this.updateBook.bind(this)}/>)
                }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add Book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks