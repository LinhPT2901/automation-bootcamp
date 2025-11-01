import { request as pwRequest, APIRequestContext, expect } from '@playwright/test';

export async function createApiContext(baseURL: string, token?: string): Promise<APIRequestContext>{
    // headers mặc định cho JSON API
    const headers: Record<string,string> = {'Content-Type': 'application/json'};
    // nếu có token -> gắn Authorization
    if(token) headers['Authorization'] = `Bearer ${token}`;
    // tạo "client HTTP" riêng với baseURL + headers
    const ctx = await pwRequest.newContext({baseURL, extraHTTPHeaders: headers});
    // (tuỳ chọn) ping thử để chắc baseURL sống
    const ping = await ctx.get('/', {timeout: 10000});
    // chấp nhận mọi mã < 500 (không phải lỗi server)
    expect(ping.status(), 'Base URL should be reachable').toBeLessThan(500);
    return ctx;
}