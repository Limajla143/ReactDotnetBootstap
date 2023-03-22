import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlBrand } from "../../app/layout/endpoints";
import DisplayErrors from "../../app/utils/DisplayErrors";
import EditEntity from "../../app/utils/EditEntity";
import Loading from "../../app/utils/Loading";
import { brandCreationDTO, brandDto } from "./brand.model";
import BrandForm from "./BrandForm";

export default function EditBrand() {
    
    
    return (
        <>
             <EditEntity<brandCreationDTO, brandDto>
                url={urlBrand} entityName="Brand" indexUrl="/brand"
                >
                {(entity, edit) => 
                    <BrandForm model={entity}
                        onSubmit={async value => {
                            await edit(value);
                }}
                 />
                } 
                </EditEntity>
        </>
)
}