import { describe, expect, it } from 'vitest';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  describe('getTodos', () => {
    it('should return a list of todos', async () => {
      const todos = await ExampleService.getTodos();

      expect(todos).toBeInstanceOf(Array);
      expect(todos.length).toBe(3);
      expect(todos[0]).toHaveProperty('id');
      expect(todos[0]).toHaveProperty('title');
      expect(todos[0]).toHaveProperty('completed');
    });
  });

  describe('getTodo', () => {
    it('should return a todo by id', async () => {
      const todo = await ExampleService.getTodo(1);

      expect(todo).toHaveProperty('id', 1);
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('completed');
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const todoToUpdate = {
        id: 1,
        title: 'Updated title',
        completed: true,
      };

      const updatedTodo = await ExampleService.updateTodo(todoToUpdate);

      expect(updatedTodo).toEqual(todoToUpdate);
    });
  });
});
