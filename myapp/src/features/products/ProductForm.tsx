import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react"
import { brandDto } from "../brand/brand.model";
import { typesDto  } from "../types/types.model";
import { productCreationDto } from "./product.model";
import TextField from "../../app/forms/TextField";
import ImageField from "../../app/forms/ImageField";
import axios, { AxiosResponse } from "axios";
import { urlProducts } from "../../app/layout/endpoints";
import Button from "../../app/forms/Button";
import { Link } from "react-router-dom";
import NumberField from "../../app/forms/NumberField";

export default function ProductForm(props: productFormProps) {

    const [types, setTypes] = useState<typesDto[]>();
    const [brand, setBrand] = useState<brandDto[]>();
    const [errors, setErrors] = useState<string[]>([]);
    
    useEffect(() => {
        axios.get(`${urlProducts}/SelectType`)
            .then((response: AxiosResponse<typesDto[]>) => {
                setTypes(response.data);
            }) .catch(function (error) {
                setErrors(error);
              });
    }, [])

    useEffect(() => {
        axios.get(`${urlProducts}/SelectBrand`)
            .then((response: AxiosResponse<brandDto[]>) => {
                setBrand(response.data);
            }) .catch(function (error) {
                setErrors(error);
              });
    }, [])

    return (
        <Formik
          initialValues={props.model}
          onSubmit={(values, actions) => {
              props.onSubmit(values, actions)
          }}
          validationSchema={Yup.object({

          })}
          >
            {(formikProps) => (
                <Form>
                    <TextField displayName="Product Name" field="name" />
                    <TextField displayName="Description" field="description"/>
                    <NumberField displayName="Price" field="price"/>

                    <div className="mb-3">
                        <label htmlFor="Brand">Brand</label> 
                        <Field as="select" name="brandId" className="form-control">
                            {brand?.map(x => (
                                <option key={x.brandId} value={x.brandId}>{x.brandName}</option>
                            ))}                        
                        </Field>    
                         <ErrorMessage name="Brand"/> 
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Type">Types</label> 
                        <Field as="select" name="typeId" className="form-control">
                            {types?.map(x => (
                                <option key={x.typeId} value={x.typeId}>{x.typeName}</option>
                            ))} 
                        </Field>
                         <ErrorMessage name="Type"/> 
                    </div>                    

                    <NumberField displayName="Quantity Stock" field="quantityStock"/>

                    <ImageField displayName="Poster" field="pictureUrl" imageURL={props.model.pictureUrl}/>

                    <Button disabled={formikProps.isSubmitting} type='submit' >Save Changes</Button>
                    <Link className="btn btn-secondary" to="/">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface productFormProps {
    model: productCreationDto,
    onSubmit(values: productCreationDto, actions: FormikHelpers<productCreationDto>) : void;
}