import { ErrorMessage, Field } from "formik";

export default function NumberField(props: numberFieldProps) {
    return (
        <div className="mb-3">
        <label htmlFor={props.field}>{props.displayName}</label>     
        <Field  type={props.type}
            name={props.field} id={props.field} className="form-control" />
        <ErrorMessage name={props.field} /> 
        </div>
    );
}


interface numberFieldProps {
    field: string;
    displayName: string;
    type: 'number';
}

NumberField.defaultProps = {
    type: 'number'
}