import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import { useRef, useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Checkout from './Checkout';

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const totalQuantity = items.reduce((acc, item) => acc +  item.quantity, 0);

  function handleShowCart() {
    showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>Reactfood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart({totalQuantity})</Button>
      </nav>
    </header>
  )
}

// export default function Header({ addedMeals, onUpdateCartItemQuantity, onUpdateOrders }) {
//     const modal = useRef();
//     const checkoutModal = useRef();
//     const cartQuantity = addedMeals.reduce((acc, meal) => acc + meal.quantity, 0);
    


//     function handleOpenCartClick() {
//         modal.current.open();
//     }

//     function handleOpenCheckout() {
//         checkoutModal.current.open();
//     }

//     let modalActions = <button className='text-button'>Close</button>;


//     if (cartQuantity > 0) {
//       modalActions = (
//         <div>
//           <button className='text-button'>Close</button>
//           <button className='button' onClick={handleOpenCheckout}>Go to Checkout</button>
//         </div>
//       );
//     }

//     return (
//       <>
//         <CartModal
//           ref={modal}
//           title="Your Cart"
//           actions={modalActions}
//           addedMeals={addedMeals}
//           onUpdateCartItemQuantity={onUpdateCartItemQuantity}
//         />
//         <Checkout ref={checkoutModal} title="Checkout" meals={addedMeals} onUpdateOrders={onUpdateOrders}/>
//         <header id="main-header">
//           <div id="title">
//             <img src={logo} alt="logo" />
//             <h1>Reactfood</h1>
//           </div>
//           <nav>
//             <button className="text-button" onClick={handleOpenCartClick}>
//               Cart({cartQuantity})
//             </button>
//           </nav>
//         </header>
//       </>
//     );
// }