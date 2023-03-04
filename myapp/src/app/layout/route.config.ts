import ProductList from "../../features/products/ProductList";
import LandingPage from "./LandingPage";

const routes = [
    {path: '/products', component: ProductList, exact: true, isAdmin: true},
    {path: '/', component: LandingPage}
]

export default routes;