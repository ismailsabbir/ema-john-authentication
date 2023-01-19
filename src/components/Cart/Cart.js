import React from "react";
import "./Cart.css";
import Button from "react-bootstrap/Button";
const Cart = (props) => {
  const { cart, clearCart, children } = props;

  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }
  const tax = parseFloat((total * 0.1).toFixed(2));
  const grandTotal = total + shipping + tax;
  return (
    <div className="cart">
      <h4>Order Summary</h4>

      <p>Selected Items: {quantity}</p>
      <p>Total price: ${total}</p>
      <p>Total Shipping: ${shipping}</p>
      <p>Tax: {tax}</p>
      <h6>Grand Total:$ {grandTotal.toFixed(2)}</h6>
      <Button className="clear-btn" variant="warning" onClick={clearCart}>
        Clear Cart
      </Button>
      {children}
    </div>
  );
};

export default Cart;
