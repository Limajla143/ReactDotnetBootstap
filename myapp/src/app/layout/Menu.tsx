import { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import AuthenticationContext from "../../features/auth/AuthenticationContext";
import Authorized from "../../features/auth/Authorized";
import { logout } from "../../features/auth/handleJWT";
import Button from "../forms/Button";

export default function Menu() {
    const {update, claims} = useContext(AuthenticationContext);

    const history = useHistory();

    function getUserEmail() : string {
        return claims.filter(x => x.name === "email")[0]?.value;
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"> React Movies </NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">        
                            <Authorized 
                                role="admin"
                                authorized={
                                    <>  
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/products">Search Products</NavLink>
                                      </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/types">Types</NavLink>
                                      </li>
                                      <li className="nav-item">
                                        <NavLink className="nav-link" to="/brand">Brand</NavLink>
                                      </li> 
                                      <li className="nav-item">
                                        <NavLink className="nav-link" to="/users">
                                            Users
                                        </NavLink>
                                    </li>              
                                    </>
                                }
                                noAuthorized={
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/products">Search Products</NavLink>
                                    </li>
                                </>
                                }
                                />                 
                        </ul>
                        <div className="d-flex">
                                <Authorized
                                     authorized={<>
                                     <span className="nav-link">Hello, {getUserEmail()}</span>
                                     <Button onClick={() => {
                                          logout(); 
                                          update([]);
                                          history.push('/');
                                     }}
                                     className="nav-link btn btn-link"> Logout</Button>
                                     </>
                                     }
                                    noAuthorized={<>
                                        <Link to="/register"
                                        className="nav-link btn btn-link">Register</Link>
                                        <Link to="/login"
                                        className="nav-link btn btn-link">Login</Link>
                                    </>}
                                />
                         </div>     
                    </div>
            </div>
        </nav>
    )
}