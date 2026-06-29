console.log("Closet da Jade Magalhães carregado com sucesso! ✨");

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({
            behavior:"smooth"
        });
    });
});
