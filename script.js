// Botão modo escuro
const botao = document.getElementById("modoEscuro");

botao.onclick = () => {
    document.body.classList.toggle("dark");
};

// Pesquisa
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup", () => {

    const texto = pesquisa.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card=>{

        card.style.display =
        card.innerText.toLowerCase().includes(texto)
        ? "block"
        : "none";

    });

});
