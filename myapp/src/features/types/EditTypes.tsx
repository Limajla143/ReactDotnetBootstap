import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlTypes } from "../../app/layout/endpoints";
import DisplayErrors from "../../app/utils/DisplayErrors";
import Loading from "../../app/utils/Loading";
import { typesCreationDTO } from "./types.model";
import TypesForm from "./TypesForm";

export default function EditTypes() {
    const {id}:any = useParams();

            const [types, setTypes] = useState<typesCreationDTO>();
            const [errors, setErrors] = useState<string[]>([]);
            const history = useHistory();

            useEffect(() => {
                axios.get(`${urlTypes}/${id}`)
                .then((response: AxiosResponse<typesCreationDTO>) => {
                    setTypes(response.data);
                })
            }, [id])

            async function edit(typesToEdit: typesCreationDTO) {
                try {
                    await axios.put(`${urlTypes}/${id}`, typesToEdit);
                    history.push('/types');
                } 
                catch(error: any) {
                    if(error && error.response) {
                        setErrors(error.response.data);
                    }
                }
            }
            
    return (
        <>
        <h3>Edit Genre</h3>
        <DisplayErrors errors={errors} />
        { types ? <TypesForm model={types} 
            onSubmit={async value => {
            await edit(value);
            }} /> : <Loading /> }
        </>
    )
}