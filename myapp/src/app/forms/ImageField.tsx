import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ImageField(props: imageFieldProps) {
    const [imageBase64, setImageBase64] = useState('');
    const [imageUrl, setImageURL] = useState(props.imageURL);
    const {values} = useFormikContext<any>();

    const divStyle = {marginTop: '10px'};
    const imgStyle = {width: '450px'};

    const handleOnChange = (eventArgs: ChangeEvent<HTMLInputElement>) => {
        if(eventArgs.currentTarget.files) {
            const file = eventArgs.currentTarget.files[0];
            if(file) {
                toBase64(file).then((base64Representation: string) => setImageBase64(base64Representation))
                .catch(error => toast.error(error));
                values[props.field] = file;
                setImageURL('');
            } else {
                setImageBase64('');
            }
        }
    }

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        })
    }

    return (
        <div className="mb-3">
            <label>{props.displayName}</label>
            <div>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnChange} />
            </div>
            {imageBase64 ?
                <div> 
                    <div style={divStyle}> 
                        <img style={imgStyle} src={imageBase64} id={props.field} alt="selected"/>
                    </div>
                </div>
            : null}

                {imageUrl ?
                <div> 
                    <div style={divStyle}> 
                        <img style={imgStyle} src={imageUrl} id={props.field} alt="selected"/>
                    </div>
                </div>
            : null }
        </div>
    )
}

interface imageFieldProps {
    displayName: string;
    imageURL: string;
    field: string;
}

ImageField.defaultProps = {
    imageURL: ''
}