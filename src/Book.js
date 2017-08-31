import React from 'react'

const Book = ({title, authors, imageLinks, id, update }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${imageLinks.thumbnail})`
        }}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading" onClick={update(id,'currentlyReading')} >Currently Reading</option>
            <option value="wantToRead" onClick={update(id,'wantToRead')}>Want to Read</option>
            <option value="read" onClick={update(id,'read')}>Read</option>
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