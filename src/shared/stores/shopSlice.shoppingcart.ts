import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* ==== Types ==== */
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShopState {
  products: Product[];
  cart: CartItem[];
}

/* ==== Mock data & initial state ==== */
export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Trà gừng', price: 35000, stock: 8 },
  { id: 2, name: 'Mật ong rừng', price: 120000, stock: 5 },
  { id: 3, name: 'Tinh dầu sả', price: 89000, stock: 3 },
  { id: 4, name: 'Ngải cứu khô', price: 45000, stock: 10 },
];

var initialState: ShopState = {
  products: INITIAL_PRODUCTS,
  cart: [],
};

/* ==== Reducer functions (function declaration, không arrow) ==== */
function addToCartReducer(state: ShopState, action: PayloadAction<number>): void {
  var id = action.payload;

  var product = state.products.find(function (p) {
    return p.id === id;
  });
  if (!product) return;

  var idx = state.cart.findIndex(function (c) {
    return c.id === id;
  });

  if (idx !== -1) {
    var item = state.cart[idx];
    if (!item) return;
    if (item.quantity < item.stock) {
      item.quantity += 1;
    }
  } else {
    if (product.stock > 0) {
      state.cart.push(Object.assign({}, product, { quantity: 1 }));
    }
  }
}

function removeFromCartReducer(state: ShopState, action: PayloadAction<number>): void {
  var id = action.payload;
  state.cart = state.cart.filter(function (c) {
    return c.id !== id;
  });
}

function updateQuantityReducer(state: ShopState, action: PayloadAction<{ id: number; quantity: number }>): void {
  var id = action.payload.id;
  var next = action.payload.quantity;

  var i = state.cart.findIndex(function (c) {
    return c.id === id;
  });
  if (i === -1) return;

  var item = state.cart[i];
  if (!item) return;
  var clamped = Math.max(0, Math.min(next, item.stock));

  if (clamped === 0) {
    state.cart.splice(i, 1);
  } else {
    item.quantity = clamped;
  }
}

var shopSlice = createSlice({
  name: 'shop',
  initialState: initialState,
  reducers: {
    addToCart: addToCartReducer,
    removeFromCart: removeFromCartReducer,
    updateQuantity: updateQuantityReducer,
  },
});

export var shopReducer = shopSlice.reducer;
export var addToCart = shopSlice.actions.addToCart;
export var removeFromCart = shopSlice.actions.removeFromCart;
export var updateQuantity = shopSlice.actions.updateQuantity;
