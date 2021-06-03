$('form').on('submit', (e) => {
  e.preventDefault();

  const form = $('form')[0];

  const formData = new FormData(form);

  $().post('./server.php', formData)
    .then(res => {
      console.log(res);
    })
    .catch(() => {
      console.log('Fail');
    })
    .finally(() => {
      form.querySelector('input[type="email"]').value = '';
    });
});