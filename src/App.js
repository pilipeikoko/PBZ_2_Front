import logo from './logo.svg';
import './App.css';

import {User} from './User/User';
import {Manager} from './Manager/Manager';
import {Vehicle} from './Vehicle/Vehicle';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">
            PBZ lab 2
          </h3>

          <Navigation/>

          <Switch>
            <Route path='/' component={User} exact/>
            <Route path='/user' component={User} exact/>
            <Route path='/manager' component={Manager}/>
            <Route path='/vehicle' component={Vehicle}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;