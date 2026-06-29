document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DO MENU MOBILE (RESPONSIVIDADE)
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        // Muda o ícone de barras para fechar (X)
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Fecha o menu móvel ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    /* ==========================================================================
       2. MODO CLARO / MODO ESCURO NATIVO
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Verifica se o usuário já visitou e definiu uma preferência de tema antes
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    /* ==========================================================================
       3. SISTEMA DE PESQUISA AVANÇADO E FILTRAGEM DE LOOKS
       ========================================================================== */
    const searchInput = document.getElementById('searchInput');
    const lookCards = document.querySelectorAll('.look-card');
    const noResultsMsg = document.getElementById('noResults');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let matchCount = 0;

        lookCards.forEach(card => {
            // Coleta os atributos de dados e o texto interno do título do card
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('.look-desc').textContent.toLowerCase();
            const marca = card.getAttribute('data-marca').toLowerCase();
            const cor = card.getAttribute('data-cor').toLowerCase();
            const ocasiao = card.getAttribute('data-ocasiao').toLowerCase();

            // Verifica se o termo pesquisado bate com qualquer metadado do card
            if (title.includes(searchTerm) || 
                desc.includes(searchTerm) || 
                marca.includes(searchTerm) || 
                cor.includes(searchTerm) || 
                ocasiao.includes(searchTerm)) {
                
                card.style.display = 'flex';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Exibe ou oculta a mensagem de erro elegante caso nenhum card corresponda
        if (matchCount === 0 && searchTerm !== "") {
            noResultsMsg.classList.remove('hidden');
        } else {
            noResultsMsg.classList.add('hidden');
        }
    });

    /* ==========================================================================
       4. BOTÃO VOLTAR AO TOPO & HEADER COMPACTO
       ========================================================================== */
    const backToTopBtn = document.getElementById('backToTop');
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        // Exibe o botão de voltar ao topo se rolar mais de 400px
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Estilização extra no Header ao rolar a página (Efeito flutuante compacto)
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
            header.querySelector('.header-container').style.height = '65px';
        } else {
            header.style.boxShadow = 'none';
            header.querySelector('.header-container').style.height = '80px';
        }

        // Script simples para atualizar a classe ativa no menu baseado na rolagem
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================================================
       5. ANIMAÇÃO SUAVE DE ROLAGEM (REVEAL ANIMATION COM INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Deixa de observar o elemento uma vez animado para poupar processamento
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Elemento engaja a animação quando 10% dele entra em tela
        rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes para suavizar visualmente
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
