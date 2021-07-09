import React, { useEffect, useState } from "react";
import Auth from "./containers/Auth/auth";
import Layout from "./hoc/Layout/layout";
import {BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';
import Menu from "./containers/Menu/menu";
import CreateRoom from "./containers/Room/Create/create-room";
import FindRooms from "./containers/Room/Find/find-rooms";
import Waiting from "./containers/Waiting/waiting";
import {connect} from 'react-redux';
import * as actions from './store/actions/';
import socketIOClient from "socket.io-client";
import Loader from "./components/UI/Loader/loader-big";

function App(props) {

    let routes = null;
    const {onAutoLogin , user } = props;
    const [socket , setSocket] = useState(null);

    useEffect(() => {
      if( !user ){
        const socket = socketIOClient(
          'http://localhost:5000'
        )
        setSocket(socket);
        onAutoLogin();
      }
    },[])

    useEffect(() => {
      if(user && socket){
          socket.emit('online' , {
            userId : user
          })
      }
    },[user])

    if( user ){
      routes = socket ?  (
        <Switch>
          <Route path='/find-rooms' component={FindRooms} />
          <Route path='/waiting/:roomId' render={() => <Waiting usersSocket={socket}/> } />
          <Route path='/menu' component={Menu} />
          <Route path='/create-room' component={CreateRoom} />
          <Redirect to='/menu' />
        </Switch>
      ) : <Loader />
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
