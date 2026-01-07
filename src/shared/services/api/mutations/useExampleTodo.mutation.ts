import { generateUseMutationHook } from 'src/shared/utils/reactQuery';
import { ExampleService } from '../auth.service';

export const useExampleTodoMutation = generateUseMutationHook(ExampleService.updateTodo);
