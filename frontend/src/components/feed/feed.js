import React from "react";
import "./feed.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from '../header';


const Feed = (props) => {

  return (
    <div className="feed">
        <Header />
        <h1>Feed</h1>
    </div>
  );
}

export default Feed;