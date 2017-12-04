-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2017 at 06:57 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `form_pajak`
--

-- --------------------------------------------------------

--
-- Table structure for table `lspop`
--

CREATE TABLE `lspop` (
  `id_lspop` int(11) NOT NULL,
  `jenis_formulir` varchar(45) DEFAULT NULL,
  `jenis_transaksi` varchar(45) DEFAULT NULL,
  `nop` int(11) DEFAULT NULL,
  `nomor_bangunan` int(11) DEFAULT NULL,
  `konstruksi` varchar(45) DEFAULT NULL,
  `jenis_bangunan` varchar(45) DEFAULT NULL,
  `atap` varchar(45) DEFAULT NULL,
  `luas_bangunan` int(11) DEFAULT NULL,
  `dinding` varchar(45) DEFAULT NULL,
  `tahun_dibangun` year(4) DEFAULT NULL,
  `lantai` varchar(45) DEFAULT NULL,
  `kondisi_bangunan` varchar(45) DEFAULT NULL,
  `langit_langit` varchar(45) DEFAULT NULL,
  `jumlah_lantai` int(11) DEFAULT NULL,
  `tahun_renovasi` year(4) DEFAULT NULL,
  `daya_listrik` int(11) DEFAULT NULL,
  `jumlah_ac_split` int(11) DEFAULT NULL,
  `jumlah_ac_window` int(11) DEFAULT NULL,
  `ac_central` tinyint(4) DEFAULT '0',
  `luas_kolam_renang` varchar(45) DEFAULT NULL,
  `finishing_kolam` varchar(45) DEFAULT NULL,
  `luas_perkerasan_halaman_berat` int(11) DEFAULT NULL,
  `luas_perkerasan_halaman_dg_penutup_lantai` int(11) DEFAULT NULL,
  `luas_perkerasan_halaman_ringan` int(11) DEFAULT NULL,
  `luas_perkerasan_halaman_sedang` int(11) DEFAULT NULL,
  `jumlah_lapangan_teknis_aspal_no_lampu` int(11) DEFAULT NULL,
  `jumlah_lapangan_teknis_aspal_with_lampu` int(11) DEFAULT NULL,
  `jumlah_lapangan_teknis_beton_no_lampu` int(11) DEFAULT NULL,
  `jumlah_lapangan_teknis_beton_with_lampu` int(11) DEFAULT NULL,
  `jumlah_lapangan_teknis_tanah_liat_no_lampu` int(11) DEFAULT NULL,
  `jumlah_lapangan_teknis_tanah_liat_with_lampu` int(11) DEFAULT NULL,
  `jumlah_lift_barang` int(11) DEFAULT NULL,
  `jumlah_lift_kapsul` int(11) DEFAULT NULL,
  `jumlah_lift_penumpang` int(11) DEFAULT NULL,
  `jumlah_tangga_berjalan_k_080` int(11) DEFAULT NULL,
  `jumlah_tangga_berjalan_l_080` int(11) DEFAULT NULL,
  `panjang_pagar` int(11) DEFAULT NULL,
  `bahan_pagar` varchar(45) DEFAULT NULL,
  `jenis_pagar` varchar(45) DEFAULT NULL,
  `jumlah_pabx` int(11) DEFAULT NULL,
  `kedalaman_sumur_artesis` int(11) DEFAULT NULL,
  `pemadam_kebakaran_fire_alarm` tinyint(4) DEFAULT '0',
  `pemadam_kebakaran_hydrant` tinyint(4) DEFAULT '0',
  `pemadam_kebakaran_sprinkler` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lspop`
--

INSERT INTO `lspop` (`id_lspop`, `jenis_formulir`, `jenis_transaksi`, `nop`, `nomor_bangunan`, `konstruksi`, `jenis_bangunan`, `atap`, `luas_bangunan`, `dinding`, `tahun_dibangun`, `lantai`, `kondisi_bangunan`, `langit_langit`, `jumlah_lantai`, `tahun_renovasi`, `daya_listrik`, `jumlah_ac_split`, `jumlah_ac_window`, `ac_central`, `luas_kolam_renang`, `finishing_kolam`, `luas_perkerasan_halaman_berat`, `luas_perkerasan_halaman_dg_penutup_lantai`, `luas_perkerasan_halaman_ringan`, `luas_perkerasan_halaman_sedang`, `jumlah_lapangan_teknis_aspal_no_lampu`, `jumlah_lapangan_teknis_aspal_with_lampu`, `jumlah_lapangan_teknis_beton_no_lampu`, `jumlah_lapangan_teknis_beton_with_lampu`, `jumlah_lapangan_teknis_tanah_liat_no_lampu`, `jumlah_lapangan_teknis_tanah_liat_with_lampu`, `jumlah_lift_barang`, `jumlah_lift_kapsul`, `jumlah_lift_penumpang`, `jumlah_tangga_berjalan_k_080`, `jumlah_tangga_berjalan_l_080`, `panjang_pagar`, `bahan_pagar`, `jenis_pagar`, `jumlah_pabx`, `kedalaman_sumur_artesis`, `pemadam_kebakaran_fire_alarm`, `pemadam_kebakaran_hydrant`, `pemadam_kebakaran_sprinkler`) VALUES
(1, 'LSPOP', 'Pemutakhiran data bangunan', 6665544, 78676, '3 - Batu Bata', 'JPB03 - Pabrik', '2 - GTG Beton/Aluminium', 42, '3 - Batu Bata/Conblok', 2003, '3 - Teraso', '2 - Baik', '1 - Marmer', 3, 1999, 3, 1, 2, 1, '1997', '13 - Kolam Renang Pelapis', 3, 10, 2, 4, 6, 2, 4, 1, 2, 3, 10, 5, 3, 5, 6, NULL, '36 - Pagar Batako', NULL, 76, 2000, 0, 1, 0),
(2, 'LSPOP', 'Pemutakhiran data bangunan', 2147483647, 8786876, '2 - Beton', 'JPB04 - Toko/Apotik/Pasar/Ruko', '4 - ASBES', 56, '5 - Seng', 2004, '3 - Teraso', '2 - Baik', '4 - Ubin PC/Papan', 3, 0000, 10, 1, 2, 1, '2', '12 - Kolam Renang Plester', 2, 0, 1, 3, 0, -1, 0, 0, 0, 0, 5, 5, 5, 5, 5, 8, '35 - Pagar Besi', NULL, 3, 15, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level` enum('admin','operator') NOT NULL,
  `aktif` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `nama`, `username`, `password`, `level`, `aktif`) VALUES
(1, 'Administrator', 'admin', 'sha1$085f4998$1$778a9017eafe10071100fde3857aa629a706b1eb', 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `spop`
--

CREATE TABLE `spop` (
  `id_spop` int(11) NOT NULL,
  `jenis_formulir` varchar(45) DEFAULT NULL,
  `jenis_transaksi` varchar(45) NOT NULL,
  `nop` int(11) NOT NULL,
  `nop_bersama` int(11) NOT NULL,
  `nop_asal` int(11) NOT NULL,
  `nomor_ktp` int(11) NOT NULL,
  `status_wp` varchar(45) DEFAULT NULL,
  `pekerjaan` varchar(45) DEFAULT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `npwp` varchar(45) DEFAULT NULL,
  `telepon` int(11) DEFAULT NULL,
  `jalan` varchar(45) DEFAULT NULL,
  `blok_kav_no` varchar(45) DEFAULT NULL,
  `rt` varchar(45) DEFAULT NULL,
  `rw` varchar(45) DEFAULT NULL,
  `kelurahan` varchar(45) DEFAULT NULL,
  `dati_ii` varchar(45) DEFAULT NULL,
  `kodepos` varchar(45) DEFAULT NULL,
  `nomor_persil` int(11) DEFAULT NULL,
  `jalan_op` varchar(45) DEFAULT NULL,
  `blok_kav_no_op` varchar(45) DEFAULT NULL,
  `cabang` varchar(45) DEFAULT NULL,
  `rt_op` varchar(45) DEFAULT NULL,
  `rw_op` varchar(45) DEFAULT NULL,
  `luas_tanah` int(11) DEFAULT NULL,
  `kode_znt` varchar(45) DEFAULT NULL,
  `jumlah_bangunan` int(11) DEFAULT NULL,
  `jenis_tanah` varchar(45) DEFAULT NULL,
  `approved` tinyint(4) DEFAULT '0',
  `file_ktp` varchar(65) DEFAULT NULL,
  `file_bukti_kepemilikan` varchar(65) DEFAULT NULL,
  `file_surat_keterangan_kelurahan` varchar(65) DEFAULT NULL,
  `file_izin_mendirikan_bangunan` varchar(65) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `spop`
--

INSERT INTO `spop` (`id_spop`, `jenis_formulir`, `jenis_transaksi`, `nop`, `nop_bersama`, `nop_asal`, `nomor_ktp`, `status_wp`, `pekerjaan`, `nama`, `npwp`, `telepon`, `jalan`, `blok_kav_no`, `rt`, `rw`, `kelurahan`, `dati_ii`, `kodepos`, `nomor_persil`, `jalan_op`, `blok_kav_no_op`, `cabang`, `rt_op`, `rw_op`, `luas_tanah`, `kode_znt`, `jumlah_bangunan`, `jenis_tanah`, `approved`, `file_ktp`, `file_bukti_kepemilikan`, `file_surat_keterangan_kelurahan`, `file_izin_mendirikan_bangunan`) VALUES
(1, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(2, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(3, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(4, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(5, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(6, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(7, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(8, 'SPOP', 'Pemutakhiran Data OP', 1234567, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'qeqweqwe', 'grthrth', 23534647, 'wevwrger', 'qwere23rf23', '4', '5', 'rwfvdfb', 'njytyu', '4325346', 34667, 'ewerrwererwer', 'sdfwvrth', 'Cabang', '13', '34', 4346478, NULL, 434645, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(9, 'SPOP', 'Perekaman Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '1 - Pemilik', '1 - PNS', 'Bnajoan', '783456387653456', 2147483647, 'Test', 'Blok-V', '1', '2', 'Singkil 1', 'Kota', '95432', 2147483647, 'Sungai Barito', 'Blok-Gg', 'Cabang', '2', '5', 13, NULL, 2, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(10, 'SPOP', 'Perekaman Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '1 - Pemilik', '1 - PNS', 'Bnajoan', '783456387653456', 2147483647, 'Test', 'Blok-V', '1', '2', 'Singkil 1', 'Kota', '95432', 2147483647, 'Sungai Barito', 'Blok-Gg', 'Cabang', '2', '5', 13, NULL, 2, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(11, 'SPOP', 'Perekaman Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '1 - Pemilik', '1 - PNS', 'Bnajoan', '783456387653456', 2147483647, 'Test', 'Blok-V', '1', '2', 'Singkil 1', 'Kota', '95432', 2147483647, 'Sungai Barito', 'Blok-Gg', 'Cabang', '2', '5', 13, NULL, 2, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(12, 'SPOP', 'Perekaman Data OP', 784997655, 2147483647, 2147483647, 23535647, '3 - Pengelola', '2 - ABRI', 'weiuhriwuehr', '5476746356', 2147483647, 'werwer', 'fvkdnbtrobb', '98234f8', '98ryq87qye', '787', 'wfrgth', 'rt87', 2147483647, 'wtertrtytryn', 'wnfnf', 'Cabang', '67', '9', 12, NULL, 5, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(13, 'SPOP', 'Perekaman Data OP', 784997655, 2147483647, 2147483647, 23535647, '3 - Pengelola', '2 - ABRI', 'weiuhriwuehr', '5476746356', 2147483647, 'werwer', 'fvkdnbtrobb', '98234f8', '98ryq87qye', '787', 'wfrgth', 'rt87', 2147483647, 'wtertrtytryn', 'wnfnf', 'Cabang', '67', '9', 12, NULL, 5, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(14, 'SPOP', 'Perekaman Data OP', 784997655, 2147483647, 2147483647, 23535647, '3 - Pengelola', '2 - ABRI', 'weiuhriwuehr', '5476746356', 2147483647, 'werwer', 'fvkdnbtrobb', '98234f8', '98ryq87qye', '787', 'wfrgth', 'rt87', 2147483647, 'wtertrtytryn', 'wnfnf', 'Cabang', '67', '9', 12, NULL, 5, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(15, 'SPOP', 'Perekaman Data OP', 784997655, 2147483647, 2147483647, 23535647, '3 - Pengelola', '2 - ABRI', 'weiuhriwuehr', '5476746356', 2147483647, 'werwer', 'fvkdnbtrobb', '98234f8', '98ryq87qye', '787', 'wfrgth', 'rt87', 2147483647, 'wtertrtytryn', 'wnfnf', 'Cabang', '67', '9', 12, NULL, 5, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(16, 'SPOP', 'Perekaman Data OP', 784997655, 2147483647, 2147483647, 23535647, '3 - Pengelola', '2 - ABRI', 'weiuhriwuehr', '5476746356', 2147483647, 'werwer', 'fvkdnbtrobb', '98234f8', '98ryq87qye', '787', 'wfrgth', 'rt87', 2147483647, 'wtertrtytryn', 'wnfnf', 'Cabang', '67', '9', 12, NULL, 5, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(17, 'SPOP', 'Perekaman Data OP', 784997655, 2147483647, 2147483647, 23535647, '3 - Pengelola', '2 - ABRI', 'weiuhriwuehr', '5476746356', 2147483647, 'werwer', 'fvkdnbtrobb', '98234f8', '98ryq87qye', '787', 'wfrgth', 'rt87', 2147483647, 'wtertrtytryn', 'wnfnf', 'Cabang', '67', '9', 12, NULL, 5, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(18, 'SPOP', 'Perekaman Data OP', 784997655, 2147483647, 2147483647, 23535647, '3 - Pengelola', '2 - ABRI', 'weiuhriwuehr', '5476746356', 2147483647, 'werwer', 'fvkdnbtrobb', '98234f8', '98ryq87qye', '787', 'wfrgth', 'rt87', 2147483647, 'wtertrtytryn', 'wnfnf', 'Cabang', '67', '9', 12, NULL, 5, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(19, 'SPOP', 'Pemutakhiran Data OP', 877767666, 2147483647, 2147483647, 78424536, '2 - Penyewa', '2 - ABRI', 'qwefgrh', '57556ghg65', 56758768, 'fwefwe', 'bytjtj', '5', '54', 'ouipopiop', 'vervr', '434654', 4545756, 'fewfwef', 'wfwe', 'Cabang', '56', '7', 4, NULL, 1, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(20, 'SPOP', 'Perekaman Data OP', 776765655, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '3 - Pensiunan', 'eretery', '456567', 2147483647, 'fegrth', 'rtreh45h', '43', '4546', 'fwvee', 'rweeterrt', '14356567', 2147483647, 'ewefsdgfdg', 'rt5h45h', 'Cabang', '43', '5', 1235665, NULL, 32, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(21, 'SPOP', 'Perekaman Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '3 - Pensiunan', 'efergrthtyjuj', '5647567', 325457657, 'fergert', 'fertet', '13', '56', 'wwewer', 'qwegerg', '2434654', 4353646, 'wefwew', 'rtr423r3', 'Cabang', '1', '2', 43, NULL, 4, 'TANAH+BANGUNAN', 0, NULL, NULL, NULL, NULL),
(22, 'SPOP', 'Pemutakhiran Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '3 - Pensiunan', 'fwrertrt', '1456546', 2147483647, 'wfregrth', '47565', '123', '34', 'rertrt', 'werwerwer', '4324356', 324546, 'fwwewr', 'erwer', 'Cabang', '1', '23', 13, NULL, 23, 'TANAH KAVLING SIAP BANGUN', 0, NULL, NULL, NULL, NULL),
(23, 'SPOP', 'Pemutakhiran Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '3 - Pensiunan', 'ewerwer', 'sdfsdf', 436457567, 'fwefw', 'ertryrty', '324', '436', 'wwgerge', 'ferbebe', '434636', 64575674, 'dfergb', 'rr4r', 'Cabang', '1', '2', 1, NULL, 1, 'TANAH KAVLING SIAP BANGUN', 0, '22e58e26d4bf078d88392a15d1bc1860.png', 'e473d778b8aab149f348124f4fad0569.jpg', '93e1c0d9e49611a4f9d747c2b7b7e86d.png', NULL),
(24, 'SPOP', 'Pemutakhiran Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'wewwerwe', 'wer3r23', 435346, 'efwefwe', 'qwwr', '1', '2', 'rwerdgeger', 'ergrthuku', '253465', 3434457, 'fergerg', '14rfw3', 'Cabang', '2', '3', 43, NULL, 24, 'TANAH KAVLING SIAP BANGUN', 0, '499355339734ed8eb6be9d4e116da751.png', '89d4bcd3f9154f56f87235ec04bd00bd.png', 'cdf31e0919acc70d94f5816f29567319.JPG', NULL),
(25, 'SPOP', 'Pemutakhiran Data OP', 2147483647, 2147483647, 2147483647, 2147483647, '2 - Penyewa', '2 - ABRI', 'wertert', 'rewrwer', 4235334, 'werwer', 'vegrthrty', '34', '4', 'hjhjk', 'tyutyu', '4356', 43546, 'efwer', 'rwesawe33', 'Cabang', '2', '3', 1232342, NULL, 2, 'TANAH KAVLING SIAP BANGUN', 0, '4e153e5f7ce0366c5fe1fad478ba33a4.jpg', '8581ec5734086d7908604508678756af.png', '800124e18c42afb7ba1897135f51e196.pdf', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lspop`
--
ALTER TABLE `lspop`
  ADD PRIMARY KEY (`id_lspop`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `nama_UNIQUE` (`nama`);

--
-- Indexes for table `spop`
--
ALTER TABLE `spop`
  ADD PRIMARY KEY (`id_spop`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lspop`
--
ALTER TABLE `lspop`
  MODIFY `id_lspop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `spop`
--
ALTER TABLE `spop`
  MODIFY `id_spop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
