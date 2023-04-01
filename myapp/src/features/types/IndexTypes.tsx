import { urlTypes } from "../../app/layout/endpoints";
import IndexEntity from "../../app/utils/IndexEntity";
import { typesDto  } from "./types.model";

export default function IndexTypes() {
   

    return (
        <>
           <IndexEntity<typesDto> url={urlTypes} createUrl="/types/create" title="Types" entityName="Types">

            {(types, buttons) => <>
                 <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>                       
                </thead>
                <tbody>
                    {types?.map(type => 
                        <tr key={type.typeId}>
                            <td>
                                {buttons(`/types/edit/${type.typeId}`, type.typeId)}  
                            </td>
                            <td>
                                {type.typeName}
                            </td>
                        </tr>
                    )}
                </tbody>
            </>}

            </IndexEntity>
        </>
    )
}