const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const uploadStatus = document.getElementById('upload-status');

uploadButton.addEventListener('click', (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  // Kode untuk mengupload file ke server atau API
  // Contoh menggunakan fetch API
  fetch('/upload', {
    method: 'POST',
    body: file,
  })
    .then((response) => response.json())
    .then((data) => {
      uploadStatus.textContent = 'Upload berhasil!';
    })
    .catch((error) => {
      uploadStatus.textContent = 'Upload gagal!';
    });
});
