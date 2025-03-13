import { generateUseMutationHook } from 'src/shared/utils/reactQuery';
import { ExampleService } from '../example.service';

export const useExampleTodoMutation = generateUseMutationHook(ExampleService.updateTodo);
