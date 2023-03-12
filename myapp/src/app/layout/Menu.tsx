import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthenticationContext from "../../features/auth/AuthenticationContext";
import Authorized from "../../features/auth/Authorized";
import { logout } from "../../features/auth/handleJWT";
import Button from "../forms/Button";

export default function Menu () {

    const {update, claims} = useContext(AuthenticationContext);

    function getUserEmail() : string {
        return claims.filter(x => x.name === "email")[0]?.value;
    }

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"> MyApp</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">
                                   Products
                                </NavLink>
                            </li>                          
                        </ul>
                        <div className="d-flex">
                                <Authorized
                                    authorized={<>
                                    <span className="nav-link">Hello, {getUserEmail()}</span>
                                    <Button onClick={() => {
                                         logout(); 
                                         update([]) 
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
      </>
    );
}