import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import MealItem from './components/MealItem.jsx';
import { useEffect, useState } from "react";
import { fetchAllMeals } from "./http.js";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header/>   
        <Meals /> 
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>

  )
}

// function App() {
//   const [meals, setMeals] = useState([]);
//   const [addedMeals, setAddedMeals] = useState([]);
//   const [orders, setOrders] = useState([]);

//   console.log(orders);
  
//   useEffect(() => {
//       async function getAllMeals() {
//           try {
//               const fetchedMeals = await fetchAllMeals();
//               setMeals(fetchedMeals);
//           } catch (error) {
//               throw new Error('Failed to fetch meals');
//           }
//       }

//       getAllMeals();
//   }, [])

//   function handleAddToCart(id) {
//     const updatedAddedMeals = [...addedMeals];

//     const existingMealItemIndex = updatedAddedMeals.findIndex((meal) => meal.id === id);
//     const existingMealItem = updatedAddedMeals[existingMealItemIndex];

//     if (existingMealItem) {
//       const updatedMealItem = {
//         ...existingMealItem,
//         quantity: existingMealItem.quantity + 1
//       }
//       updatedAddedMeals[existingMealItemIndex] = updatedMealItem;
//     } else {
//       const newMeal = meals.find(meal => meal.id === id);
//       updatedAddedMeals.push({
//         id: id,
//         name: newMeal.name,
//         price: newMeal.price,
//         description: newMeal.description,
//         quantity: 1
//       })
//     }
//     return setAddedMeals([...updatedAddedMeals]);
//   }

//   function handleUpdateCartItemQuantity(mealId, amount) {
//     const updatedAddedMeals = [...addedMeals];
//     const updatedAddedMealIndex = updatedAddedMeals.findIndex(meal => meal.id === mealId);

//     const updatedAddedMeal = {
//       ...updatedAddedMeals[updatedAddedMealIndex]
//     };

//     updatedAddedMeal.quantity += amount;

//     if (updatedAddedMeal.quantity <= 0) {
//       updatedAddedMeals.splice(updatedAddedMealIndex, 1);
//     } else {
//       updatedAddedMeals[updatedAddedMealIndex] = updatedAddedMeal;
//     }

//     return setAddedMeals([...updatedAddedMeals]);
//   }

//   function handleUpdateOrders(newCustomer, meals) {
//     const newOrder = {
//       customer: newCustomer,
//       meals: meals
//     }
//     setOrders((prevOrders) => [...prevOrders, newOrder])
//   }

//   return (
//     <>
//       <Header
//         addedMeals={addedMeals}
//         onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
//         onUpdateOrders={handleUpdateOrders}
//       />
//       <main>
//         <Meals>
//           {meals.map((meal) => (
//             <MealItem
//               key={meal.id}
//               id={meal.id}
//               image={meal.image}
//               name={meal.name}
//               price={meal.price}
//               description={meal.description}
//               onAddtoCart={handleAddToCart}
//             />
//           ))}
//         </Meals>
//       </main>
//     </>
//   );
// }

export default App;
