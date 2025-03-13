type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
};

export class ExampleService {
  static async getTodos(): Promise<TodoItem[]> {
    return [
      {
        id: 1,
        title: 'Do the dishes',
        completed: false,
      },
      {
        id: 2,
        title: 'Buy groceries',
        completed: true,
      },
      {
        id: 3,
        title: 'Finish the project',
        completed: false,
      },
    ];
  }

  static async getTodo(id: number): Promise<TodoItem> {
    return {
      id,
      title: 'Do the dishes',
      completed: false,
    };
  }

  static async updateTodo(item: TodoItem) {
    return {
      id: item.id,
      title: item.title,
      completed: item.completed,
    };
  }
}
