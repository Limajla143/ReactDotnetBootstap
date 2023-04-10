import IndexUsers from "../../features/auth/IndexUser";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import CreateBrand from "../../features/brand/CreateBrand";
import EditBrand from "../../features/brand/EditBrand";
import IndexBrand from "../../features/brand/IndexBrand";
import CreateProduct from "../../features/products/CreateProduct";
import EditProduct from "../../features/products/EditProduct";
import FilterProducts from "../../features/products/FilterProducts";
import ProductDetail from "../../features/products/ProductDetail";
import CreateTypes from "../../features/types/CreateTypes";
import EditTypes from "../../features/types/EditTypes";
import IndexTypes from "../../features/types/IndexTypes";
import LandingPage from "./LandingPage";

const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/users', component: IndexUsers, isAdmin: true},
    {path: '/types', component: IndexTypes, exact: true, isAdmin: true},
    {path: '/types/create', component: CreateTypes, isAdmin: true},
    {path: '/types/edit/:id(\\d+)', component: EditTypes, isAdmin: true},
    {path: '/brand', component: IndexBrand, exact: true, isAdmin: true},
    {path: '/brand/create', component: CreateBrand, isAdmin: true},
    {path: '/brand/edit/:id(\\d+)', component: EditBrand, isAdmin: true},
    {path: '/products/create', component: CreateProduct, isAdmin: true},
    {path: '/products/edit/:id(\\d+)', component: EditProduct, isAdmin: true},
    {path: '/products/:id(\\d+)', component: ProductDetail},
    {path: '/products', component: FilterProducts},
    {path: '/', component: LandingPage},
]

export default routes;