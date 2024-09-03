import { currencyFormatter } from "../util/formatting.js"
import Button from "./UI/Button.jsx"
import CartContext from "../store/CartContext.jsx"
import { useContext } from "react"

export default function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    return <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className=" meal-item-actions">
               <Button onClick={handleAddMealToCart}>Add to Cart</Button>
            </p>
        </article>
    </li>
}

// export default function MealItem({ id, name, price, description, image, onAddtoCart }) {
//     return (
//         <div className="meal-item">
//                 <img src={`http://localhost:3000/${image}`} alt={name} />
//                 <h3>{name}</h3>
//                 <p className="meal-item-price">${price}</p>
//                 <p className="meal-item-description">{description}</p>
//                 <button className="button meal-item-actions" onClick={() => onAddtoCart(id)}>Add to Cart</button>
//         </div>
//     )
// }