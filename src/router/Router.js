/*
   Root, Router 配置
*/
import React from 'react';
import {Route, Switch} from 'react-router-dom';
 
import App from './../App';
import Home from './../views/home/Home';
import MovieInfo from './../views/movieInfo/MovieInfo';
import Photos from './../views/movieInfo/Photos';
 
const Root = () => (
  <Switch>
    <Route path="/"
      render={props => (
        <App>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/MovieInfo/:id" component={MovieInfo} />
            <Route path="/Photos/:id" component={Photos} />
            {/*路由不正确时，默认跳回home页面*/}
            {/* <Route render={() => <Redirect to="/" />} /> */}
          </Switch>
        </App>
      )}
    />
  </Switch>
);
 
export default Root;