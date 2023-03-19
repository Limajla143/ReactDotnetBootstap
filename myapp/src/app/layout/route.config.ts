import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import ProductList from "../../features/products/ProductList";
import CreateTypes from "../../features/types/CreateTypes";
import EditTypes from "../../features/types/EditTypes";
import IndexTypes from "../../features/types/IndexTypes";
import LandingPage from "./LandingPage";

const routes = [
    {path: '/products', component: ProductList, exact: true, isAdmin: true},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/types', component: IndexTypes},
    {path: '/types/create', component: CreateTypes},
    {path: '/types/edit/:id(\\d+)', component: EditTypes},
    {path: '/', component: LandingPage}   
]

export default routes;