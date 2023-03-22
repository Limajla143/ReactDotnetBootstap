import { urlTypes } from "../../app/layout/endpoints";
import EditEntity from "../../app/utils/EditEntity";
import { typesCreationDTO, typesDto } from "./types.model";
import TypesForm from "./TypesForm";

export default function EditTypes() {
            
    return (
        <>
        <EditEntity<typesCreationDTO, typesDto>
                url={urlTypes} entityName="Type" indexUrl="/types"
                >
                {(entity, edit) => 
                    <TypesForm model={entity}
                        onSubmit={async value => {
                            await edit(value);
                }}
                 />
                } 
                </EditEntity>
        </>
    )
}