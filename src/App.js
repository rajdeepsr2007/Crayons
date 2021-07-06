import React, { useEffect } from "react";
import Auth from "./containers/Auth/auth";
import Layout from "./hoc/Layout/layout";
import {BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';
import Menu from "./containers/Menu/menu";
import CreateRoom from "./containers/Room/Create/create-room";
import FindRooms from "./containers/Room/Find/find-rooms";
import Waiting from "./containers/Waiting/waiting";
import {connect} from 'react-redux';
import * as actions from './store/actions/';

function App(props) {

  let routes = null;
  const {onAutoLogin , user } = props;
  useEffect(() => {
    if( !user ){
      onAutoLogin();
    }
  },[onAutoLogin,user])

  if( user ){
    routes = (
      <Switch>
        <Route path='/find-rooms' component={FindRooms} />
        <Route path='/waiting/:roomId' component={Waiting} />
        <Route path='/menu' component={Menu} />
        <Route path='/create-room' component={CreateRoom} />
        <Redirect to='/menu' />
      </Switch>
    )
  }else{
    routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
    return{
      user : state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
      onAutoLogin : () => dispatch(actions.autoLogin())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
