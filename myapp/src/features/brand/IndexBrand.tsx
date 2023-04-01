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
                            <tr key={brand.brandId}>
                                <td>
                                    {buttons(`/brand/edit/${brand.brandId}`, brand.brandId)}  
                                </td>
                                <td>
                                    {brand.brandName}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </>}

                </IndexEntity>
        </>
    )
}