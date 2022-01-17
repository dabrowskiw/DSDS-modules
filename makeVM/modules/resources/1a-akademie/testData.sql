INSERT INTO `course_materials` (`id`, `created_at`, `updated_at`, `name`, `path`, `download_count`, `course_id`) VALUES
(1, '2021-11-22 09:52:50', '2021-11-22 12:04:34', 'taste', './taste.txt', 9, 1),
(2, '2021-11-22 10:39:53', '2021-11-23 14:31:20', 'Willkommen im Kurs!', './willkommen.txt', 12, 1),
(3, '2021-11-23 14:26:43', '2021-11-23 14:28:45', 'Bourdalat', './Bourdalat.txt', 5, 1);

INSERT INTO `course_registrations` (`id`, `user_id`, `course_id`, `created_at`, `updated_at`) VALUES
(2, 1, 1, '2021-11-01 15:56:31', '2021-11-01 15:56:31');

INSERT INTO `courses` (`id`, `name`, `price`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Testkurs', 1.99, 'Testbeschreibung bla bla', '2021-11-01 15:36:29', '2021-11-01 15:36:29');

INSERT INTO `payment_data` (`id`, `user_id`, `card_name`, `card_number`, `cvc`, `expiration_date`, `created_at`, `updated_at`) VALUES
(1, 1, 'Max Mustermann', '0000-0000-0000-000', 123, '23/1', '2021-11-01 16:14:06', '2021-11-01 16:14:06');

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@example.com', NULL, '$2y$10$Rp77KsF0gJln3Jq/WTk8N.LlKTvb/tANnTfe4qrZUQ7RsCl4i8O4y', NULL, '2021-11-01 15:19:51', '2021-11-01 15:19:51');
