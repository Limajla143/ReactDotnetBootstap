import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { urlProducts } from "../../app/layout/endpoints";
import Loading from "../../app/utils/Loading";
import { productDto } from "./product.model";
import ReactMarkdown from "react-markdown";
import Button from "../../app/forms/Button";
import customConfirm from "../../app/utils/customConfirm";
import AlertContext from "../../app/utils/AlertContext";

export default function ProductDetails() {
    const {id} : any = useParams();
    const [product, setProduct] = useState<productDto>();
    const history = useHistory();

    const customAlert = useContext(AlertContext);

    useEffect(() => {
        axios.get(`${urlProducts}/${id}`)
            .then((response: AxiosResponse<productDto>) => {
                setProduct(response.data);
            })
    }, [id]);

    function deleteProduct() {
        axios.delete(`${urlProducts}/${id}`)
            .then(() => {
                customAlert();
                history.push('/products');
            });
    }


    return (
        product ? <div>
            <h4>{product.name}</h4>

            {product.description ? <div className="mb-3"> 
                <h5>Summary</h5>
                <ReactMarkdown>{product.description}</ReactMarkdown>
            </div> : null}
            
            <div className="mb-3">
                <label>Brand: </label> {product.brand.brandName}
            </div>

            <div className="mb-3">
                <label>Types: </label> {product.type.typeName}
            </div>
            
            <div className="mb-3">
                <label>Price: </label> {product.price}
            </div>

            {product.quantityStock ? 
            <div className="mb-3">
                <label>Stock: </label> {product.quantityStock}
            </div>
             : null }

            <div style={{marginTop: '10px'}} className="mb-3">
                    <img style={{width: '450px'}} src={product.pictureUrl} id={product.pictureUrl} alt="selected"/>
            </div>

            <Link style={{marginRight: '1rem'}} className="btn btn-info" to={`/products/edit/${product.productId}`}>Edit</Link>

            <Button onClick={() => customConfirm(() => deleteProduct())} className="btn btn-danger" >Delete</Button>
        </div> : <Loading />
    )
}