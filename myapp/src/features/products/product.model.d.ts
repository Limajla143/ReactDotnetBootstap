export interface productDto {
    productId: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    brand: brandDto;
    type: typesDto;
    quantityStock?: number;
}

export interface productCreationDto {
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    brandId: number;
    typeId: number;
    quantityStock?: number;
}


export interface productUpdateDto {
    productId: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    brandId: number;
    typeId: number;
    quantityStock?: number;
}