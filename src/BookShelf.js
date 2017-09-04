import React from 'react'
import Book from './Book'

const BookShelf = (props) => (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            props.data.map((item, i) => <Book key={item.id} {...item} update={props.updateBook}/>)
          }
        </ol>
      </div>
    </div>
)

export default BookShelf