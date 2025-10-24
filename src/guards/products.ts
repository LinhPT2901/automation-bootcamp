export type Product = { id: number; title: string; price: number};
export type ProductsResponse = {
    products: Product[];
    total: number;
    limit: number;
};

// Guard chi tiet cho Product
export const isProduct = (p: any): p is Product =>
    p &&
    typeof p.id === 'number' &&
    typeof p.title === 'string' &&
    typeof p.price === 'number';

// Guard tong cho ProductsResponse

export const isProductsResponse = (x: any): x is ProductsResponse =>
    x &&
    Array.isArray(x.products) &&
    x.products.every(isProduct) &&
    typeof x.total === 'number' &&
    typeof x.limit === 'number';

export function assertProductsResponse(x: unknown): asserts x is ProductsResponse{
    if(!isProductsResponse){ 
        throw new Error('Bad schema for ProductsResponse');
    }
}