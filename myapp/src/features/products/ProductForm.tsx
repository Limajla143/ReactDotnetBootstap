import { Field, Form, Formik, FormikHelpers } from "formik";
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
                    <TextField displayName="Product Name" field="name"/>
                    <TextField displayName="Description" field="description"/>
                    <TextField displayName="Price" field="price"/>

                    <Field as="select" name="brandId">
                        {brand?.map(x => (
                             <option key={x.brandId} value={x.brandId}>{x.brandName}</option>
                        ))}                        
                    </Field>

                    <Field as="select" name="typeId">
                    {types?.map(x => (
                             <option key={x.typeId} value={x.typeId}>{x.typeName}</option>
                        ))} 
                    </Field>

                    <TextField displayName="Quantity Stock" field="quantityStock"/>

                    <ImageField displayName="Poster" field="poster" imageURL={props.model.pictureUrl}/>

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