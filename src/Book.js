import React from 'react'

/**
 * @description Stateless functional component for rendering a Book UI
 */

const Book = ({title, authors, imageLinks, id, update, shelf}) => (
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
            <select onChange={event => update(id, event.target.value)} value={shelf}>
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