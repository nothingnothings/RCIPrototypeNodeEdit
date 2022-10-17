function sendForm(payload) {
  fetch(
    'https://rciexemplo.herokuapp.com/login',
    {
      method: 'POST',
      body: payload,
    }
  )
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

var form = document.querySelector('.needs-validation');

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
