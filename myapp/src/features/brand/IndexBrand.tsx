import { urlBrand } from "../../app/layout/endpoints";
import IndexEntity from "../../app/utils/IndexEntity";
import { brandDto } from "./brand.model";

export default function IndexBrand() {

    return (
        <>
              <IndexEntity<brandDto> url={urlBrand} createUrl="/brand/create" title="Brand" entityName="Brand">
                {(brands, buttons) => <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>                       
                    </thead>
                    <tbody>
                        {brands?.map(brand => 
                            <tr key={brand.id}>
                                <td>
                                    {buttons(`/brand/edit/${brand.id}`, brand.id)}  
                                </td>
                                <td>
                                    {brand.name}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </>}

                </IndexEntity>
        </>
    )
}