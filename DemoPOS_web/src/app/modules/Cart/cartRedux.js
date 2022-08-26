import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  RESET: "[CART_RESET] Action",
  ADD_ITEM: "[CART_ADD_ITEM] Action",
  REMOVE_ITEM: "[CART_REMOVE_ITEM] Action",
  RECALCULATE: "[CART_RECALCULATE_CART] Action",
  UPDATE_DISCOUNT: "[CART_UPDATE_DISCOUNT_CART] Action",
  OPEN_PRODUCT: "[CART_OPEN_PRODUCT] Action",
  CLOSE_PRODUCT: "[CART_CLOSE_PRODUCT] Action",
  ADD_PRODUCT_QUANTITY: "[CART_ADD_PRODUCT_QUANTITY] Action",
  REMOVE_PRODUCT_QUANTITY: "[CART_REMOVE_PRODUCT_QUANTITY] Action",
};

const initialState = {
  items: [
    {
      productId: "1",
      productName: "cola",
      price: 10,
      quantity: 1,
      amount: 10,
    },
    {
      productId: "2",
      productName: "coffee",
      price: 15,
      quantity: 2,
      amount: 30,
    },
  ],
  subTotal: 0,
  count: 0,
  discount: 0,
  total: 0,
  addProductOpen: false,
  selectedProduct: '',
  currentQuantity: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET: {
      return initialState;
    }

    case actionTypes.ADD_ITEM: {
      //find exsist product by id
      let cartToUpdate = [...state.items];
      let productToAdd = cartToUpdate.find((obj) => {
        return obj.productId === action.payload.productId;
      });
      if (productToAdd) {
        //update quantity
        productToAdd.quantity += action.payload.quantity;
        productToAdd.amount = productToAdd.quantity * productToAdd.price;
      } else {
        //add
        productToAdd = { ...action.payload };
        productToAdd.amount = productToAdd.quantity * productToAdd.price;
        cartToUpdate.push(productToAdd);
      }

      return {
        ...state,
        items: cartToUpdate,
      };
    }

    case actionTypes.REMOVE_ITEM: {
      //find exsist product by id
      let cartToUpdate = [...state.items];
      cartToUpdate = cartToUpdate.filter((obj) => {
        //takes only id not match
        return obj.productId !== action.payload;
      });
      return {
        ...state,
        items: cartToUpdate,
      };
    }

    case actionTypes.UPDATE_DISCOUNT: {
      return {
        ...state,discount: action.payload
      };
    }

    case actionTypes.RECALCULATE: {
      let count = [...state.items].reduce((a,b) => +a + b.quantity,0);
      let subTotal = [...state.items].reduce((a,b) => +a+b.amount,0);
      let total = subTotal - {...state}.discount
      return {
        ...state,subTotal: subTotal, count: count, total: total
      };
    }

    case actionTypes.OPEN_PRODUCT: {
      return {
        ...state,
        addProductOpen: true,
        selectedProduct: action.payload,
        currentQuantity: 1,
      }
    }

    case actionTypes.CLOSE_PRODUCT: {
      return {
        ...state,
        addProductOpen: false,
        selectedProduct: '',
        currentQuantity: 1,
      }
    }
    
    case actionTypes.ADD_PRODUCT_QUANTITY: {
      return {
        ...state,
        currentQuantity: state.currentQuantity +1,
      }
    }

    case actionTypes.REMOVE_PRODUCT_QUANTITY: {
      if(state.currentQuantity > 0) 
        return {
          ...state,
          currentQuantity: state.currentQuantity -1,
        }
    }
    /* falls through */

    default:
      return state;
  }
};

export const actions = {
  reset: () => ({ type: actionTypes.RESET }),
  addItem: (payload) => ({ type: actionTypes.ADD_ITEM, payload }),
  removeItem: (payload) => ({ type: actionTypes.REMOVE_ITEM, payload }),
  updateDiscount: (payload) => ({ type: actionTypes.UPDATE_DISCOUNT, payload }),
  reCalculate: () => ({ type: actionTypes.RECALCULATE }),
  openProduct: (payload) => ({type : actionTypes.OPEN_PRODUCT, payload}),
  closeProduct: () => ({type: actionTypes.CLOSE_PRODUCT}),
  addProductQuantity: () => ({type: actionTypes.ADD_PRODUCT_QUANTITY}),
  removeProductQuantity: () => ({type: actionTypes.REMOVE_PRODUCT_QUANTITY}),
};

export function* saga() {
  yield takeLatest(actionTypes.ADD_ITEM, function* reCalculate() {
    yield put(actions.reCalculate());
    yield put(actions.closeProduct());
  });

  yield takeLatest(actionTypes.REMOVE_ITEM, function* reCalculate() {
    yield put(actions.reCalculate());
  });

  yield takeLatest(actionTypes.UPDATE_DISCOUNT, function* reCalculate() {
    yield put(actions.reCalculate());
  });
}
