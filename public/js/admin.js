


// const loadFile = (event) => {
//     let img = document.getElementById('image');
//     let output = document.getElementById('output');
//     output.src = URL.createObjectURL(event.target.files[0]);
//     output.onload = function () {
//       URL.revokeObjectURL(output.src);
//     };
//   };


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
