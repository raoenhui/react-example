import React from "react";
import {
    BrowserRouter ,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import App from './App';
  import PullPage from './pullPage/index'
  export default class RouteConfig extends React.Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/pullPage" component={PullPage}/>
            <Redirect to="/"/>
          </Switch>
        </BrowserRouter>
      );
    }
  }
  