import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../../pages/Login/index.js';
import { Register } from '../../pages/Register/index.js';
import { Pedidos } from '../../pages/Pedidos/index.js';
import { PageNotFound } from '../../pages/PageNotFound/index.js';
import { Cozinha } from '../../pages/Cozinha/index.js';
import { Menu } from '../../pages/Menu/index.js';
import PrivateRoute from "./router";
import { isAuthenticated } from './auth.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}>
          {isAuthenticated 
            ? <Redirect to="/menu" />
            || <Redirect to="/pedidos" />
            || <Redirect to="/cozinha" />
            : <Login />
          }
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/cadastro" component={Register} />
        <PrivateRoute component={Menu} path="/menu" />
        <PrivateRoute component={Cozinha} path="/cozinha" />
        <PrivateRoute component={Pedidos} path="/pedidos" />
        <Route path='*' exact={true} component={PageNotFound} />  
      </Switch>
    </BrowserRouter >
  )
}
export default App;