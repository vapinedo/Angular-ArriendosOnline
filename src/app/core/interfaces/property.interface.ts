export interface Property {
    id?: string;
    price: number;
    mobile: string;
    address: string;
    ownerID: string;
    images: string[];
    visible: boolean;
    category: string;
    description?: string;
    neighborhood: string;
    operationType: string;
    mobileOptional?: string;
}