import { test, expect } from '@playwright/test';

//Product 
type Product = { id: number; title: string; price: number };
type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };

test.describe('Products API', () => {
  test('GET /products?limit=1 -> 200 + schema nhẹ', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/products?limit=1`);
    expect(res.ok(), 'should be HTTP 2xx').toBeTruthy();
    expect(res.status()).toBe(200);

    // header cơ bản
    const ct = res.headers()['content-type'] || '';
    expect(ct).toContain('application/json');

    const data = (await res.json()) as unknown;

    // type guard nhanh tại chỗ
    const isProductsResponse = (x: any): x is ProductsResponse =>
      x && Array.isArray(x.products) && typeof x.total === 'number';

    expect(isProductsResponse(data)).toBe(true);

    const { products, limit } = data as ProductsResponse;
    expect(limit).toBe(1);
    expect(products.length).toBeGreaterThan(0);

    const p = products[0];
    console.log(products[0]);
    expect(typeof p.id).toBe('number');
    expect(typeof p.title).toBe('string');
    expect(typeof p.price).toBe('number');
  });
});


/*
export type Product = { id: number; title: string; price: number };
export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// Guard chi tiết cho Product
export const isProduct = (p: any): p is Product =>
  p &&
  typeof p.id === 'number' &&
  typeof p.title === 'string' &&
  typeof p.price === 'number';

// Guard tổng cho ProductsResponse
export const isProductsResponse = (x: any): x is ProductsResponse =>
  x &&
  Array.isArray(x.products) &&
  x.products.every(isProduct) &&
  typeof x.total === 'number' &&
  typeof x.skip === 'number' &&
  typeof x.limit === 'number';

// ✅ Cách 1 (đang dùng): Assertion function – nếu sai sẽ throw, còn đúng thì TS narrow kiểu
export function assertProductsResponse(x: unknown): asserts x is ProductsResponse {
  if (!isProductsResponse(x)) {
    throw new Error('Bad schema for ProductsResponse');
  }
}


// ❌ Cách 2 (cũ, giữ lại để tham khảo): type guard + expect()
// Nhược: expect(...) KHÔNG giúp TS narrow kiểu; vẫn phải "as ProductsResponse".
import { expect } from '@playwright/test';
export const expectProductsResponse = (x: unknown) => {
  expect(isProductsResponse(x)).toBe(true);
};

*/
