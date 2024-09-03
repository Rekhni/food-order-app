import { currencyFormatter } from "../util/formatting";
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}

export default function Checkout() {
    const { items, clearCart } = useContext(CartContext);
    const { progress, hideCheckout } = useContext(UserProgressContext);
    const totalPrice = items.reduce(
      (acc, item) => acc + +item.price * item.quantity,
      0
    );
    const {
      data: order,
      isLoading: isSending,
      error,
      sendRequest,
      clearData
    } = useHttp("http://localhost:3000/orders", requestConfig);

    function handleHideCheckout() {
        hideCheckout();
    }

    function handleFinish() {
        hideCheckout();
        clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
          order: {
            items: items,
            customer: customerData,
          },
        }));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleHideCheckout}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (order && !error) {
        return (
            <Modal open={progress === 'checkout'} onClose={handleFinish}>
                <h1>Success!</h1>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={progress === 'checkout'} onClose={handleHideCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error && <Error title="Failed to submit order" message={error}/>}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}



// const Checkout = forwardRef(function Checkout({ title, meals, onUpdateOrders }, ref) {
//     const dialog = useRef();

//     useImperativeHandle(ref, () => {
//         return {
//           open: () => {
//             dialog.current.showModal();
//           },
//           close: () => {
//             dialog.current.close();
//           }
//         };
//       });

//     function handleSubmit(event) {
//         event.preventDefault();
//         const fd = new FormData(event.target);
//         const data = Object.fromEntries(fd.entries());

//         const customerMeals = meals.map(meal => meal.name);

//         onUpdateOrders(data, customerMeals);

//         dialog.current.close();
//     }

//     const totalPrice = meals.reduce((acc, meal) => acc + (+meal.price * meal.quantity), 0);
//     return createPortal(
//         <dialog className="modal" ref={dialog}>
//             <form method="dialog" onSubmit={handleSubmit}>
//                 <div className="control">
//                     <h2>{title}</h2>
//                     <p>Total Amount: ${totalPrice.toFixed(2)}</p>
//                 </div>
//                 <div className="control">
//                     <label htmlFor="name">Full Name</label>
//                     <input id="name" type="text" name="name"/>
//                 </div>
//                 <div className="control">
//                     <label htmlFor="email">E-Mail Address</label>
//                     <input id="email" type="email" name="email"/>
//                 </div>
//                 <div className="control">
//                     <label htmlFor="address">Street</label>
//                     <input id="address" type="text" name="address"/>
//                 </div>
//                 <div className="control-row">
//                     <div className="control">
//                         <label htmlFor="postalCode">Postal Code</label>
//                         <input id="postalCode" type="text" name="postalCode"/>
//                     </div>
//                     <div className="control">
//                         <label htmlFor="city">City</label>
//                         <input id="city" type="text" name="city"/>
//                     </div>
//                 </div>
//                 <div className="modal-actions">
//                     <button className='text-button' onClick={() => dialog.current.close()}>Close</button>
//                     <button type="submit" className='button'>Submit Order</button>
//                 </div>
//             </form>

//         </dialog>,
//         document.getElementById("modal")
//     )
// })
