import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import TodoEvent from './Components/TodoEvent';
import NoPage from './Components/NoPage';
import PrivateRoute from './Auth/PrivateRoute';


function App (){
    return (
      <Router>
            <Switch>
            <Route exact path="/">
             <Redirect to="/login" />
            </Route>

              <Route exact path='/login' component={Login} />

              <Route exact path='/register' component={Register} />

              <PrivateRoute path="/todo-dashboard" component={TodoEvent} />

              <Route path="*" component={NoPage} />
            </Switch>
      </Router>
    );
  }

export default App;


