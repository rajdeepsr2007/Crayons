import React from "react";
import Auth from "./containers/Auth/auth";
import Layout from "./hoc/Layout/layout";
import {BrowserRouter, Switch , Route , Redirect} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/menu' component={Auth} />
            <Redirect to='/auth' />
          </Switch>
        </Layout>
    </BrowserRouter>
    
    
  );
}

export default App;
