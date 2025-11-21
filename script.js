
let cardContainer = document.querySelector(".card-container"); 
let searchInput = document.querySelector('input[type="search"]');
let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase();

    if (termoBusca.trim() === "") {
        renderizarCards(dados); 
        return;
    }

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; 
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

carregarDados();

searchInput.addEventListener('input', iniciarBusca);
