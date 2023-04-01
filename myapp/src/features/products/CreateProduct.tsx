import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlProducts } from "../../app/layout/endpoints";
import DisplayErrors from "../../app/utils/DisplayErrors";
import { convertProductToFormData } from "../../app/utils/formDataUtil";
import Loading from "../../app/utils/Loading";
import { productCreationDto } from "./product.model";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    async function create(product: productCreationDto) {
        try {
            const formData = convertProductToFormData(product);
            console.log(formData);
            const response = await axios({
                method: 'post',
                url: urlProducts,
                data: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
            })
            console.log(response.data);
            history.push(`/products/${response.data}`);
        }
        catch (error: any) {
            setErrors(error.response.data);
        }
    }

    return (
        <>
            <h3>Add Product</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading /> : 
                <ProductForm model={{name: '', description: '', price: 0.00, pictureUrl: '', brandId: 0, typeId: 0, quantityStock: 0}}
                    onSubmit={async values => await create(values)}
                />
            }
        </>
    )
}