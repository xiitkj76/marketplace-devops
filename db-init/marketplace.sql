-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 05:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketplace`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `checked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `store_id`, `name`, `price`, `category`, `discount_percent`, `image`, `description`) VALUES
(1, 1, 'Buku Mindset (Edisi Revisi) - Carol S. Dweck, Ph. D.', 111000, 'Buku', 15, 'https://jbr.id/wp-content/uploads/mindset-copy.jpg', 'Terbukti telah mengubah cara orang melihat dunia dan kesuksesan hidup di berbagai belahan dunia, Mindset bertengger jadi topseller di amazon.com sejak 13 tahun lalu hingga sekarang'),
(2, 1, 'Buku The Psychology of Money - Morgan Housel', 90000, 'Buku', 10, 'https://lpmneraca.com/wp-content/uploads/2023/07/phsykologi-of-money.jpg', 'Adjustable laptop stand for better posture.'),
(3, 1, 'Buku Atomic Habits - James  Clear', 115000, 'Buku', 10, 'https://www.bigw.com.au/medias/sys_master/images/images/he4/h4a/48083947388958.jpg', 'Durable USB-C to USB-A cable.'),
(4, 2, 'Gelang Pria Tali Hitam Paracord Prusik Prodigo Dali Motif 1', 20000, 'Fashion Pria', 0, 'https://www.bigw.com.au/medias/sys_master/images/images/he4/h4a/48083947388958.jpg', 'Aksesoris dari prodigon nambah lagi nih guys, sekarang ada gelang tali berbahan prusik dengan warna hitam yg kece.'),
(5, 2, 'Sabuk Pria Ikat Pinggang Gesper Kulit Panjang Orignal Prodigo Ciremai - COKLAT 1', 50000, 'Fashion Pria', 15, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2022/12/26/88d144af-7487-4c02-af4b-02e8e7247b78.jpg', 'Tali pinggang terbaik'),
(6, 2, 'Slayer Bandana Masker Scraft Paisley Multifungsi Prodigo Ombai Motif 4', 30000, 'Fashion Pria', 15, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/9/18/5849b7f3-4ff2-43f8-9712-755d858e86d7.jpg', 'Slayer bandana ini melindungi kepala atau leher Propeople dari paparan sinar matahari maupun angin.'),
(7, 3, 'Helm Motor Half Face SNI Elders Company Classic - Candy Black / Brown - S', 855000, 'Otomotif', 30, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/9/18/5849b7f3-4ff2-43f8-9712-755d858e86d7.jpg', 'Helm anti petjah!'),
(8, 3, 'Helm Motor Half Face SNI - Slank Elders Company - Putih - XL', 450000, 'Otomotif', 10, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/10/25/6af8f8d5-f07f-4b21-8c2c-4c855524a852.png', 'Edisi terbatas !! Helm Kolaborasi Slank x Elders Company Merayakan 40 tahun Slank di dunia Rock & Roll Indonesia'),
(9, 3, 'Busa Pipi - Helm SNI Classic Elders Company - S', 150000, 'Otomotif', 10, 'https://down-id.img.susercontent.com/file/id-11134207-7r98v-lvwxusnayqvee2', 'Busa pipi pengganti untuk tipe helm Classic.'),
(10, 4, 'RTD Rayton Mini Proji Led Otomotif Motor Biled X1 1.5 Inci 52W LowHigh - Merah', 410000, 'Otomotif', 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmuAwbarmBR0zduQRUl2pOLWE3_6Eb5hN0Dg&s', 'Lampu Biled Dengan Lampu dekat dan Jauh dan Pemasangan mudah dan fleksibel dengan Type Universal'),
(11, 4, 'RTD Lampu Tembak E03L Motor Lensa Low & High Beam dengan Devil 4 warna', 410000, 'Otomotif', 20, 'https://down-id.img.susercontent.com/file/id-11134207-7r98o-lp7l7bwcolu573', 'Teknologi LED dan memiliki 4 mode, Nyala Dekat, Nyala Jauh, Nyala'),
(12, 4, 'RTD Rayton Lampu Utama/ Lampu Laser / Lampu Depan Motor LED M11YL 30W DENGAN KIPAS - Warmwhite, Blue', 120000, 'Otomotif', 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkicNNkROz3EEgF4EI8biL7UZk_-nUsC8XdQ&s', 'Teknologi LED COB terbaru'),
(13, 5, 'Casio Jam Tangan Pria MQ-24-1BLDF', 250000, 'Fashion Pria', 10, 'https://media.dinomarket.com/docs/imgTD/2022-07/_SMine_1658897389453_270722110750_xl.jpg', 'Pasio [MQ-24-1BLDF] Jam tangan pria dalam format analog. Desain simpel dan casual dapat digunakan sehari-hari. '),
(14, 5, 'Casio G-Shock Jam Tangan Pria dengan Format Analog Digital GA-700WD-1ADR', 250000, 'Fashion Pria', 10, 'https://down-id.img.susercontent.com/file/id-11134207-7rase-m2auhlkiob7n1b', 'Jam tangan pria yang kekinian dan tahan air'),
(15, 5, 'Casio Jam Tangan Pria dengan format Analog MQ-24B-9BDF', 539000, 'Fashion Pria', 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo-gw6tcTWBuVlJKCWSG8EneuWIZ_b_MuD3Q&s', 'Desain jarum jam, menit, dan detik menampilkan angka indeks sederhana dalam berbagai skema warna monokromatik.'),
(16, 6, 'Olyps Wireless Keyboard Mouse Komputer Combo 2.4Ghz With USB Receiver', 259000, 'Komputer & Laptop', 25, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/10/8/c627d9ae-c9be-42f6-bc05-45d23177623f.jpg', 'Keyboard dengan ketukan senyap, geser sensitif, Nirkabel 2,4 GHZ yang cocok untuk memenuhi kebutuhan kantor.'),
(17, 6, 'Olyps 2 in 1 Hub Type C+USB 3.0 5Gbps Multi Port Adaptor TF / SD Support untuk PC Laptop Macbook - A', 450000, 'Komputer & Laptop', 0, 'https://down-id.img.susercontent.com/file/id-11134207-7rask-m1qq9ctj941l14', 'USB Hub multi port adaptor serbaguna'),
(18, 6, 'OLYPS Mouse Wireless | 2.4Ghz 1200DPI with Penerima USB 10M Jarak - MOU08', 400000, 'Komputer & Laptop', 0, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/10/8/df783465-1f8c-487f-8218-a0464a50d2c6.jpg', 'Mouse Wireless dengan segudang fitur yang dibutuhkan dalam dunia kerja'),
(19, 7, '910 Nineteen Haze Infiknit 1.0 Sepatu Lari - Hijau Turqoise/Hijau Tua - 45', 549000, 'Olahraga', 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2oOIm62WI1FU0FeMIifNdfqtWY-mGs8fU8w&s', 'Haze Infiknit 1.0 - Identik dengan DNA kecepatan yang dimiliki seri Haze, Haze Infiknit mengadopsinya dengan cara yang berbeda, yaitu dengan menggunakan rajutan sebagai material utama dan dikombinasikan dengan fitur keamanan dibagian belakang.'),
(20, 7, '910 Nineten Nakami Swish Sepatu Basket - Hitam/Putih - 39', 679000, 'Olahraga', 10, 'https://910.id/wp-content/uploads/2024/11/11-3.png', 'Nakami Swish merupakan seri sepatu basket terbaru dari Nineten. Sepatu ini diperuntukkan bagi pemain guard yang mengandalkan pergerakan yang cepat sehingga Nakami Swish unggul di segi keringanannya.'),
(21, 7, '910 Nineten FUUTO REVENGE ABU-TUA/MERAH/SALMON - 38', 679000, 'Olahraga', 20, 'https://down-id.img.susercontent.com/file/id-11134207-7r992-lyn40cotkk7991', 'Fuuto Revenge didesain untuk kebutuhan Daily Running yang memberikan eksperimen ride yang maksimal dengan siluet dan warna atraktif'),
(22, 8, 'YG300 Mini Projector LED 320 x 240 pixels YG-300 Proyektor - YG300+HDMI', 285000, 'Komputer & Laptop', 15, 'https://images.tokopedia.net/img/cache/700/hDjmkQ/2023/7/5/4d2d5fd2-1194-48b8-ba02-8ee00e442c4c.jpg', 'YG300 adalah proyektor dasar, ini adalah produk terbaik untuk proyektor level pemula Anda'),
(23, 8, 'Speaker Bluetooth RGB full bass 99l284', 350000, 'Komputer & Laptop', 10, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/12/17/2cc4984f-b8c9-479a-bd04-fa959fb49da8.jpg', 'Nikmati musik tanpa henti selama 20 jam dengan satu pengisian daya, sangat ideal untuk petualangan di luar ruangan sepanjang hari.'),
(24, 8, 'Fantech DUAL MODE Wireless Mouse Gaming WGC5S Rechargeable PIXART 3311 - Putih', 300000, 'Komputer & Laptop', 10, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/6/20/e5c0c18e-9518-40ec-a122-52887f18d5d3.jpg', 'Mouse ini hadir dengan bobot yang hanya 70 gram untuk memberikan ukuran serta berat yang ideal.'),
(25, 9, 'RAKET BADMINTON YONEX NANOFLARE NEXTAGE ORIGINAL + SENAR YONEX SP', 399000, 'Olahraga', 10, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/3/5/98faa7b9-638d-4625-814a-64d774364077.jpg', 'YONEX NANOFLARE NEXTAGE ORIGINAL MADE IN TAIWAN'),
(26, 9, 'RAKET BADMINTON YONEX NANOFLARE NEXTAGE ORIGINAL + SENAR YONEX SP', 1399, 'Olahraga', 10, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/3/5/98faa7b9-638d-4625-814a-64d774364077.jpg', 'YONEX NANOFLARE NEXTAGE ORIGINAL MADE IN TAIWAN'),
(27, 9, 'YONEX RAKET RUDY HARTONO | ARCSABER 73 LIGHT | ARC SABER BADMINTON - DK BLUE, STANDAR', 427, 'Olahraga', 5, 'https://down-id.img.susercontent.com/file/id-11134207-7r98o-ll33rvr3toxr8b', 'Raket dengan desain yang keren dan ketahanan yang super kokoh'),
(28, 10, 'Oppo Smartphone Oppo A78 5G 8/128GB 6,56 Inch Garansi Resmi - Purple', 3999, 'Smartphone', 33, 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/3/29/33f8cf90-3508-49b2-8982-0f746366e699.jpg', 'Oppo A78 5G merupakan smartphone dengan layar sentuh yang memiliki ukuran 6.56 inchi dengan resolusi 720 x 1612 pixels. '),
(29, 10, 'Samsung Galaxy Z Fold 5 12GB/ 256GB|512GB|1TB 7.6 Inch Garansi Resmi - Phantom Black, 12/512GB', 26999, 'Smartphone', 26, 'https://dorangadget.com/wp-content/uploads/2023/08/Samsung-Galaxy-Z-Fold5-Phantom-Black-1.png', 'Samsung hadir dengan gaya baru, menambah pengalaman pengguna '),
(30, 10, 'Vivo Y19S 4/64GB | 4/128GB | 6/128GB 6.68 Inch Garansi Resmi - Silver, 4/64GB', 1599, 'Smartphone', 2, 'https://down-id.img.susercontent.com/file/id-11134207-7rasc-m33fnrziglvxdc', 'Vivo Y19S menghadirkan segudang fitur baru yang tentunya dapat menambah produktifitas pengguna');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `avatar`) VALUES
(1, 'Book Culture', 'http://localhost:3001/bookculture.jpg'),
(2, 'Prodigo Official', 'http://localhost:3001/prodigo.jpg'),
(3, 'Elders Company', 'http://localhost:3001/elders.jpg'),
(4, 'RTD Store', 'http://localhost:3001/rtd.jpg'),
(5, 'Casio Store', 'http://localhost:3001/casiostore.jpg'),
(6, 'Olyps Store', 'http://localhost:3001/olympus.jpg'),
(7, '910 Shoes', 'http://localhost:3001/910shoes.jpg'),
(8, 'Fantech Official Store', 'http://localhost:3001/techstore.jpg'),
(9, 'Arjuna Sportivo', 'http://localhost:3001/Arjuna Sportivo.jpg'),
(10, 'Andalas Cellular Bpn', 'http://localhost:3001/Andalas Cellular Bpn.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
