const request = require('supertest');
const app = require('../app');

    // ทดสอบ GET /products
    describe('GET /products', () => {
        it('should return all products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2); // Assuming there are 2 initial products
        expect(res.body[0].name).toBe('Laptop');
        });
    });


  // ทดสอบ GET /products/:id
  describe('GET /products/:id', () => {
    it('should return a product by ID', async () => {
      const res = await request(app).get('/products/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Laptop');
    });
  
    it('should return 404 if product not found', async () => {
      const res = await request(app).get('/products/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Product not found');
    });
  });

  // ทดสอบ POST /products
  describe('POST /products', () => {
    it('should add a new product', async () => {
      const newProduct = { name: 'Tablet', price: 400, stock: 15 };
      const res = await request(app)
        .post('/products')
        .send(newProduct);
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Tablet');
      expect(res.body.id).toBe(3); // Assuming this is the 3rd product
    });
  });
  
  // ทดสอบ PUT /products/:id
  describe('PUT /products/:id', () => {
    it('should update an existing product', async () => {
      const updatedProduct = { name: 'Gaming Laptop', price: 1200, stock: 4 };
      const res = await request(app)
        .put('/products/1')
        .send(updatedProduct);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Gaming Laptop');
      expect(res.body.price).toBe(1200);
    });
  
    it('should return 404 if product not found', async () => {
      const res = await request(app)
        .put('/products/999')
        .send({ name: 'Non-existent product' });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Product not found');
    });
  });

  // ทดสอบ DELETE /products/:id
  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const res = await request(app).delete('/products/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Product deleted');
    });
  
    it('should return 404 if product not found', async () => {
      const res = await request(app).delete('/products/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Product not found');
    });
  });
  
  