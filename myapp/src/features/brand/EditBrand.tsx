import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlBrand } from "../../app/layout/endpoints";
import DisplayErrors from "../../app/utils/DisplayErrors";
import Loading from "../../app/utils/Loading";
import { brandCreationDTO } from "./brand.model";
import BrandForm from "./BrandForm";

export default function EditBrand() {
    const {id}:any = useParams();

    const [brand, setBrand] = useState<brandCreationDTO>();
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${urlBrand}/${id}`)
        .then((response: AxiosResponse<brandCreationDTO>) => {
            setBrand(response.data);
        })
    }, [id])

    async function edit(brandToEdit: brandCreationDTO) {
        try {
            await axios.put(`${urlBrand}/${id}`, brandToEdit);
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
            <h3>Edit Brand</h3>
            <DisplayErrors errors={errors} />
            { brand ? <BrandForm model={brand} 
                onSubmit={async value => {
                await edit(value);
            }} /> : <Loading /> }
</>
)
}