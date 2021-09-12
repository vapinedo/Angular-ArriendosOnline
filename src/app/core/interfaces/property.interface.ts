export interface Property {
    id?: string;
    price: number;
    address: string;
    mobile: string;
    images: string[];
    active: boolean;
    category: string;
    description?: string;
    neighborhood: string;
    operationType: string;
    mobileOptional?: string | null;
}