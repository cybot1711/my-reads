import React from 'react'

/**
 * @description Stateless functional component for rendering a Book UI
 */

const Book = (props) => (
    <li>
      <div className="book">
        <div className="book-top">
          <div
              className="book-cover"
              style={{
                backgroundImage: `url(${props.imageLinks ? props.imageLinks.thumbnail : ''})`
              }}/>
          <div className="book-shelf-changer">
            <select onChange={event => props.update(props, event.target.value)} value={props.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors ?
            props.authors.map((i,k) => <span key={k}>{i}</span>) : ''
        }</div>
      </div>
    </li>
)

export default Book