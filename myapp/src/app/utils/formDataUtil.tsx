import { productCreationDto } from "../../features/products/product.model";

export function convertProductToFormData(product: productCreationDto) {
    const formData = new FormData();

    formData.append('name', product.name);

    if(product.description) {
        formData.append('description', product.description);
    }

    formData.append('price', JSON.stringify(product.price));
    formData.append('brandId', JSON.stringify(product.brandId));
    formData.append('typeId', JSON.stringify(product.typeId));

    if(product.quantityStock) {
        formData.append('quantityInStock', JSON.stringify(product.quantityStock));
    }

    if(product.pictureUrl) {
        formData.append('poster', JSON.stringify(product.pictureUrl));
    }
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