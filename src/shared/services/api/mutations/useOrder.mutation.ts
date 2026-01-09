import { generateUseMutationHook } from 'src/shared/utils/reactQuery';
import { OrderService } from '../services/order.services';

export const useCreateOrderMutation = generateUseMutationHook(OrderService.createOrder, 'create-order');
