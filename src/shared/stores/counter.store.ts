import { proxy } from 'valtio';

export class CounterState {
  count = 0;

  decrement() {
    this.count--;
  }

  increment() {
    this.count++;
  }
}

export const counterStore = proxy(new CounterState());
