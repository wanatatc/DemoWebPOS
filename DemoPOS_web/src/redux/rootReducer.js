import { combineReducers } from "redux";
 import {all} from "redux-saga/effects";

import * as auth from "../app/modules/_auth/_redux/authRedux";
import * as layout from "../app/layout/_redux/layoutRedux";
import * as demo from "../app/modules/_demo/_redux/demoRedux";
import * as title from "../app/modules/Title/titleRedux";
import * as employee from '../app/modules/Employee/employeeRedux';
import * as productGroup from '../app/modules/ProductGroup/productGroupRedux';
import * as product from '../app/modules/Product/productRedux'
import * as cart from '../app/modules/Cart/cartRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  layout: layout.reducer,
  demo: demo.reducer,
  title: title.reducer,
  employee: employee.reducer,
  productGroup: productGroup.reducer,
  product: product.reducer,
  cart: cart.reducer
});

export function* rootSaga() {
   yield all([cart.saga()]);
}
