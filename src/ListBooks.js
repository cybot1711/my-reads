import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

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
                        <BookShelf title='Currently Reading' data={currentlyReading} updateBook={this.updateBook}/>
                        <BookShelf title='Want To Read' data={wantToRead} updateBook={this.updateBook}/>
                        <BookShelf title='Read' data={read} updateBook={this.updateBook}/>
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