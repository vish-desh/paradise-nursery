import React from "react";
import { Link } from "react-router-dom";

function ShoppingCart({ plants, cart, updateQuantity, removeFromCart, totalItems, totalCost }) {
  const cartPlants = Object.keys(cart)
    .map(id => plants.find(p => p.id === parseInt(id)))
    .filter(Boolean);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartPlants.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartPlants.map(plant => (
            <div key={plant.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", display: "flex", alignItems: "center" }}>
              <img src={plant.image} alt={plant.name} style={{ width: "100px" }} />
              <div style={{ marginLeft: "10px" }}>
                <h3>{plant.name}</h3>
                <p>Unit Price: ${plant.price}</p>
                <button onClick={() => updateQuantity(plant.id, -1)}>-</button>
                <span> {cart[plant.id]} </span>
                <button onClick={() => updateQuantity(plant.id, 1)}>+</button>
                <p>Subtotal: ${plant.price * cart[plant.id]}</p>
                <button onClick={() => removeFromCart(plant.id)}>Delete</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            <p>Total Items: {totalItems}</p>
            <p>Total Cost: ${totalCost.toFixed(2)}</p>
            <button>Checkout</button>
          </div>
        </>
      )}
      <Link to="/">← Back to Shop</Link>
    </div>
  );
}

export default ShoppingCart;
