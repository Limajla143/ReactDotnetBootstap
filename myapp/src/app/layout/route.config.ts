import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import ProductList from "../../features/products/ProductList";
import LandingPage from "./LandingPage";

const routes = [
    {path: '/products', component: ProductList, exact: true, isAdmin: true},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/', component: LandingPage}   
]

export default routes;