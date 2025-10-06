import { test, expect } from '@playwright/test';
import users from "../test_data/reqres_users_page2.json"

test.describe('API Testing', () => {
    // GET all users - Compare to saved response
    test('GET all users - Compare to saved response', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=2');
        // verify status from headers
        expect(response.status()).toBe(200);
        // verify response body
        const body = await response.json();
        expect(body).toEqual(users);
    });

    // GET single user - Verify specific fields
    test('GET single user - Verify specific fields', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/8');
        // verify status from headers
        expect(response.status()).toBe(200);
        // verify response body
        const body = await response.json();
        expect(body.data).toBeDefined();
        expect(body.data.id).toBe(8);
        expect(body.data.email).toBe("lindsay.ferguson@reqres.in");
        expect(body.data.first_name).toBe("Lindsay");
        expect(body.data.last_name).toBe("Ferguson");
        expect(body.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg");
        });
});