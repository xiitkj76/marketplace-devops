import React, { useState, useEffect, useCallback } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const Cart = ({ isCheckout, setIsCheckout }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${API_URL}/cart`);
        if (!response.ok) throw new Error("Failed to fetch cart data");
        const data = await response.json();
        const groupedData = groupProductsByStore(data.hasil);
        setCart(groupedData);

        // Update selectAll based on initial data
        const allChecked = data.hasil.every((item) => item.checked);
        setSelectAll(allChecked);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, []);

  // Group products by store_id
  const groupProductsByStore = (items) => {
    const stores = {};
    items.forEach((item) => {
      if (!stores[item.store_id]) {
        stores[item.store_id] = {
          store_id: item.store_id,
          store_name: item.store_name,
          store_avatar: item.store_avatar,
          items: [],
        };
      }
      stores[item.store_id].items.push(item);
    });
    return Object.values(stores); // Return grouped data as an array
  };

  // Format price
  const formatPrice = (price) =>
    price.toLocaleString("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
    });

  // Update total price
  const updateTotalPrice = useCallback(() => {
    const total = cart.reduce((acc, store) => {
      return (
        acc +
        store.items.reduce((subAcc, item) => {
          if (item.checked) {
            const discountedPrice =
              item.price - (item.price * item.discount_percent) / 100;
            return subAcc + discountedPrice * item.quantity;
          }
          return subAcc;
        }, 0)
      );
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  useEffect(() => {
    updateTotalPrice();
  }, [cart, updateTotalPrice]);

  // Update selectAll state
  const updateSelectAll = useCallback(() => {
    const allChecked = cart.every((store) =>
      store.items.every((item) => item.checked)
    );
    setSelectAll(allChecked);
  }, [cart]);

  // Handle checkbox for all items in cart
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    const updatedCart = cart.map((store) => ({
      ...store,
      items: store.items.map((item) => ({ ...item, checked })),
    }));
    setCart(updatedCart);

    updatedCart.forEach((store) =>
      store.items.forEach((item) => {
        fetch(`${API_URL}/cart/${item.cart_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checked }),
        }).catch((error) =>
          console.error("Failed to update item state:", error)
        );
      })
    );
  };

  // Handle store-level checkbox
  const handleStoreCheckbox = (storeId, checked) => {
    const updatedCart = cart.map((store) => {
      if (store.store_id === storeId) {
        store.items.forEach((item) => (item.checked = checked));
      }
      return store;
    });
    setCart(updatedCart);

    const storeItems = updatedCart.find(
      (store) => store.store_id === storeId
    ).items;
    storeItems.forEach((item) => {
      fetch(`${API_URL}/cart/${item.cart_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked }),
      }).catch((error) =>
        console.error("Failed to update store checkbox state:", error)
      );
    });

    // Update selectAll state
    updateSelectAll();
  };

  // Handle individual item checkbox
  const handleItemCheckbox = (itemId, checked) => {
    const updatedCart = cart.map((store) => {
      store.items.forEach((item) => {
        if (item.cart_id === itemId) {
          item.checked = checked;
        }
      });
      return store;
    });
    setCart(updatedCart);

    fetch(`${API_URL}/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    }).catch((error) =>
      console.error("Failed to update item checkbox state:", error)
    );

    // Update selectAll state
    updateSelectAll();
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, increment) => {
    const updatedCart = cart.map((store) => {
      store.items.forEach((item) => {
        if (item.cart_id === itemId) {
          item.quantity = increment
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
        }
      });
      return store;
    });
    setCart(updatedCart);

    const item = cart
      .flatMap((store) => store.items)
      .find((i) => i.cart_id === itemId);
    fetch(`${API_URL}/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: item.quantity }),
    }).catch((error) => console.error("Failed to update quantity:", error));
  };

  // Handle note change
  const handleNoteChange = (itemId, note) => {
    const updatedCart = cart.map((store) => {
      store.items.forEach((item) => {
        if (item.cart_id === itemId) {
          item.note = note;
        }
      });
      return store;
    });
    setCart(updatedCart);

    fetch(`${API_URL}/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    }).catch((error) => console.error("Failed to update note:", error));
  };

  // Handle delete all items
  const handleDeleteAll = () => {
    setCart([]);
    fetch(`${API_URL}/cart`, { method: "DELETE" }).catch((error) =>
      console.error("Failed to delete all items:", error)
    );
  };

  // Handle delete per item
  const handleDeleteItem = (itemId) => {
    const updatedCart = cart
      .map((store) => ({
        ...store,
        items: store.items.filter((item) => item.cart_id !== itemId),
      }))
      .filter((store) => store.items.length > 0);
    setCart(updatedCart);

    fetch(`${API_URL}/cart/${itemId}`, { method: "DELETE" }).catch(
      (error) => console.error("Failed to delete item:", error)
    );
  };

  // Handle delete per store
  // Handle delete per store
  const handleDeleteStore = async (storeId) => {
    // Update state to remove store and its items from UI
    const updatedCart = cart.filter((store) => store.store_id !== storeId);
    setCart(updatedCart);

    // Delete items permanently from the database
    try {
      const response = await fetch(
        `${API_URL}/cart/store/${storeId}`,
        { method: "DELETE" }
      );
      if (!response.ok)
        throw new Error("Failed to delete store items from database");
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="btn btn-success mb-4">
        Kembali ke home
      </Link>
      <div className="d-flex justify-content-between align-items-center mb-3 border p-3 rounded">
        <div className="form-check">
          <input
            type="checkbox"
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="form-check-input"
            checked={selectAll}
          />
          <label className="form-check-label">Pilih Semua</label>
        </div>
        <button className="btn" onClick={handleDeleteAll}>
          <b className="text text-success">Hapus</b>
        </button>
      </div>

      {cart.map((store) => (
        <div key={store.store_id} className="mb-4 border p-3 rounded">
          <div className="d-flex align-items-center mb-3">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={store.items.every((item) => item.checked)}
              onChange={(e) =>
                handleStoreCheckbox(store.store_id, e.target.checked)
              }
            />
            <img
              src={store.store_avatar}
              alt="Store Avatar"
              className="rounded-circle me-2"
              width="50"
            />
            <strong>{store.store_name}</strong>
            <button
              className="btn  btn-sm ms-auto"
              onClick={() => handleDeleteStore(store.store_id)}
            >
              <img
                src="/icons8-delete-100.png"
                style={{ width: "30px", height: "30px", objectFit: "cover" }}
              ></img>
            </button>
          </div>
          {store.items.map((item) => (
            <div key={item.cart_id} className="row mb-3 align-items-center">
              <div className="col-auto">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={item.checked}
                  onChange={(e) =>
                    handleItemCheckbox(item.cart_id, e.target.checked)
                  }
                />
              </div>
              <div className="col-2">
                <img
                  src={item.image}
                  alt={item.item_name}
                  className="img-thumbnail"
                />
              </div>
              <div className="col-4">
                <p>
                  <strong>{item.item_name}</strong>
                </p>
                <p>Harga: Rp{formatPrice(item.price)}</p>
                <p>Diskon: {item.discount_percent}%</p>
                <div className="input-group">
                  <div className="d-flex border border-1 rounded-2">
                    <button
                      className="btn btn-outline-none"
                      onClick={() => handleQuantityChange(item.cart_id, false)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={item.quantity}
                      readOnly
                      style={{
                        maxWidth: "50px",
                        border: "none",
                      }}
                    />
                    <button
                      className="btn btn-outline-none"
                      onClick={() => handleQuantityChange(item.cart_id, true)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="d-flex ml-100" style={{ gap: "10px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tambahkan catatan..."
                    value={item.note || ""}
                    onChange={(e) =>
                      handleNoteChange(item.cart_id, e.target.value)
                    }
                  />

                  <button
                    className="btn  ml-10"
                    onClick={() => handleDeleteItem(item.cart_id)}
                  >
                    <img
                      src="/icons8-delete-100.png"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    ></img>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="text-end mt-4">
        <h5>
          Total Harga:{" "}
          <span className="text-success">Rp{formatPrice(totalPrice)}</span>
        </h5>
        {!isCheckout && (
          <button className="btn btn-success">
            <Link to="/checkout" name="btn btn-success mb-4">
              Pergi ke keranjang
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
