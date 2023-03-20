import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import Button from "../../app/forms/Button";
import TextField from "../../app/forms/TextField";
import configureValidations from "../../app/utils/Validation";
import { brandCreationDTO } from "./brand.model";

configureValidations();

export default function BrandForm(props: brandFormProps) {
    return (
        <Formik initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            name: Yup.string().required('This field is required')
            //.max(50, 'Max length is 50 characters').firstLetterUppercase()
        })}
        >
        {(formikProps) => (
             <Form>
             <TextField field="name" displayName="Name"/>
             <Button disabled={formikProps.isSubmitting} type='submit' >Save Changes</Button>
             <Link className="btn btn-secondary" to="/brand">Cancel</Link>
         </Form>          
        )}
        </Formik>
    )

}

interface brandFormProps {
    model: brandCreationDTO;
    onSubmit(values: brandCreationDTO, action: FormikHelpers<brandCreationDTO>) : void;
}