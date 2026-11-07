import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const Home = () => {
  const [items, setItems] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/items`);
        const data = await response.json();
        console.log("Fetched items from backend:", data.data); // Debug log data produk
        setItems(data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const addToCart = async (data) => {
    try {
      console.log("Item data being sent to cart:", data); // Debug log seluruh data item

      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: data.id, // Pastikan item.id dikirim
          quantity: 1, // Kuantitas default
          is_checked: false, // Checked default false
          note: "", // Note default kosong
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Unknown error");
      }

      alert(`${data.name} berhasil ditambahkan ke keranjang!`);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      alert(`Gagal menambahkan item ke keranjang: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <Link to="/cart" className="btn btn-success mb-4">
        Pergi ke keranjang
      </Link>

      <div className="row d-flex align-items-stretch">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">{item.description}</p>
                <p className="card-text text-muted">Kategori : {item.category}</p>
                <p className="card-text mt-auto">
                  <strong>Rp {item.price.toLocaleString("id-ID")}</strong>
                  {item.discount_percent > 0 && (
                    <span className="text-danger ms-2">
                      ({item.discount_percent}% OFF)
                    </span>
                  )}
                </p>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={item.avatar}
                    alt={item.dataname}
                    className="rounded-circle me-2"
                    width="40"
                  />
                  <span>{item.dataname}</span>
                </div>
                <button
                  className="btn btn-success w-100 mt-auto"
                  onClick={() => addToCart(item)}
                >
                  Tambahkan ke Keranjang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
