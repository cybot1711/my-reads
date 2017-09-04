import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route exact path="/" component={ListBooks}/>
            <Route path="/search" component={SearchPage}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default BooksApp
