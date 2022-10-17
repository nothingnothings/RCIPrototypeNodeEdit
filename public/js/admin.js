$('#file-1').pekeUpload();
$('#file-2').pekeUpload();
$('#file-3').pekeUpload();
$('#file-4').pekeUpload();


function sendForm(payload) {
  fetch('https://rciexemplo.herokuapp.com/admin/banner-edit', {
    method: 'POST',
    body: payload,
  })
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

var formList = document.querySelectorAll('.needs-validation');

for (form of formList) {
  form.addEventListener('submit', function (event) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');
    const formData = new FormData(form);
    const payload = new URLSearchParams(formData);

    sendForm(payload);
  });
}
