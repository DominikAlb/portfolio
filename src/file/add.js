function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const status = document.getElementById('status');

    if (fileInput.files.length === 0) {
        status.textContent = 'no file selected!';
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('upload_endpoint_url', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            status.textContent = "image upladed successfully";
        } else {
            status.textContent = "upload failed!";
        }
    })
    .catch(error => {
        console.error('error upload image:', error);
        status.textContent = 'Upload failed!';
    });

}

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const showImageBtn = document.getElementById('showImageBtn');
    const imageContainer = document.getElementById('imageContainer');
  
    showImageBtn.addEventListener('click', () => {
      imageContainer.classList.toggle('hidden');
    });
  
    let isDragging = false;
    let offsetX, offsetY;
  
    imageContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - imageContainer.offsetLeft;
      offsetY = e.clientY - imageContainer.offsetTop;
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        imageContainer.style.left = `${e.clientX - offsetX}px`;
        imageContainer.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  });