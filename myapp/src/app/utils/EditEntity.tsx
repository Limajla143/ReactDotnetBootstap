import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";
import { toast } from "react-toastify";

export default function EditEntity<TCreation, TRead>(props: editEntityProps<TCreation, TRead>) {

            const {id}:any = useParams();

            const [entity, setEntity] = useState<TCreation>();
            const [errors, setErrors] = useState<string[]>([]);
            const history = useHistory();

            useEffect(() => {
                axios.get(`${props.url}/${id}`)
                .then((response: AxiosResponse<TRead>) => {
                    setEntity(props.transform(response.data));
                })
            }, [id])

            async function edit(entityToEdit: TCreation) {
                try {
                    await axios.put(`${props.url}/${id}`, entityToEdit);
                    history.push(props.indexUrl);
                } 
                catch(error: any) {
                    if(error && error.response) {
                        setErrors(error.response.data);
                        toast.error(error.response.data);
                    }
                }
            }

            return (
                <>
                    <h3>Edit {props.entityName}</h3>
                    <DisplayErrors errors={errors} />
                    {entity ? props.children(entity, edit) : <Loading />}
                </>
                )                  
}

interface editEntityProps<TCreation, TRead> {
    url: string;
    entityName: string;
    indexUrl: string;
    transform(entity: TRead): TCreation;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity
}