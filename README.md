# Realtime-Chat
Adalah sebuah web chat-application sederhana dan realtime. Disamping itu realtime-chat ini sudah menggunakan database untuk penyimpanan message, room chat dan name user.


# Local Deploy
  - Clone repository https://github.com/ahmad-akbar/Realtime-Chat.git

### SERVER
  - Masuk ke folder Server > cd server
  - Install dependency > NPM i
  - Masuk ke folder config kemudian ubah data di environment Development menjadi
    {
      "username": "_MASUKKAN USERNAME ANDA_", 

      "password": "_MASUKKAN PASSWORD ANDA_",
      "database": "_MASUKKAN NAMA YANG ANDA INGINKAN_",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  - Create database menggunakan ORM sequelize > sequelize db:create
  - Jalankankan migrationnya > sequelize db:migrate
  - Jalankan Node app.js

### CLIENT
  - Masuk ke folder client > cd clinet
  - Install dependency > NPM i
  - Jalankan NPM START
