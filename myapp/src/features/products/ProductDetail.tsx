import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
            });
    }


    return (
        product ? <div>
            <h2>{product.name}</h2>

            {product.description ? <div> 
                <h3>Summary</h3>
                <div>
                    <ReactMarkdown>{product.description}</ReactMarkdown>
                </div>
            </div> : null}

            <label>Brand</label> {product.brand.name}
            <label>Types</label> {product.type.name}

            <label>Price</label> {product.price}

            {product.quantityStock ? 
            <div>
                <label>Stock:</label> {product.quantityStock}
            </div>
             : null }

            <Link style={{marginRight: '1rem'}} className="btn btn-info" to={`/products/edit/${product.productId}`}>Edit</Link>

            <Button onClick={() => customConfirm(() => deleteProduct())} className="btn btn-danger" >Delete</Button>
        </div> : <Loading />
    )
}