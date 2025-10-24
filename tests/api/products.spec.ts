import { test, expect } from '@playwright/test';
import { assertProductsResponse, ProductsResponse} from '../../src/guards/products';

test.describe('Product API',() => {
  
  // Case 1: Get 5 products
  test('GET /products?limit=5 -> 200 + schema nhẹ', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/products?limit=5`);

    // check that status code is 200
    expect(res.ok(), 'should be HTTP 2xx').toBeTruthy();
    expect(res.status()).toBe(200);

    // check that header contains 'application/json'
    const ct = res.headers()['content-type'] || '';
    expect(ct).toContain('application/json');

    // get data json
    const data = (await res.json()) as unknown;

    assertProductsResponse(data);
    const { products, limit } = data; // data đã được narrow thành ProductsResponse
    
    // check that number of products is 5 and type of product is correct 
    expect(limit).toBe(5);
    expect(products.length).toBeGreaterThan(0);
    const p = products[0];
    expect(typeof p.id).toBe('number');
    expect(typeof p.title).toBe('string');
    expect(typeof p.price).toBe('number');
  });

  // Case 2: limit = -1 -> status code: 400/422/200
  test('GET /products?limit=-1', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/products?limit=-1`);
    expect([200, 400, 422]).toContain(res.status());
  });

  //Case 3: unknown endpoint
  test('GET /unknown-endpoint', async ({ request, baseURL }) => {
    const res = await request.get('${baseURL}/unknown-endpoint');
    expect(res.status()).toBe(404);
  });
});