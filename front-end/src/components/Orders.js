import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../config";

const formatPrice = (price) =>
  Number(price).toLocaleString("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
  });

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Gagal mengambil riwayat pesanan.");
        }
        if (!Array.isArray(data.orders)) {
          throw new Error("Format data riwayat pesanan tidak valid.");
        }
        setOrders(data.orders);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="container">
      <h2 className="mb-4">Riwayat Pesanan</h2>
      {state?.successMessage && (
        <div className="alert alert-success" role="status">
          {state.successMessage}
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {loading ? (
        <p>Memuat riwayat pesanan...</p>
      ) : !error && orders.length === 0 ? (
        <p className="text-muted">Belum ada pesanan.</p>
      ) : (
        !error &&
        orders.map((order) => (
          <section className="card mb-3" key={order.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between flex-wrap gap-2">
                <h5 className="card-title">Pesanan #{order.id}</h5>
                <strong>Rp{formatPrice(order.total_price)}</strong>
              </div>
              <p className="mb-1">Alamat: {order.address}</p>
              <p className="mb-1">Jumlah item: {order.jumlah_item}</p>
              <small className="text-muted">
                {new Date(order.created_at).toLocaleString("id-ID")}
              </small>
            </div>
          </section>
        ))
      )}
    </main>
  );
};

export default Orders;
