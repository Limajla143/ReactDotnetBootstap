import axios from "axios";
import { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function CreateEntity<TCreation>(props: createEntityProps<TCreation>) {
    const [errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    async function create(entityToCreate: TCreation) {
        try {
            await axios.post(`${props.url}`, entityToCreate);
            history.push(`${props.indexUrl}`);
        }
        catch(error: any) {
            if(error && error.response) {
                setErrors(error.response.data);
                setErrors(error.response.data);
            }        
        }
    }

    return (
        <>
            <h3>Create {props.entityName}</h3>
            <DisplayErrors errors={errors} />
            {props.children(create)}
        </>
    )
}

interface createEntityProps<TCreation> {
    url: string;
    entityName: string;
    indexUrl: string;
   children(create: (entity: TCreation) => void): ReactElement;
}