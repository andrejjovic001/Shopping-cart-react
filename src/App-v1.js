import { prettyDOM } from "@testing-library/react";
import { useState, useEffect } from "react";

const products = [
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

export default function App() {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productsCopy, setProductCopy] = useState(products);

  useEffect(() => {
    console.log(productsCopy);
  }, [productsCopy]);

  function handleAddToCart(product) {
    setProductCopy((productsCopy) =>
      productsCopy.map((p) =>
        p.id === product.id ? { ...p, added: p.added + 1 } : p
      )
    );

    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === product.id)) {
        // Proizvod već postoji u korpi, nemoj ga dodavati ponovo
        return prevCart;
      } else {
        // Dodaj novi proizvod u korpu
        return [...prevCart, product];
      }
    });
  }

  function handleToggleCart() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleRemoveItem(added, id) {
    setCart((c) => c.filter((c) => c.added !== added));

    setProductCopy((productsCopy) =>
      productsCopy.map((p) =>
        p.id === id && p.added === added ? { ...p, added: p.added - 1 } : p
      )
    );
  }

  return (
    <div className="shopping-cart">
      <h1>{!isOpen ? "-Andrej's Shop-" : "-Your Cart-"}</h1>

      <button onClick={handleToggleCart} className="cart-btn">
        {!isOpen ? "Cart 🛒" : "Shop 🛒"}
      </button>
      {!isOpen ? (
        <ShoppingCart
          product={productsCopy}
          onAddToCart={handleAddToCart}
          onToggleCart={handleToggleCart}
        />
      ) : cart.length > 0 ? (
        <Cart cart={cart} onRemove={handleRemoveItem} />
      ) : (
        <p>No items in the cart!</p>
      )}
    </div>
  );
}

function ShoppingCart({ onAddToCart, product }) {
  return (
    <>
      <ul>
        {product.map((product) => (
          <ShopItems
            onAddToCart={onAddToCart}
            product={product}
            key={product.id}
          />
        ))}
      </ul>
    </>
  );
}

function ShopItems({ product, onAddToCart }) {
  return (
    <li>
      <div>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <h4>${product.price}</h4>
        <button onClick={() => onAddToCart(product)}>
          Add to cart {product.added > 0 ? product.added : ""}
        </button>
      </div>
    </li>
  );
}

function Cart({ cart, onRemove }) {
  // const uniqueProducts = Array.from(new Set(cart.map((item) => item.id)));
  // console.log(cart);
  const totalprice = cart.reduce((acc, c) => acc + c.price, 0);

  return (
    <>
      <div>
        <ul className="cart">
          {cart.map((cart) => (
            <CartItem cart={cart} onRemove={onRemove} />
          ))}

          {/* {uniqueProducts.map((productId) => {
            // Pronađite prvi proizvod s istim ID-om u nizu
            const product = cart.find((item) => item.id === productId);

            return <CartItem key={productId} cart={product} />;
          })} */}
        </ul>

        <p>Total price: {totalprice}$</p>
      </div>
    </>
  );
}

function CartItem({ cart, onRemove }) {
  console.log(cart);
  return (
    <li className="cart-item">
      <div className="image">
        <img src={cart.image} alt={cart.name} />
      </div>

      <div>
        <h3>Item: {cart.name}</h3>
        <h4>Price: {cart.price}$</h4>

        {/* <div>
          <button>-</button>
          <input value={cart.added + 1} type="text" readOnly />
          <button>+</button>
        </div> */}

        <div>
          <button onClick={() => onRemove(cart.added, cart.id)}>Remove</button>
          <p>{cart.added}</p>
        </div>
      </div>
    </li>
  );
}
