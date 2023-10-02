let progress = document.getElementById('progress');

function upload(file) {
    var xhr = new XMLHttpRequest();
  
    xhr.upload.onprogress = function(event) {
    progress.value = event.loaded/event.total;
    }

    xhr.onerror = () => {
      alert('Ошибка сервера.')
    };
    
    xhr.open("POST", document.forms.form.action);
    xhr.send(file);
  }

document.forms.form.addEventListener('submit', (e) => {
  e.preventDefault();
  upload(document.forms.form.file.files[0]);
});