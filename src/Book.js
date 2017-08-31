import React from 'react'

const Book = ({title, authors, imageLinks, id, update}) => (
    <li>
      <div className="book">
        <div className="book-top">
          <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageLinks.thumbnail})`
              }}/>
          <div className="book-shelf-changer">
            <select onChange={event => update(id, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.map(i => i)}</div>
      </div>
    </li>
)

export default Book