import { productDto } from "./product.model";
import css from './IndividualProduct.module.css';
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import AlertContext from "../../app/utils/AlertContext";
import { urlProducts } from "../../app/layout/endpoints";
import axios from "axios";
import Button from "../../app/forms/Button";
import customConfirm from "../../app/utils/customConfirm";

export default function IndividualProduct(product: productDto) {
    const buildLink = () => `products/${product.productId}`;
    const customAlert = useContext(AlertContext);
    const history = useHistory();
    
    function deleteProduct() {
        axios.delete(`${urlProducts}/${product.productId}`)
            .then(() => {
                customAlert();
                history.push('/products');
            });
    }

    return (
        <div className={css.div}>
            <Link to={buildLink()}>
                <img alt="Poster" src={product.pictureUrl}/>
            </Link >
            <p>
                <Link  to={buildLink()} >{product.name}</Link >
            </p>

            <Link style={{marginRight: '1rem'}} className="btn btn-info" to={`/products/${product.productId}`}>Details</Link>


            <Button onClick={() => customConfirm(() => deleteProduct())} className="btn btn-danger" >Delete</Button>
        </div>
    )
}