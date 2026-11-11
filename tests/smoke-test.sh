#!/usr/bin/env bash
# Smoke test: memastikan seluruh container berjalan dan saling terhubung.
set -e

BACKEND=${BACKEND_URL:-http://localhost:3001}
FRONTEND=${FRONTEND_URL:-http://localhost:3000}

echo "Menunggu backend siap..."
for i in $(seq 1 30); do
  if curl -sf "$BACKEND/items" > /dev/null; then break; fi
  sleep 3
done

echo "Test 1: GET /items mengembalikan 30 produk"
COUNT=$(curl -sf "$BACKEND/items" | jq '.data | length')
[ "$COUNT" -eq 30 ] || { echo "GAGAL: jumlah produk $COUNT"; exit 1; }
echo "  OK ($COUNT produk)"

echo "Test 2: GET /items/1 mengembalikan produk id 1"
ID=$(curl -sf "$BACKEND/items/1" | jq '.data[0].id')
[ "$ID" -eq 1 ] || { echo "GAGAL: id $ID"; exit 1; }
echo "  OK"

echo "Test 3: GET /cart dapat diakses"
curl -sf "$BACKEND/cart" | jq -e '.hasil' > /dev/null
echo "  OK"

echo "Test 4: gambar logo toko tersedia"
curl -sf -o /dev/null "$BACKEND/bookculture.jpg"
echo "  OK"

echo "Test 5: frontend (Nginx) merespons halaman utama dan route /cart"
curl -sf "$FRONTEND/" | grep -q '<div id="root">'
curl -sf "$FRONTEND/cart" | grep -q '<div id="root">'
echo "  OK"

echo "Test 6: POST /orders dengan keranjang kosong ditolak (400)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BACKEND/orders" \
-H "Content-Type: application/json" -d '{"cart": []}')
[ "$STATUS" -eq 400 ] || { echo "GAGAL: status $STATUS, seharusnya 400"; exit 1; }
echo " OK"
echo "Test 7: alur checkout lengkap (tambah ke keranjang -> buat pesanan)"
curl -sf -X POST "$BACKEND/cart" -H "Content-Type: application/json" \
-d '{"item_id": 1, "quantity": 2, "is_checked": true, "note": "test CI"}' > /dev/null
CART=$(curl -sf "$BACKEND/cart/true" | jq '.hasil')
[ "$(echo "$CART" | jq 'length')" -ge 1 ] || { echo "GAGAL: keranjang kosong"; exit 1; }
BODY=$(jq -n --argjson cart "$CART" \
'{cart: $cart, address: "Alamat Test CI", totalPrice: 100000}')
RESP=$(curl -s -w "\n%{http_code}" -X POST "$BACKEND/orders" \
-H "Content-Type: application/json" -d "$BODY")
STATUS=$(echo "$RESP" | tail -n1)
ORDER_ID=$(echo "$RESP" | head -n1 | jq '.order_id')
[ "$STATUS" -eq 201 ] || { echo "GAGAL: status $STATUS, seharusnya 201"; exit 1; }
echo " OK (order_id $ORDER_ID)"
echo "Test 8: pesanan tercatat di GET /orders dan keranjang dikosongkan"
curl -sf "$BACKEND/orders" | jq -e --argjson id "$ORDER_ID" \
'.orders | any(.id == $id)' > /dev/null || { echo "GAGAL: pesanan tidak ada"; exit 1; }
SISA=$(curl -sf "$BACKEND/cart/true" | jq '.hasil | length')
[ "$SISA" -eq 0 ] || { echo "GAGAL: masih ada $SISA item di keranjang"; exit 1; }
echo " OK"
echo "Test 9: halaman Riwayat Pesanan (/orders) dapat diakses di frontend"
curl -sf "$FRONTEND/orders" | grep -q '<div id="root">'
echo " OK"

echo "Semua smoke test LULUS"