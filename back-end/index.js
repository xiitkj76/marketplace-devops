const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3001;
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "marketplace",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

const migrations = [
  `CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address TEXT,
  total_price INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_name VARCHAR(100),
  price INT,
  discount_percent INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
  )`,
];
migrations.forEach((sql) =>
  conn.query(sql, (err) => {
    if (err) throw err;
  })
);
console.log("Migrasi tabel orders siap");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public/images")));

app.get("/data/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "public/images", filename);
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error serving image:", err);
      res.status(404).send("Image not found");
    }
  });
});

// GET items
app.get("/items", (req, res) => {
  const sql = `
  SELECT
  items.id,
    items.store_id,
    items.name,
    items.price,
    items.category,
    items.discount_percent,
    items.image,
    items.description,
    stores.name AS dataname,
    stores.avatar AS avatar
  FROM
    items
  LEFT JOIN 
      stores ON items.store_id = stores.id
`;
  conn.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ data: results });
  });
});

app.get("/items/:id", (req, res) => {
	const sql = `
	SELECT
	  items.id,
	  items.store_id,
	  items.name,
	  items.price,
	  items.category,
	  items.discount_percent,
	  items.image,
	  items.description,
	  stores.name AS dataname,
	  stores.avatar AS avatar
	FROM
	  items
	LEFT JOIN 
		stores ON items.store_id = stores.id

	WHERE items.id = ${req.params.id}
  `;
	conn.query(sql, (err, results) => {
	  if (err) return res.status(500).send(err);
	  res.status(200).json({ data: results });
	});
  });

app.get("/items/store_id/:id", (req, res) => {
	const sql = `
	SELECT
	  items.id,
	  items.store_id,
	  items.name,
	  items.price,
	  items.category,
	  items.discount_percent,
	  items.image,
	  items.description,
	  stores.name AS dataname,
	  stores.avatar AS avatar
	FROM
	  items
	LEFT JOIN 
		stores ON items.store_id = stores.id

	WHERE items.store_id = ${req.params.id}
  `;
	conn.query(sql, (err, results) => {
	
	  if (err || results.length === 0) return res.send("Barang tidak ditemukan")
	  res.status(200).json({ data: results });
	});
  });

// POST items
app.post("/items", (req, res) => {
  const {
    store_id,
    name,
    price,
    category,
    discount_percent,
    image,
    description,
  } = req.body;
  const sql =
    "INSERT INTO items (store_id, name, price, category, discount_percent, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [store_id, name, price, category, discount_percent, image, description],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: "Items Add successfully" });
    }
  );
});

// Endpoint DELETE untuk Cart by Store (Dipakai halaman Cart)
app.delete("/cart/store/:storeId", (req, res) => {
	const { storeId } = req.params;
	const sql = "DELETE FROM cart WHERE item_id IN (SELECT id FROM items WHERE store_id = ?)";
	
	conn.query(sql, [storeId], (err, results) => {
	  if (err) return res.status(500).send(err);
	  res.status(200).json({ message: "Items from the store deleted successfully" });
	});
  });

app.get("/cart", (req, res) => {
	const sql = `
	  SELECT 
		c.id AS cart_id,
		i.name AS item_name,
		i.price,
		i.image,
		i.discount_percent,
		c.quantity,
		c.note,
		c.checked,
		i.store_id,
		s.name AS store_name,
		s.avatar AS store_avatar
	  FROM cart c
	  JOIN items i ON c.item_id = i.id
	  JOIN stores s ON i.store_id = s.id
	`;
	conn.query(sql, (err, results) => {
	  if (err) return res.status(500).send(err);
	  res.status(200).json({ hasil: results });
	});
  });

  app.get("/cart/:checked", (req, res) => {
	const isChecked = req.params.checked === "true";
  
	const sql = `
	  SELECT 
		c.id AS cart_id,
		i.name AS item_name,
		i.price,
		i.discount_percent,
		c.quantity,
		c.note,
		c.checked,
		i.store_id,
		s.name AS store_name,
		s.avatar AS store_avatar,
		i.image
	  FROM cart c
	  JOIN items i ON c.item_id = i.id
	  JOIN stores s ON i.store_id = s.id
	  WHERE c.checked = ?
	`;
  
	conn.query(sql, [isChecked], (err, results) => {
	  if (err) return res.status(500).json({ error: err.message });
	  res.status(200).json({ hasil: results });
	});
  });

app.post("/cart", (req, res) => {
	const { item_id, quantity, is_checked, note } = req.body;
  
	console.log("Request received with data:", req.body); 
  
	if (!item_id) {
	  console.error("item_id is missing");
	  return res.status(400).json({ error: "item_id is required" });
	}
  
	const checkQuery = "SELECT * FROM cart WHERE item_id = ?";
	conn.query(checkQuery, [item_id], (err, results) => {
	  if (err) {
		console.error("Error querying cart:", err);
		return res.status(500).json({ error: "Failed to query cart" });
	  }
  
	  if (results.length > 0) {
		const newQuantity = results[0].quantity + quantity;
		const updateQuery = `
		  UPDATE cart
		  SET quantity = ?, checked = ?, note = ?
		  WHERE id = ?
		`;
		conn.query(updateQuery, [newQuantity, is_checked, note, results[0].id], (err) => {
		  if (err) {
			console.error("Error updating cart:", err);
			return res.status(500).json({ error: "Failed to update cart" });
		  }
		  console.log("Cart updated successfully");
		  res.json({ message: "Quantity updated successfully", id: results[0].id });
		});
	  } else {
		const insertQuery = `
		  INSERT INTO cart (item_id, quantity, checked, note)
		  VALUES (?, ?, ?, ?)
		`;
		conn.query(insertQuery, [item_id, quantity, is_checked, note], (err, result) => {
		  if (err) {
			console.error("Error inserting into cart:", err);
			return res.status(500).json({ error: "Failed to add item to cart" });
		  }
		  console.log("Item added to cart successfully with ID:", result.insertId);
		  res.status(201).json({ message: "Item added to cart", id: result.insertId });
		});
	  }
	});
  });

app.put("/cart/:id", (req, res) => {
	const { id } = req.params;
	const { note, checked, quantity } = req.body;
  
	const sql = `
	  UPDATE cart
	  SET 
		note = COALESCE(?, note), 
		checked = COALESCE(?, checked),
		quantity = COALESCE(?, quantity)
	  WHERE id = ?
	`;
  
	conn.query(sql, [note, checked, quantity, id], (err) => {
	  if (err) return res.status(500).send(err);
	  res.status(200).json({ message: "Cart updated successfully" });
	});
  });

// DELETE cart (per item) 
app.delete("/cart/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cart WHERE id = ?";
  conn.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Cart item deleted" });
  });
});

// DELETE cart (all items)
app.delete("/cart", (req, res) => {	
  const sql = "DELETE FROM cart";
  conn.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: "All cart items deleted" });
  });
});

app.post("/orders", (req, res) => {
  const { cart, address, totalPrice } = req.body;
  
  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: "Tidak ada item untuk dipesan" });
  }

  conn.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message });

    const gagal = (err) => conn.rollback(() => res.status(500).json({ error: err.message }));

    // 1. Simpan data pesanan
    conn.query("INSERT INTO orders (address, total_price) VALUES (?, ?)", [address || " ", Math.round(totalPrice || 0)], (err, result) => {
      if (err) return gagal(err);
      const orderId = result.insertId;

      // 2. Simpan rincian barang
      const rows = cart.map(i => [orderId, i.item_name, i.price, i.discount_percent, i.quantity]);
      conn.query("INSERT INTO order_items (order_id, item_name, price, discount_percent, quantity) VALUES ?", [rows], (err) => {
        if (err) return gagal(err);

        // 3. Hapus item yang sudah dipesan dari keranjang
        const cartIds = cart.map(i => i.cart_id);
        conn.query("DELETE FROM cart WHERE id IN (?)", [cartIds], (err) => {
          if (err) return gagal(err);
          
          conn.commit((err) => {
            if (err) return gagal(err);
            res.status(201).json({ message: "Pesanan berhasil dibuat", order_id: orderId });
          });
        });
      });
    });
  });
});

// GET orders: daftar pesanan
app.get("/orders", (req, res) => {
  const sql = `
    SELECT o.id, o.address, o.total_price, o.created_at, COUNT(o.id) AS jumlah_item 
    FROM orders o 
    LEFT JOIN order_items oi ON oi.order_id = o.id 
    GROUP BY o.id 
    ORDER BY o.created_at DESC
  `;
  conn.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ orders: results });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));