import { useContext } from "react";
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button";
import Modal from "./UI/Modal.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const totalPrice = items.reduce((acc, item) => acc + (+item.price * item.quantity), 0);

  function handleHideCart() {
    hideCart();
  }

  function handleShowCheckout() {
    showCheckout();
  }

  return (
    <Modal className="cart" open={progress === "cart"}  onClose={progress === "cart" ? handleHideCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {items.length === 0 && <p>There is no item yet!</p>}
        {items.length > 0 && items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        {items.length > 0 && <Button onClick={handleShowCheckout}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}

// export default function Cart({ title, meals, onUpdateCartItemQuantity }) {
//     const totalPrice = meals.reduce((acc, meal) => acc + (+meal.price * meal.quantity), 0);
//     return (
//         <section className="cart">
//             <h2>{title}</h2>
//             <ul>
//                 {meals.map((meal) => (
//                     <li key={meal.id} className="cart-item">
//                         <p>{meal.name} - {meal.quantity} x ${meal.price}</p>
//                         <div className="cart-item-actions">
//                             <button onClick={() => onUpdateCartItemQuantity(meal.id, -1)}>-</button>
//                             <p>{meal.quantity}</p>
//                             <button onClick={() => onUpdateCartItemQuantity(meal.id, 1)}>+</button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//             <div className="cart-total">${+totalPrice.toFixed(2)}</div>
//         </section>
//     )
// }
