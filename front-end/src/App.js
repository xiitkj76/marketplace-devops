import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
// import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
