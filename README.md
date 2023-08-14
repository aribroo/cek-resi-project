# cek-resi-project
Project pelacakan nomor resi yang memungkinkan pengguna untuk memeriksa status pengiriman suatu paket 

## Petunjuk penggunaan
##### Dapatkan API KEY pada halaman berikut
```bash
https://dashboard.binderbyte.com/
```
##### Jika sudah ada API KEY, input ke dalam file script.js
```javascript
try {
    const apiKey = ''; // ubah dengan apikey milik anda
    const apiUrl = `https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${courier}&awb=${noResi}`;
    const response = await fetch(apiUrl);

    const { data } = await response.json();

    if (data) showResult(data);
    else showErrorAlert('Nomor resi tidak ditemukan');
  } catch (e) {
    console.error('Error : ', e);
    showErrorAlert(e);
  }
});
```
##### Setelah itu running index.html
##### Selamat mencoba :)

