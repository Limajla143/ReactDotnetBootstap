import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { urlProducts } from "../../app/layout/endpoints";
import { productDto } from "./product.model";
import { Form, Formik } from "formik";
import Pagination from "../../app/utils/Pagination";
import ProductList from "./ProductList";
import Button from "../../app/forms/Button";
import { toast } from "react-toastify";

export default function FilterProducts() {
    const initialValues: filterProductsForm = {
        name: '',
        page: 1,
        recordsPerPage: 5
    }

    const history = useHistory();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [products, setProducts] = useState<productDto[]>([]);
    const query = new URLSearchParams(useLocation().search);

    function modifyURL(values: filterProductsForm) {
        const queryStrings: string[] = [];

        if(values.name) {
            queryStrings.push(`name=${values.name}`);
        }

        queryStrings.push(`page=${values.page}`);

        history.push(`/products/?${queryStrings.join('&')}`);
    }

    function searchProducts(values: filterProductsForm) {
        modifyURL(values);
        try{
            axios.get(`${urlProducts}/`, {params: values})
            .then((response: AxiosResponse<productDto[]>) => {
                const records = parseInt(response.headers['totalAmountOfRecords'], 10);
                setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage ));
                setProducts(response.data);
            })
        }
        catch(error: any) {
            toast.error(error);
        }
    }

    useEffect(() => {
         if(query.get('name')) {
            initialValues.name = query.get('name')!;
        }

        if(query.get('page')){
            initialValues.page = parseInt(query.get('page')!, 10);
        }

        searchProducts(initialValues);
    }, [])
    return (
        <>
            <h3>Filter Products</h3>
             <Formik initialValues={initialValues} 
             onSubmit={values => {
                values.page = 1;
                searchProducts(values);
             }} >
                {(formikProps) => (
                    <>
                        <Form>
                          <div className="row gx-3 align-items-center mb-3">
                        <div className="col-auto">
                            <input type="text" className="form-control" id="name" placeholder="Name of Product"
                            {...formikProps.getFieldProps("name")}/>
                        </div>
                        <div className="col-auto">
                            <Button className="btn btn-primary"
                            onClick={() => formikProps.submitForm()}
                            >Filter</Button>
                            <Button className="btn btn-danger ms-3"
                            onClick={() => {
                                formikProps.setValues(initialValues);
                                searchProducts(initialValues);
                            }}
                            >Clear</Button>
                        </div>
                    </div>
                        </Form>

                        <ProductList products={products} />
                        <Pagination totalAmountOfPages={totalAmountOfPages}
                        currentPage={formikProps.values.page}
                        onChange={newPage => {
                            formikProps.values.page = newPage;
                            searchProducts(formikProps.values);
                        }}
                        />
                    </>                   
                )}
             </Formik>
        </>
    )
}


interface filterProductsForm {
    name: string;
    page: number;
    recordsPerPage: number;
}