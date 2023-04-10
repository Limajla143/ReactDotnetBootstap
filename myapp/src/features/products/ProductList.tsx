import { Link } from "react-router-dom";
import GenericList from "../../app/utils/GenericList";
import IndividualProduct from "./IndividualProduct";
import { productDto } from "./product.model";
import css from './ProductList.module.css';
import Authorized from "../auth/Authorized";

export default function ProductList(props: productListProps) {
    return (
        <>
            <div className="mb-3">
            <Authorized 
                 role="admin"
                 authorized={ <>  <Link className="btn btn-primary" to={`/products/create`}>Create Product</Link> </> } />
                
            </div>

            <GenericList list={props.products}>
            <div className={css.div}> 
                {props.products?.map(product => 
                    <IndividualProduct {...product} key={product.productId} />
                )}
            </div>
            </GenericList>
        </>
      
    )
}

interface productListProps {
  products?: productDto[];
}