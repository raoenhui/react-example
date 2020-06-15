import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import App from './App';
import PullPage from './pullPage/index'
import PreLoadImg from './preLoadImg/index'
import PreLoadImg1 from './preLoadImg1/index'
import AniSvga from './AniSvga'
import AniLottie from './AniLottie'
import AniSprite from './AniSprite'
import AniCreatejs from './AniCreatejs'
export default class RouteConfig extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/pullPage" component={PullPage} />
          <Route path="/preLoadImg" component={PreLoadImg} />
          <Route path="/preLoadImg1" component={PreLoadImg1} />
          <Route path="/svga" component={AniSvga} />
          <Route path="/lottie" component={AniLottie} />
          <Route path="/creatjs" component={AniCreatejs} />
          <Route path="/sprite" component={AniSprite} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}
