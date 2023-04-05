import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlProducts } from "../../app/layout/endpoints";
import { convertProductToFormData } from "../../app/utils/formDataUtil";
import Loading from "../../app/utils/Loading";
import { productCreationDto, productUpdateDto } from "./product.model";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";

export default function EditProduct() {
    const {id}: any = useParams();
    const [product, setProduct] = useState<productCreationDto>();
    const [productGet, setProductGet] = useState<productUpdateDto>();
    const history = useHistory();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlProducts}/${id}`)
        .then((response: AxiosResponse<productUpdateDto>) => {
            const model : productCreationDto = {
                name: response.data.name,
                description: response.data.description,
                price: response.data.price,
                pictureUrl: response.data.pictureUrl,
                brandId: response.data.brandId,
                typeId: response.data.typeId,
                quantityStock: response.data.quantityStock
            };
            
            setProduct(model);
            setProductGet(response.data);
        })
    }, [id]);

    async function Edit(productToEdit: productCreationDto) {
        try {
            const formData = convertProductToFormData(productToEdit);
            const response = await axios({
                method: 'put',
                url: `${urlProducts}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history.push(`/products/${id}`);
        } catch (error: any) {
            setErrors(error.response.data);
            toast.error(error);  
        }
    }
    
    return (
        <>
            <h3>Edit Product</h3>
            {
                product && productGet ? <ProductForm model={product} onSubmit={async values => await Edit(values)} /> : <Loading />
            }
            
        </>
    )
}