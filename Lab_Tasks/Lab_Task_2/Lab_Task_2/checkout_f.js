const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const creditCardInput = document.getElementById("credit_num");
const expiryDateInput = document.getElementById("expiry_date");
const cvvInput = document.getElementById("cvv_code");

const nameErr = document.getElementById("name-error");
const emailErr = document.getElementById("email-error");
const phoneErr = document.getElementById("phone-error");
const addressErr = document.getElementById("address-error");
const creditErr = document.getElementById("credit-error");
const expiryErr = document.getElementById("expiry-error");
const cvvErr = document.getElementById("cvv-error");

function validateName() {
    nameErr.textContent = "";
    if ( !/^[A-Za-z\s]+$/.test(nameInput.value)) {
        nameErr.textContent = "Please enter a valid name (alphabets only).";
        return false;
    }
    return true;
}

function validateEmail() {
    emailErr.textContent = "";
    if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
        emailErr.textContent = "Please enter a valid email.";
        return false;
    }
    
    return true;
}

function validateCreditCard() {
    creditErr.textContent = "";
    if (!/^\d{16}$/.test(creditCardInput.value.trim())) {
        creditErr.textContent = "Enter a valid 16-digit credit card number.";
        return false;
    }
    return true;
}

function validateExpiryDate() {
    expiryErr.textContent = "";
    const today = new Date();
    const selectedDate = new Date(expiryDateInput.value + "-01"); 

    if ( selectedDate <= today) {
        expiryErr.textContent = "Enter a valid future expiration date.";
        return false;
    }
    return true;
}

function validateCVV() {
    cvvErr.textContent = "";
    if (!/^\d{3}$/.test(cvvInput.value.trim())) {
        cvvErr.textContent = "Enter a valid 3-digit CVV.";
        return false;
    }
    return true;
}

function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    if (!validateName()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validateCreditCard()) isValid = false;
    if (!validateExpiryDate()) isValid = false;
    if (!validateCVV()) isValid = false;



    if (isValid) {
        alert("Form has been submitted successfully!");
        document.querySelector("form").reset(); 
    }
}
document.querySelector("form").addEventListener("submit", validateForm);


// function validateForm(event) {
//     event.preventDefault(); 

//     let isValid = true;

//     const name = document.getElementById("username").value.trim();
//     const nameErr = document.getElementById("name-error");
//     nameErr.textContent = "";
//     if (name === "" || !/^[A-Za-z\s]+$/.test(name)) {
//         nameErr.textContent = "Please enter a valid name (alphabets only).";
//         isValid = false;
//     }
