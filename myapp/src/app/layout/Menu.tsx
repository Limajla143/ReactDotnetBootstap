import { NavLink } from "react-router-dom";

export default function Menu () {
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
                    </div>
                    {/* <div className="d-flex">
                                <Authorized
                                    authorized={<></>}
                                    noAuthorized={<>
                                        <Link to="/register"
                                        className="nav-link btn btn-link">Register</Link>
                                        <Link to="/login"
                                        className="nav-link btn btn-link">Login</Link>
                                    </>}
                                />
                       </div>      */}
            </div>
        </nav>
      </>
    );
}