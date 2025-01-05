export type Link = {
    name: string, 
    url: string
}

export type Product = {
    ID: number
    name: string
    description: string 
    typeID: number
    price: number 
    wholesalePrice: number 
    amount: number 
    imageUrl: string 
    active: boolean 
    type: Type
}

export type Type = {
    ID: number
    name: string 
    description: string
}

export type User = {
    ID: number;
    name: string;
    lastName: string;
    email: string;
    number: string;
    address: string;
    postalCode: string;
    neighborhood: string;
    state: string;
    city: string;
    country: string;
    admin: boolean;
    externNumber: number;
    internNumber: number;
    street: string;
};

export type Alert = {
    isError: boolean
    msg: string
}