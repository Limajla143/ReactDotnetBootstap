
import { urlTypes } from "../../app/layout/endpoints";
import CreateEntity from "../../app/utils/CreateEntity";
import { typesCreationDTO } from "./types.model";
import TypesForm from "./TypesForm";

export default function CreateTypes() {
    return (
        <>
        <CreateEntity<typesCreationDTO>  url={urlTypes} entityName="Type" indexUrl="/types">
             {(create) => 
                    <TypesForm model={{name: ''}}
                        onSubmit={async value => {
                            await create(value);
                }}
                 />
                } 
        </CreateEntity>
       </>    
    )
}