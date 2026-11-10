import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const SHIPPING_FEE = 20000;

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("Jl. Contoh No. 123, Jakarta, Indonesia");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const shippingFee = cart.length > 0 ? SHIPPING_FEE : 0;
  const totalPayment = totalPrice + shippingFee;

  // Fetch cart data
  useEffect(() => {
    const fetchCheckedItems = async () => {
      try {
        const response = await fetch(`${API_URL}/cart/true`);
        if (!response.ok) throw new Error("Gagal mengambil data checkout");
        const data = await response.json();
        setCart(data.hasil);
        calculateTotalPrice(data.hasil);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCheckedItems();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) =>
        sum +
        (item.price - (item.price * item.discount_percent) / 100) *
          item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "decimal", minimumFractionDigits: 0 });

  const handlePlaceOrder = async () => {
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, address, totalPrice: totalPayment }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal membuat pesanan.");
      }
      navigate("/orders", {
        state: { successMessage: data.message || "Pesanan berhasil dibuat." },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {/* Left Section: Cart Items */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="mb-3">Produk yang Dibeli</h5>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.cart_id}
                    className="d-flex align-items-center mb-3 border-bottom pb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.item_name}
                      className="img-thumbnail me-3"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.item_name}</h6>
                      <p className="mb-0 text-muted">
                        {item.store_name} | Rp
                        {(
                          item.price -
                          (item.price * item.discount_percent) / 100
                        ).toLocaleString("id-ID")} x {item.quantity}
                      </p>
                      <p className="">
                       Catatan : {item.note}
                      </p>
                    </div>
                    <strong>
                      Rp
                      {(
                        (item.price -
                          (item.price * item.discount_percent) / 100) *
                        item.quantity
                      ).toLocaleString("id-ID")}
                    </strong>
                  </div>
                ))
              ) : (
                <p className="text-muted">Tidak ada barang di keranjang</p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Alamat Pengiriman</h5>
              <p>{address}</p>
              <button
                className="btn btn-link p-0"
                onClick={() => {
                  const newAddress = prompt("Masukkan alamat baru:", address);
                  if (newAddress) setAddress(newAddress);
                }}
              >
                Ubah Alamat
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Ringkasan Belanja</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Total Harga</span>
                <strong>Rp{formatPrice(totalPrice)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Ongkos Kirim</span>
                <strong>Rp{formatPrice(shippingFee)}</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Total Bayar</span>
                <strong>Rp{formatPrice(totalPayment)}</strong>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="btn btn-success w-100"
                disabled={cart.length === 0 || submitting}
              >
                {submitting ? "Memproses..." : "Buat Pesanan"}
              </button>
              <Link to="/cart" className="btn btn-secondary w-100 mt-2">
                Kembali ke keranjang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
