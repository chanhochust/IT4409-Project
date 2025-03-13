import { generateUseQueryHook } from 'src/shared/utils/reactQuery';
import { ExampleService } from '../example.service';

/** Utilize the generateUseQueryHook to create a query quickly while keeping the type safety */
export const useExampleTodosQuery = generateUseQueryHook(ExampleService.getTodos, 'example-todos');
export const useExampleTodoQuery = generateUseQueryHook(ExampleService.getTodo, 'example-todo');
