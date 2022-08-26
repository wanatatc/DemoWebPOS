import React from "react";
import CartTable from "../modules/Cart/components/CartTable";
import { useDispatch } from "react-redux";
import * as cartRedux from "../modules/Cart/cartRedux";

function Test() {
  const dispatch = useDispatch();
  return (
    <div>
      <CartTable></CartTable>
      <div>
        <button
          onClick={() => {
            dispatch(
              cartRedux.actions.addItem({
                productId: "3",
                productName: "mango",
                price: 12,
                quantity: 1,
              })
            );
          }}
        >
          add mango
        </button>
        <button
          onClick={() => {
            dispatch(
              cartRedux.actions.removeItem("2")
            );
          }}
        >
          remove coffee
        </button>
        <button
          onClick={() => {
            dispatch(
              cartRedux.actions.updateDiscount(22)
            );
          }}
        >
          set discount = 22
        </button>
      </div>
    </div>
  );
}

export default Test;
