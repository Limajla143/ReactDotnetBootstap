import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import Button from "../../app/forms/Button";
import TextField from "../../app/forms/TextField";
import configureValidations from "../../app/utils/Validation";
import { typesCreationDTO } from "./types.model";

configureValidations();

export default function TypesForm(props: typesFormProps) {
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
             <Link className="btn btn-secondary" to="/types">Cancel</Link>
         </Form>          
        )}
        </Formik>
    )

}

interface typesFormProps {
    model: typesCreationDTO;
    onSubmit(values: typesCreationDTO, action: FormikHelpers<typesCreationDTO>) : void;
}