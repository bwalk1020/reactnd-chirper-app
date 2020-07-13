import React, { Component } from 'react'
import Tweet from './Tweet'
import { connect } from 'react-redux'
import NewTweet from './NewTweet';

class TweetPage extends Component {
  render() {
    let { id, replies } = this.props;
    console.log('the props', this.props)
    if(!id) {
      id = this.props.match.params.id;
    }
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
          {replies && replies.length !== 0 && <h3 className="center">Replies</h3>}
          <ul>
            {replies && replies.map((replyId) => (
              <li key={replyId}>
                <Tweet id={replyId} />
              </li>
            ))}
          </ul>
      </div>
    )
  }
}

function mapStateToProps({authedUser, tweets, users}, props) {
  const { id } = props.match.params

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(TweetPage)