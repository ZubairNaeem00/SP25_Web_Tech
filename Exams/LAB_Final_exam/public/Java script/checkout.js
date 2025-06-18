document.getElementById('submit_btn').addEventListener('click', function(e) {
  e.preventDefault();

  document.querySelectorAll('.error').forEach(el => el.textContent = "");

  let valid = true;

  const email = document.getElementById('email').value.trim();
  const firstname = document.getElementById('firstname').value.trim();
  const phone = document.getElementById('Phone').value.trim();
  const card = document.getElementById('cardnumber').value.trim();
  const cvv = document.getElementById('sec_code').value.trim();

  if (!email.includes('@')) {
    document.getElementById('emailError').textContent = "Enter a valid email";
    valid = false;
  }

  if (firstname === "") {
    document.getElementById('firstnameError').textContent = "First name is required";
    valid = false;
  }

  if (phone.length < 10) {
    document.getElementById('phoneError').textContent = "Phone must be 10 digits";
    valid = false;
  }

  if (card.length < 13) {
    document.getElementById('cardError').textContent = "Invalid card number";
    valid = false;
  }

  if (cvv.length < 3) {
    document.getElementById('cvvError').textContent = "Invalid CVV";
    valid = false;
  }

  if (valid) {
    document.querySelector('form').submit();
  }
});

