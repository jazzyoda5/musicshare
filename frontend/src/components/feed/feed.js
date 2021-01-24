import React from "react";
import "./feed.css";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Header from '../header';


const Feed = ({ isAuthenticated }) => {
  console.log('isAuth: ', isAuthenticated);

  if (isAuthenticated !== true) {
    return (<Redirect to="/login" />);
  }
  return (
    <div className="feed">
        <Header />
        <h1>Feed</h1>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Feed);