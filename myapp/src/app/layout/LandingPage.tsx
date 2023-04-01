import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productDto } from "../../features/products/product.model";
import ProductList from "../../features/products/ProductList";
import AlertContext from "../utils/AlertContext";
import { urlProducts } from "./endpoints";

export default function LandingPage() {
  const [products, setProducts] = useState<productDto[]>();

  useEffect(() => {
    loadData();
   }, []);

function loadData() {
  axios.get(urlProducts).then((response: AxiosResponse<productDto[]>) => {
    setProducts(response.data);
})
}

    return (
      <AlertContext.Provider value={() => {
          loadData();
        }}>
            <ProductList products={products}/>
      </AlertContext.Provider>
    )
}