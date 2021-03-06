### Express Cronjob Dynamic API KEY

**Berikut** ini adalah cara simple implementasi untuk memberikan **Extra Protection** pada sebuah **Route API** dengan menggunakan **API KEY**, cara ini hampir sama seperti kita memberikan **JWT Middleware** pada setiap **Route API** yang kita miliki, perbendaannya dengan **JWT Middleware** cara ini tidak harus menyimpan data apapun kedalam **Token**, dikarenakan ini hanya berupa **Token** biasa seperti layaknya **API KEY** pada umumnya, **Token** tersebut akan diperbarui didalam **database** secara otomatis selama kurun waktu **24 jam** sekali, jika anda ingin menggunakan cara ini untuk memberikan **Extra Protection** pada setiap **Route API** yang anda miliki, anda bisa menyimpan **Token** tersebut kedalam **.env file**.

#### Cara Menjalankan Aplikasi

**Install module** terlebih dahulu sesuai dengan apa yang tertera di `package.json`, kemudian buka **terminal** dan silahkan ketikan `npm install` atau `yarn add`, setelah selesai menginstall **module** tersebut lalu silahkan jalankan dengan cara mengetikan `npm start` atau `yarn start` pada **terminal**.

#### Endpoit Routes:

| Nama | Route Name | Request Method |
| -----| -----------| ---------------|
|  **Mhs Create** | http://localhost:3000/api/create/mhs?key=a1xxx | **POST**
|  Mhs Results | http://localhost:3000/api/results/mhs?key=a1xxx | GET
|  Mhs Result  | http://localhost:3000/api/result/mhs/:id?key=a1xxx | GET
|  Mhs Delete  | http://localhost:3000/api/delete/mhs/:id?key=a1xxx | DELETE
|  Mhs Update | http://localhost:3000/api/update/mhs/:id?key=a1xxx | PUT
|  **Key Create** | http://localhost:3000/api/key | **GET**