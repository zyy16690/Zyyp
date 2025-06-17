const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const uploadButton = document.getElementById('upload-button');

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const imageDataURL = reader.result;
    imagePreview.innerHTML = `<img src="${imageDataURL}" width="200" height="200" />`;
  };
  reader.readAsDataURL(file);
});

uploadButton.addEventListener('click', () => {
  const file = imageInput.files[0];
  // Kode untuk mengupload file ke server atau API
  // Contoh menggunakan fetch API
  fetch('/upload', {
    method: 'POST',
    body: file,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Upload berhasil!');
    })
    .catch((error) => {
      console.error('Upload gagal!');
    });
});
