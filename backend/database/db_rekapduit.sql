-- ========================================================
-- Database SQL Dump untuk Project: recapduit
-- Target DBMS: MySQL / MariaDB (phpMyAdmin)
-- Database: db_rekapduit
-- ========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_rekapduit`
--
CREATE DATABASE IF NOT EXISTS `db_rekapduit` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_rekapduit`;

-- --------------------------------------------------------
-- 1. Table: users
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL UNIQUE,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `plan` enum('Free','Pro','Lifetime') NOT NULL DEFAULT 'Pro',
  `is_connected` tinyint(1) NOT NULL DEFAULT 1,
  `connected_phone` varchar(50) DEFAULT NULL,
  `bot_nickname` varchar(50) NOT NULL DEFAULT 'bos',
  `referral_code` varchar(50) NOT NULL UNIQUE,
  `referral_balance` decimal(15,2) NOT NULL DEFAULT 0.00,
  `pending_referral` decimal(15,2) NOT NULL DEFAULT 0.00,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  'deleted_at' timestamp NULL DEFAULT NULL, HTSJN
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial User Data
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `avatar`, `plan`, `is_connected`, `connected_phone`, `bot_nickname`, `referral_code`, `referral_balance`, `pending_referral`, `created_at`, `updated_at`) VALUES
(1, 'Musyafa Anasrullah', 'musyafaanasrullah4@gmail.com', '$2y$12$e8YQzI17p0bL5mFeqhV5aOXpMvWzIqvJb17gU6VjE1a6T2sD3qgWy', '0852-1920-8830', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'Pro', 1, '+62 852-1920-8830', 'bos', 'RECAP8830', 125000.00, 50000.00, '2026-11-01 00:00:00', '2026-11-24 00:00:00');

-- --------------------------------------------------------
-- 2. Table: wallets (Dompet & Rekening)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `wallets`;
CREATE TABLE `wallets` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('cash','bank','ewallet') NOT NULL DEFAULT 'cash',
  `balance` decimal(15,2) NOT NULL DEFAULT 0.00,
  `account_number` varchar(100) DEFAULT NULL,
  `color` varchar(20) NOT NULL DEFAULT '#0284c7',
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `wallets_user_id_foreign` (`user_id`),
  CONSTRAINT `wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Wallets
INSERT INTO `wallets` (`id`, `user_id`, `code`, `name`, `type`, `balance`, `account_number`, `color`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 1, 'wallet-cash', 'Dompet Tunai', 'cash', 850000.00, NULL, '#0284c7', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(2, 1, 'wallet-bca', 'Bank BCA', 'bank', 8450000.00, '8280192831', '#0060af', 0, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(3, 1, 'wallet-mandiri', 'Bank Mandiri', 'bank', 3200000.00, '137001928312', '#0369a1', 0, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(4, 1, 'wallet-gopay', 'GoPay / OVO', 'ewallet', 385000.00, '0812-9842-1100', '#0ea5e9', 0, '2026-11-01 00:00:00', '2026-11-24 00:00:00');

-- --------------------------------------------------------
-- 3. Table: categories (Kategori Pemasukan & Pengeluaran)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('expense','income') NOT NULL,
  `icon` varchar(50) NOT NULL DEFAULT 'Utensils',
  `color` varchar(20) NOT NULL DEFAULT '#0284c7',
  `keywords` text DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categories_user_id_foreign` (`user_id`),
  CONSTRAINT `categories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Categories
INSERT INTO `categories` (`id`, `user_id`, `code`, `name`, `type`, `icon`, `color`, `keywords`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 1, 'cat-makan', 'Makanan & Minuman', 'expense', 'Utensils', '#0284c7', 'makan, minum, warteg, kopi, bakso, ayam, sarapan, dinner, lunch, cafe, tuku, nasgor, indomaret, jajan', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(2, 1, 'cat-transport', 'Transport', 'expense', 'Car', '#0369a1', 'bensin, pertalite, pertamax, grab, gojek, goride, gocar, parkir, tol, kereta, mrt, tj, transjakarta, angkot', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(3, 1, 'cat-belanja', 'Belanja', 'expense', 'ShoppingBag', '#38bdf8', 'belanja, superindo, alfamart, indomaret, shopee, tokopedia, baju, celana, sepatu, beli, sabun, shampoo', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(4, 1, 'cat-tagihan', 'Tagihan', 'expense', 'FileText', '#6366f1', 'listrik, pln, air, pdam, wifi, indihome, biznet, pulsa, kuota, telkomsel, bpjs, netflix, spotify, iuran', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(5, 1, 'cat-hiburan', 'Hiburan', 'expense', 'Gamepad2', '#8b5cf6', 'bioskop, nonton, xxi, game, steam, jalan, liburan, karaoke, wisata', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(6, 1, 'cat-kesehatan', 'Kesehatan', 'expense', 'HeartPulse', '#f43f5e', 'obat, dokter, klinik, apotek, vitamin, paracetamol, panadol, sakit', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(7, 1, 'cat-pendidikan', 'Pendidikan', 'expense', 'GraduationCap', '#0ea5e9', 'buku, kursus, seminar, kuliah, spp, les, udemy', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(8, 1, 'cat-bisnis', 'Bisnis & Modal', 'expense', 'Briefcase', '#64748b', 'modal, stok, iklan, ads, domain, server, hosting', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(9, 1, 'cat-gaji', 'Gaji Pokok', 'income', 'WalletCards', '#10b981', 'gaji, gajian, salary, payroll, upah, kantor', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(10, 1, 'cat-bonus', 'Bonus & Proyek', 'income', 'Sparkles', '#06b6d4', 'bonus, proyek, project, freelance, sidejob, komisi, tips, fee', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(11, 1, 'cat-investasi', 'Investasi & Dividen', 'income', 'TrendingUp', '#3b82f6', 'dividen, profit, cuan, saham, reksadana, bunga, crypto', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(12, 1, 'cat-hadiah', 'Hadiah & Lainnya', 'income', 'Gift', '#ec4899', 'hadiah, dikasih, nemu, cashback, angpao, transferan', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00');

-- --------------------------------------------------------
-- 4. Table: transactions (Catatan Transaksi)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_name` varchar(100) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `type` enum('expense','income') NOT NULL,
  `note` text DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `source` enum('whatsapp','manual','telegram') NOT NULL DEFAULT 'whatsapp',
  `tags` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `transactions_user_id_foreign` (`user_id`),
  KEY `transactions_wallet_id_foreign` (`wallet_id`),
  KEY `transactions_category_id_foreign` (`category_id`),
  CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE SET NULL,
  CONSTRAINT `transactions_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Transactions
INSERT INTO `transactions` (`id`, `user_id`, `wallet_id`, `category_id`, `category_name`, `amount`, `type`, `note`, `transaction_date`, `timestamp`, `source`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'Makanan & Minuman', 32000.00, 'expense', 'Makan siang ayam geprek Bu Kris + es teh', '2026-11-04', 1793798400000, 'whatsapp', '2026-11-04 12:30:00', '2026-11-04 12:30:00'),
(2, 1, 1, 1, 'Makanan & Minuman', 24000.00, 'expense', 'Kopi susu tetangga Tuku', '2026-11-04', 1793791200000, 'whatsapp', '2026-11-04 10:15:00', '2026-11-04 10:15:00'),
(3, 1, 4, 2, 'Transport', 50000.00, 'expense', 'Isi bensin Pertamax motor', '2026-11-03', 1793730000000, 'whatsapp', '2026-11-03 17:00:00', '2026-11-03 17:00:00'),
(4, 1, 2, 9, 'Gaji Pokok', 14500000.00, 'income', 'Gaji bulanan PT Solusi Digital', '2026-11-01', 1793520000000, 'manual', '2026-11-01 09:00:00', '2026-11-01 09:00:00'),
(5, 1, 2, 4, 'Tagihan', 350000.00, 'expense', 'Token listrik PLN 500rb', '2026-11-01', 1793530800000, 'whatsapp', '2026-11-01 11:30:00', '2026-11-01 11:30:00'),
(6, 1, 3, 10, 'Bonus & Proyek', 2500000.00, 'income', 'Pelunasan landing page klien', '2026-10-31', 1793444400000, 'manual', '2026-10-31 15:45:00', '2026-10-31 15:45:00'),
(7, 1, 2, 3, 'Belanja', 425000.00, 'expense', 'Belanja bulanan sembako Superindo', '2026-10-30', 1793358000000, 'manual', '2026-10-30 19:20:00', '2026-10-30 19:20:00'),
(8, 1, 4, 5, 'Hiburan', 110000.00, 'expense', 'Nonton bioskop XXI + popcorn', '2026-10-29', 1793271600000, 'whatsapp', '2026-10-29 20:30:00', '2026-10-29 20:30:00');

-- --------------------------------------------------------
-- 5. Table: debts (Hutang & Piutang)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `debts`;
CREATE TABLE `debts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `person` varchar(150) NOT NULL,
  `type` enum('piutang','hutang') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `due_date` date DEFAULT NULL,
  `note` text DEFAULT NULL,
  `status` enum('belum_lunas','lunas') NOT NULL DEFAULT 'belum_lunas',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `debts_user_id_foreign` (`user_id`),
  CONSTRAINT `debts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Debts
INSERT INTO `debts` (`id`, `user_id`, `person`, `type`, `amount`, `due_date`, `note`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Budi Santoso', 'piutang', 350000.00, '2026-11-15', 'Talangan beli tiket futsal & jersey', 'belum_lunas', '2026-10-28 00:00:00', '2026-11-24 00:00:00'),
(2, 1, 'Rian Pratama', 'piutang', 150000.00, '2026-11-10', 'Patungan makan seafood', 'belum_lunas', '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(3, 1, 'Dimas Kurnia', 'hutang', 250000.00, '2026-11-20', 'Pinjam bayar biaya servis laptop', 'belum_lunas', '2026-10-25 00:00:00', '2026-11-24 00:00:00');

-- --------------------------------------------------------
-- 6. Table: budgets (Anggaran Pengeluaran)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `budgets`;
CREATE TABLE `budgets` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_name` varchar(100) NOT NULL,
  `limit_amount` decimal(15,2) NOT NULL,
  `spent_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `period` enum('bulanan','mingguan') NOT NULL DEFAULT 'bulanan',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `budgets_user_id_foreign` (`user_id`),
  KEY `budgets_category_id_foreign` (`category_id`),
  CONSTRAINT `budgets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `budgets_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Budgets
INSERT INTO `budgets` (`id`, `user_id`, `category_id`, `category_name`, `limit_amount`, `spent_amount`, `period`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Makanan & Minuman', 2500000.00, 1250000.00, 'bulanan', '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(2, 1, 3, 'Belanja', 1500000.00, 425000.00, 'bulanan', '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(3, 1, 2, 'Transport', 800000.00, 280000.00, 'bulanan', '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(4, 1, 4, 'Tagihan', 700000.00, 550000.00, 'bulanan', '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(5, 1, 5, 'Hiburan', 500000.00, 310000.00, 'bulanan', '2026-11-01 00:00:00', '2026-11-24 00:00:00');

-- --------------------------------------------------------
-- 7. Table: reminders (Pengingat WhatsApp)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `reminders`;
CREATE TABLE `reminders` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `time` varchar(10) NOT NULL,
  `days` text DEFAULT NULL,
  `channel` enum('whatsapp','telegram') NOT NULL DEFAULT 'whatsapp',
  `type` enum('tagihan','catat_harian','laporan') NOT NULL DEFAULT 'catat_harian',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `reminders_user_id_foreign` (`user_id`),
  CONSTRAINT `reminders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Reminders
INSERT INTO `reminders` (`id`, `user_id`, `title`, `amount`, `time`, `days`, `channel`, `type`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Catat Pengeluaran Malam', NULL, '21:00', 'Sen,Sel,Rab,Kam,Jum,Sab,Min', 'whatsapp', 'catat_harian', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(2, 1, 'Bayar Tagihan Wi-Fi & Listrik', 550000.00, '09:00', '15 setiap bulan', 'whatsapp', 'tagihan', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00'),
(3, 1, 'Laporan Rekap Finansial Mingguan', NULL, '20:00', 'Min', 'whatsapp', 'laporan', 1, '2026-11-01 00:00:00', '2026-11-24 00:00:00');

-- --------------------------------------------------------
-- 8. Table: chat_messages (Percakapan Bot WhatsApp)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `chat_messages`;
CREATE TABLE `chat_messages` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `sender` enum('user','bot') NOT NULL,
  `message` text NOT NULL,
  `transaction_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chat_messages_user_id_foreign` (`user_id`),
  KEY `chat_messages_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `chat_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_messages_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Chat Messages
INSERT INTO `chat_messages` (`id`, `user_id`, `sender`, `message`, `transaction_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'user', 'Makan ayam geprek 32rb', 1, '2026-11-04 12:30:00', '2026-11-04 12:30:00'),
(2, 1, 'bot', 'Siap bos! Catatan tersimpan:\n- Kategori: Makanan & Minuman\n- Nominal: Rp 32.000\n- Dompet: Dompet Tunai', 1, '2026-11-04 12:30:02', '2026-11-04 12:30:02'),
(3, 1, 'user', 'Hutangin Budi 350rb buat jersey', NULL, '2026-11-04 13:00:00', '2026-11-04 13:00:00'),
(4, 1, 'bot', 'Berhasil dicatat ke Piutang!\n- Pihak: Budi Santoso\n- Nominal: Rp 350.000\n- Ket: Beli jersey', NULL, '2026-11-04 13:00:02', '2026-11-04 13:00:02');

-- --------------------------------------------------------
-- 9. Table: referrals (Program Afiliasi)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `referrals`;
CREATE TABLE `referrals` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `referrer_user_id` bigint(20) UNSIGNED NOT NULL,
  `referred_name` varchar(150) NOT NULL,
  `plan_chosen` varchar(100) NOT NULL DEFAULT 'Paket Starter',
  `commission_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `status` enum('valid','pending','free') NOT NULL DEFAULT 'pending',
  `join_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `referrals_referrer_user_id_foreign` (`referrer_user_id`),
  CONSTRAINT `referrals_referrer_user_id_foreign` FOREIGN KEY (`referrer_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Referrals
INSERT INTO `referrals` (`id`, `referrer_user_id`, `referred_name`, `plan_chosen`, `commission_amount`, `status`, `join_date`, `created_at`, `updated_at`) VALUES
(1, 1, 'Andi Saputra', 'Paket Pro (3 Bulan)', 25000.00, 'valid', '2026-11-03', '2026-11-03 10:00:00', '2026-11-03 10:00:00'),
(2, 1, 'Dewi Lestari', 'Paket Pro (1 Bulan)', 25000.00, 'valid', '2026-11-01', '2026-11-01 11:30:00', '2026-11-01 11:30:00'),
(3, 1, 'Reza Fauzi', 'Paket Starter', 25000.00, 'pending', '2026-10-29', '2026-10-29 14:15:00', '2026-10-29 14:15:00'),
(4, 1, 'Siti Nurhaliza', 'Pendaftaran Akun Baru', 0.00, 'free', '2026-10-28', '2026-10-28 09:00:00', '2026-10-28 09:00:00');

-- --------------------------------------------------------
-- 10. Table: personal_access_tokens (Laravel Sanctum)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL UNIQUE,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
