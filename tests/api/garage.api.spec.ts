import test, { expect } from "@playwright/test";
import { testUser1 } from "../../test-data/validUsers";

test.describe('Get brands and models', () => {
    test('Get all brands', async ({ request }) => {
        const response = await request.get('/api/cars/brands');
        const responseJson = await response.json();
        const brands = responseJson.data;
        expect(response.status()).toBe(200);
        expect(brands).toHaveLength(5);
    })

    test('Get all models', async ({ request }) => {
        const response = await request.get('/api/cars/models');
        const responseJson = await response.json();
        const models = responseJson.data;

        expect(response.status()).toBe(200);
        expect(models).toHaveLength(23);
    })

    test('Get model by id', async ({ request }) => {
        const response = await request.get('/api/cars/models/2');
        const responseJson = await response.json();
        const model = responseJson.data;

        expect(model.carBrandId).toBe(1);
        expect(model.title).toBe('R8');
    })

    test('Get model by invalid id', async ({ request }) => {
        const response = await request.get('/api/cars/models/77');
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('No car models found with this id')
    })
})

test.describe('Private requests', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        const responseAuth = await request.post('api/auth/signin', {
            data: {
                'email': testUser1.email,
                'password': testUser1.password,
            }
        });

        sid = responseAuth.headers()['set-cookie'].split(';')[0];

        expect(responseAuth.status()).toBe(200);
        expect(sid).toContain('sid=');
    })

    test.describe('Removing cars', () => {

        let carToRemoveId: string;

        test.beforeAll(async ({ request }) => {
            const newCar = {
                'carBrandId': 1,
                'carModelId': 1,
                'mileage': 123
            }

            const response = await request.post('/api/cars/', {
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });

            const responseJson = await response.json();
            const addedCar = responseJson.data;
            carToRemoveId = addedCar.id;

            expect(response.status()).toBe(201);
        })

        test('Remove a car', async ({ request }) => {
            const response = await request.delete(`/api/cars/${carToRemoveId}`, {
                headers: {
                    'cookie': sid
                }
            });

            expect(response.status()).toBe(200);
        })

        test('Remove a car with invalid id', async ({ request }) => {
            const response = await request.delete(`/api/cars/529532535353`, {
                headers: {
                    'cookie': sid
                }
            });
            const responseJson = await response.json();

            expect(response.status()).toBe(404);
            expect(responseJson.message).toBe('Car not found');
        })

    })


    test.describe('Adding new cars', () => {
        let addedCarsToRemove: number[] = [];

        test('Add new car - Ford Fiesta', async ({ request }) => {
            const newCar = {
                'carBrandId': 3,
                'carModelId': 11,
                'mileage': 123
            }

            const response = await request.post('/api/cars/', {
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });

            const responseJson = await response.json();
            const addedCar = responseJson.data;

            expect(response.status()).toBe(201);
            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();
            
            addedCarsToRemove.push(addedCar.id);
        })

        test('Add new car - Audi TT', async ({ request }) => {
            const newCar = {
                'carBrandId': 1,
                'carModelId': 1,
                'mileage': 123
            }

            const response = await request.post('/api/cars/', {
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });

            const responseJson = await response.json();
            const addedCar = responseJson.data;

            expect(response.status()).toBe(201);
            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();

            addedCarsToRemove.push(addedCar.id);
        })

        test.afterAll(async ({ request }) => {
            for (const id of addedCarsToRemove) {
                const response = await request.delete(`/api/cars/${id}`, {
                    headers: {
                        'cookie': sid
                    }
                });

                expect(response.status()).toBe(200);
            }
        })
    })
})


