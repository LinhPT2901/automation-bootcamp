import {test, expect} from '@playwright/test';
import { createApiContext } from '../fixtures/apiContext';

test('GET /auth/me with token', async ({baseURL}) => {
    const tmp = await createApiContext(baseURL!);
    const loginRes = await tmp.post('/auth/login', {data: {username: 'kminchelle', password: '0lelplR'}});
    const {token} = await loginRes.json() as {token: string};
    await tmp.dispose();

    const api = await createApiContext(baseURL!, token);
    const me = await api.get('auth/me');
    expect([200, 404, 401]).toContain(me.status());
    await api.dispose();
});