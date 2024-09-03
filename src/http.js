
export async function fetchAllMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const meals = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch meals');
    }

    return meals;
}

export async function updateOrders(places) {
    const response = await fetch('http://localhost:3000/orders', {
        method: 'PUT',
        body: JSON.stringify({ orders: places }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update order list.');
    }

    return resData.message;
}