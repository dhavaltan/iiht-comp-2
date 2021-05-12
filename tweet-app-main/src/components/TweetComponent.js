import React , { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import userService from '../services/user.service'
import authService from '../services/auth.service'

const TweetComponent = ({ tweet }) => {

  const [currentUser, setCurrentUser] = useState(null)
  
  const handleLike = (e) => {
    e.preventDefault();
    userService.likeTweet(tweet.username, tweet.tweetId).then(res => 
      window.location.reload()
        ).catch(err => { console.log(err) })

  }

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user)
  }, [])

  const handleDelete = (e) => {
    e.preventDefault();
    userService.deleteTweet(tweet.username,tweet.tweetId).then(res => window.location.reload() ).catch(err => { console.log(err) })
  }

    return (
        <div className="card" style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '20px',
        minWidth: '500px',
            width : '50%',
            margin: '10px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100px'
            }}>
              <span style={{color: 'white'}}>{ tweet.username.substring(0,1).toUpperCase() }</span>
            </div>
            <div style={{marginLeft: '20px', flex: 1}}>
              <div style={{
                display: 'flex',
            flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
            <p style={{ margin: 0, marginRight: '10px' }}> <Link to={`/view-profile/${tweet.username}`}>@{ tweet.username }</Link> </p>
            <p >{tweet.createdDate.substring(0,10)}</p>
  
              </div>
          <p style={{ fontWeight: 'bold' }}>{tweet.text}</p>
              
            
            <div style={{
                display: 'flex',
            flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
            <a href="#" style={{ margin: 0, marginRight: '10px' }} onClick={handleLike}>{ tweet.userLikes ? tweet.userLikes.length : 0 } Like</a>
            {
              tweet ? currentUser ? tweet.username === currentUser.username ? (<a href="#" onClick={handleDelete}>delete tweet</a>) : null : null : null
            }
  
              </div>
              
            {/* <a href="#" style={{margin: 0}}>Reply</a> */}
              </div>
            
          </div>
    )
}

export default TweetComponent
