
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './route.config';
import { useEffect, useState } from 'react';
import AuthenticationContext from '../../features/auth/AuthenticationContext';
import { claim } from '../../features/auth/auth.model';
import { getClaims } from '../../features/auth/handleJWT';
import { ToastContainer } from 'react-toastify';
import configureInterceptor from '../../features/auth/httpinterceptor';
import configureValidations from '../utils/Validation';

configureValidations();
configureInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims())
  }, [])

  function isAdmin() { 
    return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
  }
  
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
    <BrowserRouter>
    <AuthenticationContext.Provider value={{claims, update: setClaims}}>
    <Menu />
      <div className='container'>
        <Switch>
          {routes.map(route => 
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.isAdmin && !isAdmin() ? <>
                You are not allowed to see this page
              </> : <route.component /> }
            </Route>
            )}
        </Switch>
        </div > 
        <footer className="bd-footer py-5 mt-5 bg-light">
            <div className="container">
                React Movies {new Date().getFullYear().toString()}
            </div>
        </footer>
    </AuthenticationContext.Provider>
    </BrowserRouter>
    </>
       
  );
}

export default App;