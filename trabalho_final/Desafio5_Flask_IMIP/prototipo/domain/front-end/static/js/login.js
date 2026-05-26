document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            const emailInput = document.querySelector('input[name="email"]');
            const senhaInput = document.querySelector('input[name="senha"]');
            
            if (emailInput && emailInput.value.trim() === "") {
                e.preventDefault();
                alert("Por favor, insira o seu e-mail.");
                emailInput.focus();
                return;
            }
            if (senhaInput && senhaInput.value === "") {
                e.preventDefault();
                alert("Por favor, insira a sua senha.");
                senhaInput.focus();
                return;
            }
        });
    }
});
