import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlTypes } from "../../app/layout/endpoints";
import DisplayErrors from "../../app/utils/DisplayErrors";
import { typesCreationDTO } from "./types.model";
import TypesForm from "./TypesForm";

export default function CreateTypes() {
    const history = useHistory();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(types: typesCreationDTO) {
        try {
            await axios.post(urlTypes, types);
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
        <h3>Create Genre</h3>
            <DisplayErrors errors={errors} />
            <TypesForm model={{name: ''}} 
                onSubmit={async value => {
                    await create(value);
                }}
            />
        </>
    )
}