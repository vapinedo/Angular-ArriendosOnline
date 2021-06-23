export interface Property {
    id?: string;
    price: number;
    address: string;
    ownerID: string;
    images: string[];
    visible: boolean;
    category: string;
    description?: string;
    neighborhood: string;
    operationType: string;
}