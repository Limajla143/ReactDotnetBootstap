import { productCreationDto } from "../../features/products/product.model";

export function convertProductToFormData(product: productCreationDto) : FormData {
    const formData = new FormData();

    formData.append('name', product.name);

    if(product.description) {
        formData.append('description', product.description);
    }

    formData.append('price', product.price.toString());
    formData.append('brandId', product.brandId.toString());
    formData.append('typeId', product.typeId.toString());

    if(product.quantityStock) {
        formData.append('quantityStock', product.quantityStock.toString());
    }

    if(product.pictureUrl) {
        formData.append('pictureUrl', product.pictureUrl);
    }

    return formData;
}

function formatDate(date: Date) {
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en",{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}