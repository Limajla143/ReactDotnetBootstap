import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import CreateBrand from "../../features/brand/CreateBrand";
import EditBrand from "../../features/brand/EditBrand";
import IndexBrand from "../../features/brand/IndexBrand";
import ProductList from "../../features/products/ProductList";
import CreateTypes from "../../features/types/CreateTypes";
import EditTypes from "../../features/types/EditTypes";
import IndexTypes from "../../features/types/IndexTypes";
import LandingPage from "./LandingPage";

const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/types', component: IndexTypes, exact: true},
    {path: '/types/create', component: CreateTypes},
    {path: '/types/edit/:id(\\d+)', component: EditTypes},
    {path: '/brand', component: IndexBrand, exact: true},
    {path: '/brand/create', component: CreateBrand},
    {path: '/brand/edit/:id(\\d+)', component: EditBrand},
    {path: '/products', component: ProductList, exact: true, isAdmin: true},
    {path: '/', component: LandingPage}   
]

export default routes;