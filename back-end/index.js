// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();
// const port = 3001;
// const mysql = require("mysql");
// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "marketplace",
// });

// conn.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL Connected...");
// });

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/data/:filename", (req, res) => {
//   const { filename } = req.params;
//   const imagePath = path.join(__dirname, "public/images", filename);
//   res.sendFile(imagePath, (err) => {
//     if (err) {
//       console.error("Error serving image:", err);
//       res.status(404).send("Image not found");
//     }
//   });
// });

// // GET items
// app.get("/items", (req, res) => {
//   const sql = `
//   SELECT
//     items.store_id,
//     items.name,
//     items.price,
//     items.category,
//     items.discount_percent,
//     items.image,
//     items.description,
//     stores.name AS dataname,
//     stores.avatar AS avatar
//   FROM
//     items
//   LEFT JOIN 
//       stores ON items.store_id = stores.id
// `;
//   conn.query(sql, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.status(200).json({ data: results });
//   });
// });

// // POST items
// app.post("/items", (req, res) => {
//   const {
//     store_id,
//     name,
//     price,
//     category,
//     discount_percent,
//     image,
//     description,
//   } = req.body;
//   const sql =
//     "INSERT INTO items (store_id, name, price, category, discount_percent, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
//   conn.query(
//     sql,
//     [store_id, name, price, category, discount_percent, image, description],
//     (err, result) => {
//       if (err) return res.status(500).send(err);
//       res.status(201).json({ message: "Items Add successfully" });
//     }
//   );
// });

// // GET cart
// app.get("/cart", (req, res) => {
//   const sql = `
//     SELECT c.id AS cart_id, i.name, i.price, i.discount_percent, c.quantity, c.note, c.checked
//     FROM cart c
//     JOIN items i ON c.item_id = i.id
//   `;
//   conn.query(sql, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.status(200).json({ hasil: results });
//   });
// });
 
// app.post("/cart", async (req, res) => {
// 	const { item_id, quantity, is_checked, note } = req.body;
  
// 	try {
// 	  console.log("Request received:", req.body); // Log data yang diterima
  
// 	  // Cek apakah produk sudah ada di cart
// 	  const [existing] = await pool.query(
// 		"SELECT * FROM cart WHERE item_id = ?",
// 		[item_id]
// 	  );
  
// 	  if (existing.length > 0) {
// 		// Produk sudah ada di cart, update kuantitas
// 		const newQuantity = existing[0].quantity + quantity;
// 		console.log("Updating quantity for item:", existing[0].id);
  
// 		await pool.query(
// 		  "UPDATE cart SET quantity = ?, is_checked = ?, note = ? WHERE id = ?",
// 		  [newQuantity, is_checked, note, existing[0].id]
// 		);
  
// 		return res.json({ message: "Quantity updated successfully", id: existing[0].id });
// 	  } else {
// 		// Produk belum ada di cart, tambahkan
// 		console.log("Inserting new item to cart:", item_id);
  
// 		const [result] = await pool.query(
// 		  "INSERT INTO cart (item_id, quantity, is_checked, note) VALUES (?, ?, ?, ?)",
// 		  [item_id, quantity, is_checked, note]
// 		);
  
// 		return res.status(201).json({ message: "Item added to cart", id: result.insertId });
// 	  }
// 	} catch (error) {
// 	  console.error("Error adding to cart:", error.message); // Log error
// 	  return res.status(500).json({ error: error.message });
// 	}
//   });
  
  
//  // app.put("/cart/:id", (req, res) => {
// //   const { id } = req.params;
// //   const { quantity, note, checked } = req.body;

// //   // SQL Query untuk hanya memperbarui field yang dikirim
// //   const sql = `
// // 	  UPDATE cart
// // 	  SET 
// // 		quantity = COALESCE(?, quantity), 
// // 		note = COALESCE(?, note), 
// // 		checked = COALESCE(?, checked)
// // 	  WHERE id = ?
// // 	`;

// //   conn.query(sql, [quantity, note, checked, id], (err) => {
// //     if (err) return res.status(500).send(err);
// //     res.status(200).json({ message: "Cart updated successfully" });
// //   });
// // });


// app.put("/cart/:id", (req, res) => {
// 	const { id } = req.params;
// 	const { note, checked } = req.body;
  
// 	const sql = `
// 	  UPDATE cart
// 	  SET 
// 		note = COALESCE(?, note), 
// 		checked = COALESCE(?, checked)
// 	  WHERE id = ?
// 	`;
  
// 	conn.query(sql, [note, checked, id], (err) => {
// 	  if (err) return res.status(500).send(err);
// 	  res.status(200).json({ message: "Cart updated successfully" });
// 	});
//   });
  




// // DELETE cart (per item) 
// app.delete("/cart/:id", (req, res) => {
//   const { id } = req.params;
//   const sql = "DELETE FROM cart WHERE id = ?";
//   conn.query(sql, [id], (err, results) => {
//     if (err) return res.status(500).send(err);
//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     res.status(200).json({ message: "Cart item deleted" });
//   });
// });

// // DELETE cart (all items)
// app.delete("/cart", (req, res) => {
//   const sql = "DELETE FROM cart";
//   conn.query(sql, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.status(200).json({ message: "All cart items deleted" });
//   });
// });

// app.listen(port, () => console.log(`Server running on port ${port}`));

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

// GET cart
// app.get("/cart", (req, res) => {
//   const sql = `
//     SELECT c.id AS cart_id, i.name, i.price, i.discount_percent, c.quantity, c.note, c.checked
//     FROM cart c
//     JOIN items i ON c.item_id = i.id
//   `;
//   conn.query(sql, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.status(200).json({ hasil: results });
//   });
// });


// GET stores
app.get("/stores", (req, res) => {
	const sql = `
	  SELECT id AS store_id, name AS store_name, avatar AS store_avatar, checked_all
	  FROM stores
	`;
	conn.query(sql, (err, results) => {
	  if (err) return res.status(500).send(err);
	  res.status(200).json({ stores: results });
	});
  });
  
  app.put("/stores/:storeId", (req, res) => {
	const { storeId } = req.params;
	const { checked_all } = req.body;
  
	const sql = `
	  UPDATE stores
	  SET checked_all = ?
	  WHERE id = ?
	`;
	conn.query(sql, [checked_all, storeId], (err) => {
	  if (err) return res.status(500).send(err);
	  res.status(200).json({ message: "Store's checked_all updated successfully" });
	});
  });

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
	const isChecked = req.params.checked === "true"; // Mengonversi parameter ke boolean
  
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
  
	console.log("Request received with data:", req.body); // Log data dari frontend
  
	if (!item_id) {
	  console.error("item_id is missing");
	  return res.status(400).json({ error: "item_id is required" });
	}
  
	// Lanjutkan dengan query database
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

  app.post("/login", (req, res) => {
	const { email, password } = req.body;
  
	const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
	db.query(sql, [email, password], (err, results) => {
	  if (err) return res.status(500).json({ message: "Database error." });
	  if (results.length === 0)
		return res.status(401).json({ message: "Email atau password salah." });
  
	  res.json({ username: results[0].username, email: results[0].email });
	});
  });
  
  

// app.put("/cart/:id", (req, res) => {
//   const { id } = req.params; 
//   const { note, checked } = req.body;

//   const sql = `
//     UPDATE cart
//     SET 
//       note = COALESCE(?, note), 
//       checked = COALESCE(?, checked)
//     WHERE id = ?
//   `;

//   conn.query(sql, [note, checked, id], (err) => {
//     if (err) return res.status(500).send(err);
//     res.status(200).json({ message: "Cart updated successfully" });
//   });
// });


app.put("/cart/:id", (req, res) => {
	const { id } = req.params;
	const { note, checked, quantity } = req.body; // Tambahkan quantity
  
	const sql = `
	  UPDATE cart
	  SET 
		note = COALESCE(?, note), 
		checked = COALESCE(?, checked),
		quantity = COALESCE(?, quantity) -- Tambahkan quantity
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

app.listen(port, () => console.log(`Server running on port ${port}`));
