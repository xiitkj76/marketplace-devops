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

echo "Semua smoke test LULUS"