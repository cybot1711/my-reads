import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

/**
 * @description Lists all books in your reads
 * @constructor takes one @param props
 * @method UpdateBook: Updates Book State in real time state as well as Server Side. I guess this is not needed as data is persisted but kept none the less
 */

class ListBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
        this.updateBook = this.updateBook.bind(this)
    }

    componentDidMount() {
        BooksAPI
            .getAll()
            .then(data => this.setState({books: data}))
    }


    updateBook(book, shelf) {
        console.log(book, shelf)
        if (book.shelf !== shelf)
            BooksAPI.update(book, shelf).then(() => {
                this.setState({
                    books: [
                        ...this.state.books.map(item => item.id === book.id ? {...item, shelf: shelf} : item)
                    ]
                })
            })
    }

    render() {
        console.log(this.state)
        const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
        const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
        const read = this.state.books.filter(book => book.shelf === 'read')
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
                                        currentlyReading.map((item, i) => <Book key={item.id} {...item} update={this.updateBook}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        wantToRead.map((item, i) => <Book key={item.id} {...item} update={this.updateBook}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        read.map((item, i) => <Book key={item.id} {...item} update={this.updateBook}/>)
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