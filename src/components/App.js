import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import TweetPage from './TweetPage'
import NewTweet from './NewTweet'
import LoadingBar from 'react-redux-loading'
import Nav from '../components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <LoadingBar />
            <Nav />
            {this.props.loading === true 
              ? null
              : <div>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/tweet/:id" component={TweetPage} />
                  <Route path="/new" exact component={NewTweet} />
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}){
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);