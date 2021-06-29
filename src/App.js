import React from "react";
import Auth from "./containers/Auth/auth";
import Layout from "./hoc/Layout/layout";
import {BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';
import Menu from "./containers/Menu/menu";
import CreateRoom from "./containers/Room/Create/create-room";

function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/menu' component={Menu} />
            <Route path='/create-room' component={CreateRoom} />
            <Redirect to='/auth' />
          </Switch>
        </Layout>
    </BrowserRouter>
    
    
  );
}

export default App;
