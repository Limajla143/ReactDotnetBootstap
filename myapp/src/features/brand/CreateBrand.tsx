
import { urlBrand } from "../../app/layout/endpoints";
import CreateEntity from "../../app/utils/CreateEntity";
import { brandCreationDTO } from "./brand.model";
import BrandForm from "./BrandForm";

export default function CreateBrand() {
    return (
        <>
        <CreateEntity<brandCreationDTO>  url={urlBrand} entityName="Brand" indexUrl="/brand">
             {(create) => 
                    <BrandForm model={{name: ''}}
                        onSubmit={async value => {
                            await create(value);
                }}
                 />
                } 
        </CreateEntity>
        </>
    )
}