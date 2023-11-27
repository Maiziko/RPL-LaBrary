# Labrary-LMS - README
Labrary adalah sebuah sistem manajemen perpustakaan yang merupakan pengembangan dari perpustakaan yang sebelumnya dilakukan secara konvensional atau luring. Seiring dengan perkembangan zaman, dalam lingkungan institusi pendidikan, jumlah mahasiswa cenderung meningkat. Kondisi ini mendorong kebutuhan akan sebuah sistem yang dapat dioperasikan dengan mudah untuk berbagai proses perpustakaan, seperti peminjaman buku, pengelolaan data anggota, dan pengelolaan koleksi buku. Hal ini bertujuan agar  lingkungan perpustakaan menjadi lebih mudah untuk mengakses buku yang dipinjam dan memungkinkan banyak orang untuk mengaksesnya secara efisien. Perangkat lunak yang diberi nama LaBrary-LMS memiliki tujuan untuk mengoptimasi sejumlah tugas dan proses yang terkait dengan perpustakaan, termasuk peminjaman buku dan pengelolaan koleksi buku.


## Set Up & Installation
- Clone repositori
"https://gitlab.informatika.org/k03_gg/tubes-rpl.git"
- Install dependencies untuk nodejs
npm i
- Buat virtual env Python
python -m venv env
- Aktifkan virtual env python
./env/Scripts/activate
- Install Python depedencies
pip3 install -r requirements.txt
- Jalankan aplikasi
npm run dev

## Branching
Setiap membuat branch baru harus ambil base dari `master` dengan penamaan branch mengikuti format berikut feature-use-case-<name>

## Pull Request and Commit Messages
Untuk melakukan commit message mengikuti format berikut, yaitu <type>: <message>

Setiap merge request harus di-review oleh minimal 1 anggota (selain yang membuat merge request) dari kelompok tersebut. Setelah melakukan code review, berikan comment ataupun like sebagai bukti.

## Use Case
### 1. Melihat koleksi buku
18221025 Regine Fidellia Hendyawan

Capture Screen:

![Melihat koleksi buku](/doc/koleksibuku.png)
![Melihat koleksi buku](/doc/koleksibukusidebar.png)

### 2. Melihat Detail Buku
18221025 Regine Fidellia Hendyawan

Capture Screen:

![Melihat Detail Buku](/doc/detailbuku.png)
![Melihat Detail Buku](/doc/detailbukusidebar.png)


### 3. Login
18221012 Harits Afiq Nugroho

Capture Screen:

![Login](/doc/login.png)


### 4. Melihat List Peminjaman
18221012 Harits Afiq Nugroho

Capture Screen:

![Melihat List Peminjaman](/doc/listpeminjaman.png)
![Melihat List Peminjaman](/doc/addbooklistpeminjaman.png)


### 5. Melihat Riwayat Peminjaman
18221008 Gyan Maiziko

Capture Screen:

![Melihat Riwayat Peminjaman](/doc/riwayatpeminjaman.png)

### 6. Meminjam Buku
18221008 Gyan Maiziko

Capture Screen:

![Meminjam Buku](/doc/meminjambukudetailbuku.png)
![Meminjam Buku](/doc/meminjambukulistpeminjaman.png)


## Database
### Tabel buku
| id  | judul                     | penulis          | penerbit       | tahun_terbit | stokbuku | status_ketersediaan | kategori      | cover_buku                                                                                                                                   | deskripsi                                                                                                                                                                                                                                                                                           |
|-----|---------------------------|------------------|----------------|--------------|----------|---------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 6   | The Odd 1S Out            | James Rallison   | Penguin Us     | 2018         | 0        | Tidak tersedia      | Komedi        | [Link cover buku](https://osfpydbfxqrkgaxwyywe.supabase.co/storage/v1/object/sign/coverbuku/1s%20out.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb3ZlcmJ1a3UvMXMgb3V0LmpwZyIsImlhdCI6MTcwMDkxNjMxNywiZXhwIjoxNzMyNDUyMzE3fQ.9FX9X__ml1Q7yvumyHtFh8_vwGOuy6PXbSbXdr0Es4c&t=2023-11-25T12%3A45%3A17.745Z) | For those of you who are looking for activities to fill your spare time, then reading this book can be one of the right references. This book is very suitable to be read when you are late because the story presented is very funny and interesting.                                           |
| 5   | Clover                    | NA HYERIM        | Baca           | 2023         | 0        | Tidak tersedia      | Fiksi         | [Link cover buku](https://osfpydbfxqrkgaxwyywe.supabase.co/storage/v1/object/sign/coverbuku/clover.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb3ZlcmJ1a3UvY2xvdmVyLmpwZyIsImlhdCI6MTcwMDkxNTc0NCwiZXhwIjoxNzMyNDUxNzQ0fQ.e6BlpW59PRmuiyWTnD9YDPgWq4glH8CRMF1IMNhiCA8&t=2023-11-25T12%3A35%3A44.460Z) | Bagaimana jika kau kedatangan seekor kucing yang bisa mengabulkan keinginanmu begitu saja? Apa hal yang paling ingin kau ubah dalam hidupmu?                                                                                                                                                        |
| 1   | The Lord of the Rings     | John Ronald       | Britania Raya  | 1954         | 2        | Tersedia            | Fiksi         | [Link cover buku](https://osfpydbfxqrkgaxwyywe.supabase.co/storage/v1/object/sign/coverbuku/lord%20of%20the%20rings.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb3ZlcmJ1a3UvbG9yZCBvZiB0aGUgcmluZ3MuanBnIiwiaWF0IjoxNzAwOTE0NjgxLCJleHAiOjE3MzI0NTA2ODF9.oJLZw2hwDZoTNJ6P3QgV6SIwSRHvIjK5O1XhnZX7yx0&t=2023-11-25T12%3A18%3A01.153Z) | Menyajikan epik yang menggambarkan Perang Besar Cincin, perjuangan antara yang baik dan yang jahat di Dunia Tengah, mengikuti pengembaraan Frodo si hobbit dan teman-temannya dalam upaya menghancurkan Cincin Kekuasaan.                                                                   |
| 14  | Bicara Itu Ada Seninya    | Oh Su Hyang      | Bhuana Ilmu    | 2021         | 3        | Tersedia            | Komedi        | [Link cover buku](https://osfpydbfxqrkgaxwyywe.supabase.co/storage/v1/object/sign/coverbuku/bicara%20ada%20seninya.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb3ZlcmJ1


### Tabel list_peminjaman
| id_buku | id                                   |
|---------|--------------------------------------|
| 3       | 69effe1b-2e4f-44bd-846b-b237c824b903 |
| 10      | 39a01e4b-7830-4214-9509-0f5e1749475c |
| 1       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff |
| 6       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff |


### Tabel riwayat_peminjaman
| id_peminjaman                         | id_buku | id                                   | tanggal_peminjaman | tanggal_pengembalian | status_peminjaman |
|--------------------------------------|---------|--------------------------------------|--------------------|----------------------|-------------------|
| ecd25600-5c1c-4629-8c41-6ff758eeb5d6 | 5       | 39a01e4b-7830-4214-9509-0f5e1749475c | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 6c54de84-ae1b-4a90-9b97-5e0f05eda0cc | 4       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 3ca40907-4b9a-46c9-8a0a-90975fb42423 | 1       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 7ed5fc9d-2919-4d40-adda-55b337a0dbce | 9       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| c827186d-666e-4d0e-a79a-74f22847de2c | 9       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 9c6518e5-b225-4ed2-9303-fad81e9cea3b | 9       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| aebceae5-e7c9-41af-a7e5-001ce01c07f3 | 12      | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 879c8a33-2734-49d8-87de-0f8fd915d8db | 7       | 69effe1b-2e4f-44bd-846b-b237c824b903 | 2023-11-26         | 2023-12-03           | Sedang dipinjam  |
| 621b5e27-8c6a-43aa-b78a-5fda76ea0446 | 5       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-26         | 2023-12-03           | Selesai           |
| f46ae7a8-c676-4c98-8a32-d7622de7eb41 | 6       | 69effe1b-2e4f-44bd-846b-b237c824b903 | 2023-11-26         | 2023-12-03           | Sedang dipinjam  |
| 90ce94f7-29da-4b94-9a8f-bba5a8d440f4 | 3       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 93d733ed-224d-4918-a498-6594d99b2fb5 | 1       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 06804066-3385-46b1-930c-9370cbd4ca3c | 6       | 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| 14814678-f060-46c2-a7e3-adfb73e6f070 | 8       | 69effe1b-2e4f-44bd-846b-b237c824b903 | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |
| a447020a-5923-4f68-b3cb-9e4fdf8eb1ef | 1       | 69effe1b-2e4f-44bd-846b-b237c824b903 | 2023-11-27         | 2023-12-04           | Sedang dipinjam  |


### Tabel profiles
| id                                   | updated_at                | username | full_name | avatar_url                                                                                                             | website | email              |
|--------------------------------------|---------------------------|----------|-----------|------------------------------------------------------------------------------------------------------------------------|---------|--------------------|
| 69cbbf32-bf6d-45e1-9e5d-ac2806f769ff |                           |          | Tes       |                                                                |         | tes@gmail.com     |
| 69effe1b-2e4f-44bd-846b-b237c824b903 |                           |          | John Doe | https://osfpydbfxqrkgaxwyywe.supabase.co/storage/v1/object/sign/avatars/JohnDoeBulat.png?token=eyJhbGciOiJI... |         | johndoe@gmail.com |
| 39a01e4b-7830-4214-9509-0f5e1749475c |                           |          | Alex Peter| https://osfpydbfxqrkgaxwyywe.supabase.co/storage/v1/object/sign/avatars/AlexPiterBulat.png?token=eyJhbGciOiJI... |         | alexpeter@gmail.com|

## Unit Testing
[Link sheets unit testing](https://docs.google.com/spreadsheets/d/1K_NMt87n-XKpScO6nslVwIShysNpEA_1eTPoIc5QC_g/edit?usp=sharing)

## Deployment
