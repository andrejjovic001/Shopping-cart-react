import { prettyDOM } from "@testing-library/react";
import { useState, useEffect } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Iphone 15",
    price: 1400,
    image: "images/iphone15.jpg",
    added: 0,
  },

  {
    id: 2,
    name: "Earphones",
    price: 72,
    image: "images/earphones.jpg",
    added: 0,
  },

  {
    id: 3,
    name: "Jacket",
    price: 45,
    image: "images/jacket.webp",
    added: 0,
  },

  {
    id: 4,
    name: "Camera",
    price: 960,
    image: "images/camera.png",
    added: 0,
  },

  {
    id: 5,
    name: "Laptop",
    price: 1200,
    image: "images/laptop.png",
    added: 0,
  },

  {
    id: 6,
    name: "Sneakers",
    price: 130,
    image: "images/sneakers.png",
    added: 0,
  },

  {
    id: 7,
    name: "Wallet",
    price: 250,
    image: "images/wallet.jpg",
    added: 0,
  },

  {
    id: 8,
    name: "Suitcase",
    price: 80,
    image: "images/suitcase.webp",
    added: 0,
  },
];

// {
//   1: 0,
//   2: 4,
//   3: 0,
//   4: 1
// }

function getDefaultCart() {
  const cart = {};

  PRODUCTS.forEach((product) => (cart[product.id] = 0));

  return cart;
}

export default function App() {
  const [cart, setCart] = useState(getDefaultCart());
  const [isOpen, setIsOpen] = useState(false);

  function getTotalAmount() {
    let totalAmount = 0;

    for (let c in cart) {
      if (cart[c] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(c));
        totalAmount += cart[c] * itemInfo.price;
      }
    }

    return totalAmount;
  }

  function handleAddToCart(itemId) {
    setCart((prevCart) => ({ ...prevCart, [itemId]: prevCart[itemId] + 1 }));
  }

  function handleToggleCart() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleRemoveItem(itemId) {
    setCart((prevCart) => ({ ...prevCart, [itemId]: prevCart[itemId] - 1 }));
  }

  return (
    <div className="shopping-cart">
      <h1>{!isOpen ? "-Andrej's Shop-" : "-Your Cart-"}</h1>

      <button onClick={handleToggleCart} className="cart-btn">
        {!isOpen ? "Cart 🛒" : "Shop 🛒"}
      </button>

      {!isOpen ? (
        <ShoppingCart
          product={PRODUCTS}
          cart={cart}
          onAddToCart={handleAddToCart}
          onToggleCart={handleToggleCart}
        />
      ) : (
        <Cart
          product={PRODUCTS}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveItem={handleRemoveItem}
          getTotalAmount={getTotalAmount}
        />
      )}
    </div>
  );
}

function ShoppingCart({ onAddToCart, product, cart }) {
  return (
    <>
      <ul>
        {product.map((product) => (
          <ShopItems
            onAddToCart={onAddToCart}
            product={product}
            cart={cart}
            key={product.id}
          />
        ))}
      </ul>
    </>
  );
}

function ShopItems({ product, onAddToCart, cart }) {
  const cartNum = cart[product.id];

  return (
    <li>
      <div>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <h4>${product.price}</h4>
        <button onClick={() => onAddToCart(product.id)}>
          Add to cart {cartNum > 0 ? <>({cartNum})</> : ""}
        </button>
      </div>
    </li>
  );
}

function Cart({ product, cart, onAddToCart, onRemoveItem, getTotalAmount }) {
  const totalAmount = getTotalAmount();

  return (
    <>
      {totalAmount > 0 ? (
        <div>
          <ul className="cart">
            {product.map((prod) => {
              if (cart[prod.id] !== 0) {
                return (
                  <CartItem
                    product={prod}
                    key={prod.id}
                    cart={cart}
                    onAddToCart={onAddToCart}
                    onRemoveItem={onRemoveItem}
                  />
                );
              }
            })}
          </ul>

          <h2>Total price: {totalAmount}$</h2>
        </div>
      ) : (
        <p>No item in the cart!</p>
      )}
    </>
  );
}

function CartItem({ product, cart, onAddToCart, onRemoveItem }) {
  const itemValue = cart[product.id];

  return (
    <li className="product-item">
      <div className="image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="item-inf">
        <h3>{product.name}</h3>
        <h4>Price: {product.price}$</h4>

        <div className="num-of-item">
          <button onClick={() => onRemoveItem(product.id)}>-</button>
          <input value={itemValue} type="text" readOnly />
          <button onClick={() => onAddToCart(product.id)}>+</button>
        </div>
      </div>
    </li>
  );
}
