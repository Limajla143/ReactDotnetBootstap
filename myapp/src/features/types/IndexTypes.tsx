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
                        <tr key={type.id}>
                            <td>
                                {buttons(`/types/edit/${type.id}`, type.id)}  
                            </td>
                            <td>
                                {type.name}
                            </td>
                        </tr>
                    )}
                </tbody>
            </>}

            </IndexEntity>
        </>
    )
}