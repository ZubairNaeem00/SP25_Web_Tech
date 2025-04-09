let m_open = false;

function openmenu() {
    const mm1 = document.querySelector("#mm1");
    const mm2 = document.querySelector("#mm2");
    const mm3 = document.querySelector("#mm3");
    const mm4 = document.querySelector("#mm4");
    const megaMenu = document.querySelector(".Mega-Menu");

    if (!m_open) {
        megaMenu.style.display = "block";
        megaMenu.style.padding = "50px 150px";
        mm1.innerHTML = `
            <h2 class="m_title ">Assignment 01: CV</h2>
            <p class="m_desc">Create a CV using HTML and CSS.</p>
            <a class="link_m" target="_blank" href="../Assignments/Assignment_1/Web_CV.html">View More-></a>
            <hr>
        `;
    } else {
        mm1.innerHTML = "";
        megaMenu.style.display = "none";
    }

    if (!m_open) {
        megaMenu.style.display = "block";
        mm2.innerHTML = `
            <h2 class="m_title">Assignment 02: E-Commerce Landing Page</h2>
            <p class="m_desc">Build a landing page with product showcase.</p>
            <a class="link_m" target="_blank" href="../Assignments/Assignment_2/Albam.html">View More-></a>
            <hr>
        `;
    } else {
        mm2.innerHTML = "";
        megaMenu.style.display = "none";
    }

    if (!m_open) {
        megaMenu.style.display = "block";
        mm3.innerHTML = `
            <h2 class="m_title">Lab Task 1: Landing Page with Bootstrap</h2>
            <p class="m_desc">Add responsiveness and UI plugins.</p>
            <a class="link_m" target="_blank" href="../Lab_Tasks/Lab_Task_1/index.html">View More-></a>
            <hr>
        `;
    } else {
        mm3.innerHTML = "";
        megaMenu.style.display = "none";
    }

    if (!m_open) {
        megaMenu.style.display = "block";
        mm4.innerHTML = `
            <h2 class="m_title">Lab Task 2: Checkout Page</h2>
            <p class="m_desc">Form validation with JS for a checkout experience.</p>
            <a class="link_m" target="_blank" href="../Lab_Tasks/Lab_Task_1/Checkout_form.html">View More-></a>
            
        `;
    } else {
        mm4.innerHTML = "";
        megaMenu.style.display = "none";
    }
    m_open = !m_open;
}

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector("#mega_button");
    btn.addEventListener("click", openmenu);
});
