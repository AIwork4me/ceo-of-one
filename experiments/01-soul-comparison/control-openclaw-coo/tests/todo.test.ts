import request from 'supertest';
import app from '../src/index';
import { todoStore } from '../src/store/todoStore';

describe('Todo API', () => {
  beforeEach(() => {
    todoStore.clear();
  });

  describe('GET /api/todos', () => {
    it('should return an empty array when no todos exist', async () => {
      const res = await request(app).get('/api/todos');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return all todos', async () => {
      const createRes1 = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo 1' });
      const createRes2 = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo 2' });

      const res = await request(app).get('/api/todos');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it('should not return soft-deleted todos', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo to delete' });

      await request(app).delete(`/api/todos/${createRes.body.id}`);

      const res = await request(app).get('/api/todos');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return a todo by id', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo' });

      const res = await request(app).get(`/api/todos/${createRes.body.id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Todo');
      expect(res.body.id).toBe(createRes.body.id);
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app).get('/api/todos/non-existent-id');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Todo not found');
    });

    it('should return 404 for soft-deleted todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo to delete' });

      await request(app).delete(`/api/todos/${createRes.body.id}`);

      const res = await request(app).get(`/api/todos/${createRes.body.id}`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'New Todo' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('New Todo');
      expect(res.body.completed).toBe(false);
      expect(res.body.id).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.updatedAt).toBeDefined();
    });

    it('should trim whitespace from title', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: '  Trimmed Todo  ' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Trimmed Todo');
    });

    it('should return 400 when title is missing', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Title is required and must be a non-empty string');
    });

    it('should return 400 when title is empty', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: '' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Title is required and must be a non-empty string');
    });

    it('should return 400 when title is only whitespace', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: '   ' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Title is required and must be a non-empty string');
    });

    it('should return 400 when title is not a string', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 123 });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Title is required and must be a non-empty string');
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update todo title', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Original Title' });

      const res = await request(app)
        .put(`/api/todos/${createRes.body.id}`)
        .send({ title: 'Updated Title' });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });

    it('should update todo completed status', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo' });

      const res = await request(app)
        .put(`/api/todos/${createRes.body.id}`)
        .send({ completed: true });

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });

    it('should update both title and completed', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Original' });

      const res = await request(app)
        .put(`/api/todos/${createRes.body.id}`)
        .send({ title: 'Updated', completed: true });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated');
      expect(res.body.completed).toBe(true);
    });

    it('should update updatedAt timestamp', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo' });

      const originalUpdatedAt = createRes.body.updatedAt;

      await new Promise(resolve => setTimeout(resolve, 10));

      const res = await request(app)
        .put(`/api/todos/${createRes.body.id}`)
        .send({ completed: true });

      expect(res.status).toBe(200);
      expect(new Date(res.body.updatedAt).getTime()).toBeGreaterThan(
        new Date(originalUpdatedAt).getTime()
      );
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app)
        .put('/api/todos/non-existent-id')
        .send({ title: 'Updated' });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Todo not found');
    });

    it('should return 404 for soft-deleted todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo to delete' });

      await request(app).delete(`/api/todos/${createRes.body.id}`);

      const res = await request(app)
        .put(`/api/todos/${createRes.body.id}`)
        .send({ title: 'Updated' });

      expect(res.status).toBe(404);
    });

    it('should return 400 when title is empty string', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo' });

      const res = await request(app)
        .put(`/api/todos/${createRes.body.id}`)
        .send({ title: '' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Title must be a non-empty string');
    });

    it('should return 400 when completed is not a boolean', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo' });

      const res = await request(app)
        .put(`/api/todos/${createRes.body.id}`)
        .send({ completed: 'yes' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Completed must be a boolean');
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should soft delete a todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo to delete' });

      const res = await request(app).delete(`/api/todos/${createRes.body.id}`);
      expect(res.status).toBe(204);

      const getRes = await request(app).get(`/api/todos/${createRes.body.id}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app).delete('/api/todos/non-existent-id');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Todo not found');
    });

    it('should return 404 for already deleted todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Todo to delete' });

      await request(app).delete(`/api/todos/${createRes.body.id}`);

      const res = await request(app).delete(`/api/todos/${createRes.body.id}`);
      expect(res.status).toBe(404);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/unknown-route');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Route not found');
    });
  });
});
