
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';
import routes from './route.config';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />     
     <div className='container'>
     <Switch>
          {routes.map(route => 
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.isAdmin ? <>
                You are not allowed to see this page
              </> : <route.component /> }
            </Route>
            )}
        </Switch>
     </div>
    </>
     
   
  );
}

export default App;
