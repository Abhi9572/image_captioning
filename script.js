 /*script for image preview using  local device*/
 const input = document.querySelector('#image-input');
 const preview = document.querySelector('.image-preview');
 const deleteBtn = document.querySelector('#delete-btn');

 input.addEventListener('change', () => {
     const files = input.files;
     if (files.length > 0) {
         preview.innerHTML = '';
         for (let i = 0; i < files.length; i++) {
             const file = files[i];
             const reader = new FileReader();
             reader.addEventListener('load', () => {
                 const item = document.createElement('div');
                 item.classList.add('image-preview-item');
                 const img = document.createElement('img');
                 img.src = reader.result;
                 img.alt = 'Image preview';
                 img.addEventListener('load', () => {
                     const width = img.naturalWidth;
                     const height = img.naturalHeight;
                     if (width > height) {
                         img.style.width = '100%';
                         img.style.height = 'auto';
                     } else {
                         img.style.width = 'auto';
                         img.style.height = '100%';
                     }
                 });
                 item.appendChild(img);
                 preview.appendChild(item);
                 deleteBtn.removeAttribute('disabled');
             });
             reader.readAsDataURL(file);
         }
     } else {
         preview.innerHTML = '';
         deleteBtn.setAttribute('disabled', true);
     }
 });

 deleteBtn.addEventListener('click', () => {
     preview.innerHTML = '';
     input.value = '';
     deleteBtn.setAttribute('disabled', true);
 });

 /*script for image preview using device*/

 /* Script for image extract using url or image address */
 function retrieveImage() {
     const urlInput = document.getElementById('urlInput');
     const imageUrl = urlInput.value;

     // create a new image element
     const image = new Image();

     // set the image source to the input URL
     image.src = imageUrl;

     // add an onload event listener to the image
     image.onload = function() {
         // add the image to the image container
         const imageContainer = document.getElementById('imageContainer');
         imageContainer.innerHTML = '';
         imageContainer.appendChild(image);
     };
     
     // add an onerror event listener to handle image retrieval errors
     image.onerror = function() {
         alert('Unable to retrieve image from URL: ' + imageUrl);
     };
 }

 /* Script for image extract using url or image address */