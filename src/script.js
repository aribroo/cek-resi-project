const searchButton = document.querySelector('#search-button');
const inputResi = document.querySelector('#tracking-number');
const contentContainer = document.querySelector('#content-container');

searchButton.addEventListener('click', async function () {
  const selectedRadioButton = document.querySelector('.btn-check:checked');

  const noResi = inputResi.value;
  let courier = '';

  if (selectedRadioButton) courier = selectedRadioButton.value;

  if (!noResi) return showErrorAlert('Masukan nomor resi terlebih dahulu');

  console.log(courier);
  try {
    const apiKey = 'INPUT YOUR API KEY HERE'; // ubah dengan apikey milik anda
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

function showResult(data) {
  const { detail, summary, history } = data;

  const resultHtml = `  
    <div class="container mt-4">
    <div class="card">
      <div class="card-header fs-5">Data Pengiriman Paket</div>
      <div class="card-body">
        <h5 class="card-title">Nomor Resi : <span class="fw-bold">${summary.awb}</span></h5>
        <p class="card-text">Status : <span class="fw-bold">${summary.status}</span></p>
        <p class="card-text">Expedisi : <span class="fw-bold">${summary.courier}</span></p>
        <p class="card-text">Metode pembayaran : <span class="fw-bold">${detail.shipper ? detail.shipper : ' - '}</span></p>

        
        <table id="table-result" class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody class="content-table">
           
          </tbody>
        </table>

        <ul class="list-group">
          <li class="list-group-item">Nama Penerima: <span class="fw-bold">${detail.receiver}</span></li>
          <li class="list-group-item">Alamat Penerima: <span class="fw-bold">${detail.destination}</span></li>
          <li class="list-group-item">Date : <span class="fw-bold">${summary.date}</li></span>
          <li class="list-group-item">Berat Paket: <span class="fw-bold">${summary.weight ? summary.weight : ' - '}</li></span>
        </ul>
      </div>
    </div>
  </div>`;

  contentContainer.innerHTML = resultHtml;
  showTablesResult(history);
}

function showTablesResult(history) {
  let tableRows = '';

  history.forEach((e, i) => {
    tableRows += `
          <tr>
            <th scope="row">${history.length - i}</th>
            <td>${e.date}</td>
            <td>${e.desc}</td>
        </tr>`;
  });

  const contentTable = document.querySelector('.content-table');
  contentTable.innerHTML = tableRows;
}

function showErrorAlert(msg) {
  let result = '';

  result += `
  <div class="alert alert-danger" role="alert">
    ${msg}
  </div>`;

  const error = document.querySelector('.error-alert');
  error.innerHTML = result;

  setTimeout(() => {
    error.innerHTML = '';
  }, 2000);
}
