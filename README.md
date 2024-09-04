# README

langkah-langkah

1. update semua undangan yg ada pada `PATH\TO\Py\SCRIPT\resdip\generatorqr\daftar-undangan.xlsx`
2. jalankan generator create undangan `generate-undangan-dari-excel.py`
3. hasil pdf dan qr code akan ada pada `PATH\TO\Py\SCRIPT\resdip\generatorqr\output_docs`
4. hasil excel akan ada pada `PATH\TO\Py\SCRIPT\resdip\generatorqr\undangan-updated.xlsx` copy ke event.ambassade-indonesie.fr
pada path `\home\komunikasi\www\event\data-seeder\undangan-updated.xlsx
5. seed undangan-updated.xlsx pada aplikasi event.ambassade-indonesie.fr
6. ssh ke event.ambassade-indonesie.fr menggunakan akun komunikasi
7. cd www\event
8. jalankan seeder `pnpm prisma db seed`
9. cek hasilnya