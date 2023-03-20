import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlBrand } from "../../app/layout/endpoints";
import DisplayErrors from "../../app/utils/DisplayErrors";
import { brandCreationDTO } from "./brand.model";
import BrandForm from "./BrandForm";

export default function CreateBrand() {
    const history = useHistory();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(brand: brandCreationDTO) {
        try {
            await axios.post(urlBrand, brand);
            history.push('/brand');
        }
        catch(error: any) {
            if(error && error.response) {
                setErrors(error.response.data);
            }        
        }
    }
    return (
        <>
        <h3>Create Brand</h3>
            <DisplayErrors errors={errors} />
            <BrandForm model={{name: ''}} 
                onSubmit={async value => {
                    await create(value);
                }}
            />
        </>
    )
}