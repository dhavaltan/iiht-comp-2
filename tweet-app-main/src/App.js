import React, { useEffect, useState} from 'react';

import './App.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChangePasswordPage from './components/ChangePasswordPage';
import ViewProfilePage from './components/ViewProfilePage';
import TweetReplyPage from './components/TweetReplyPage';
import HomePage from './components/HomePage';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import authService from './services/auth.service';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    const user = authService.getCurrentUser();
    if(user){
      setCurrentUser(user)
    }
  }, [])
  const logOut = ()=> {
    authService.logout();
    window.location.reload();
  }
  
  return (
    <Router>
      <div>
        <nav style={{
          width:'100%',
        }}>
          <ul>
                 {
              !currentUser ? (
                <>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
              </>
                ):(
                    <>
            <li >
              <Link to="/home">Home</Link>
            </li>
            {/* <li>
              <Link to="/change-password">change-password</Link>
            </li> */}
            {/* <li>
              <Link to="/tweet-reply">tweet-reply</Link>
            </li>
            <li>
              <Link to="/view-profile">view-profile</Link>
            </li> */}
            <li>
              <Link to="/login" onClick={logOut}>logout</Link>
            </li>
            </>
              )
}
          </ul>
        </nav>
              <Switch>
            {
              !currentUser ? (
                <>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/">
                  <Redirect to="/login" />
                </Route>
              </>
              ):(
                <>
                <Route exact path={["/", "/home"]} component={HomePage} />
                <Route path="/change-password">
                  <ChangePasswordPage />
                </Route>
                <Route path="/tweet-reply">
                  <TweetReplyPage />
                </Route>
                <Route path="/view-profile/:id">
                  <ViewProfilePage />
                </Route>
                <Route path="/">
                  <Redirect to="/home" />
                </Route>

                </>
              )
            }
        </Switch>
      </div>
    </Router>
  );
}
export default App;
