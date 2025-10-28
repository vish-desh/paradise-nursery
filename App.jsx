import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";

function App() {
  // Example plant data
  const [plants] = useState([
    { id: 1, name: "Aloe Vera", price: 10, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Snake Plant", price: 15, image: "https://via.placeholder.com/100" },
    { id: 3, name: "Peace Lily", price: 20, image: "https://via.placeholder.com/100" },
  ]);

  // Cart data
  const [cart, setCart] = useState({});

  // Add or update quantity
  const updateQuantity = (id, change) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + change;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  // Totals
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCost = Object.entries(cart).reduce(
    (sum, [id, qty]) => sum + plants.find(p => p.id === parseInt(id)).price * qty,
    0
  );

  return (
    <Router>
      <div style={{ padding: "10px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0f0f0", padding: "10px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>🌿 Paradise Nursery</h1>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span>Cart ({totalItems}) 🛒</span>
          </Link>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Available Plants</h2>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {plants.map(plant => (
                    <div key={plant.id} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                      <img src={plant.image} alt={plant.name} style={{ width: "100px" }} />
                      <h3>{plant.name}</h3>
                      <p>${plant.price}</p>
                      <button onClick={() => updateQuantity(plant.id, 1)}>Add to Cart</button>
                    </div>
                  ))}
                </div>
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <ShoppingCart
                plants={plants}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                totalItems={totalItems}
                totalCost={totalCost}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
