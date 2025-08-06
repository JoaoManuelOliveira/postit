var criados = 0;
var minizados = 0;
var ativos = 0;

document.addEventListener("DOMContentLoaded", function() {
    var jbutton = document.getElementsByClassName("JButton")[0];
    jbutton.addEventListener("click", criarPostit);
});

function atualizarContadores() {
    document.getElementById('total').innerText = criados;
    document.getElementById('ativos').innerText = ativos;
    document.getElementById('minimizados').innerText = minizados;
}

function obterDataHoraAtual() {
    const agora = new Date();
    return agora.toLocaleString('pt-BR', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false 
    });
}

function criarPostit() {
    criados++;
    ativos++; 

    const dataHoraCriacao = obterDataHoraAtual();
    const postit = document.createElement('div');
    postit.className = 'postit';

    postit.innerHTML = `
        <button class="close-btn" onclick="removerPostit(this)">X</button>
        <button class="minimize-btn" onclick="minimizarPostit(this)">_</button>
        <button class="view-btn" onclick="visualizarPostit(this)">Visualizar</button> <!-- Botão de visualização -->
        <p>Post-it ${criados}</p>
        <p class="data-hora">${dataHoraCriacao}</p> <!-- Data e hora de criação -->
        <textarea placeholder="Escreva aqui..." maxlength="97"></textarea>
        <p id="charCount">Caracteres restantes: 97</p>
    `;

    document.getElementById('postitContainer').appendChild(postit);

    const textarea = postit.querySelector('textarea');
    const charCount = postit.querySelector('#charCount');

    textarea.addEventListener('input', function() {
        const remaining = 97 - textarea.value.length;
        charCount.innerText = `Caracteres restantes: ${remaining}`;

        if (remaining <= 0) {
            charCount.style.color = "red";
        } else {
            charCount.style.color = "white"; 
        }
    });

    atualizarContadores();
}

function removerPostit(button) {
    const postit = button.parentElement;
    const confirmDelete = confirm("Você tem certeza que deseja excluir este Post-it?");
    
    if (confirmDelete) {
        postit.remove(); 
        ativos--; 
        criados--; 
        atualizarContadores();
    }
}

function minimizarPostit(button) {
    const postit = button.parentElement;
    const textarea = postit.querySelector('textarea');
    const p = postit.querySelector('p');

    const conteudoPostit = textarea.value;

    textarea.style.display = "none"; 
    p.style.display = "none"; 

    postit.remove();
    minizados++; 
    ativos--; 

    const minimizedPostit = document.createElement('div');
    minimizedPostit.className = 'minimized-postit';
    minimizedPostit.innerText = `Post-it ${criados}`;
    
   
    minimizedPostit.onclick = function() {
        restaurarPostit(conteudoPostit); 
        minimizedPostit.remove();
        minizados--; 
        ativos++;
        atualizarContadores();
    };

    document.getElementById('minimizedContainer').appendChild(minimizedPostit);

    atualizarContadores();
}

function restaurarPostit(conteudo) {
    const postitContainer = document.getElementById('postitContainer');

    const postit = document.createElement('div');
    postit.className = 'postit';
    
    const dataHoraCriacao = obterDataHoraAtual();

    postit.innerHTML = `
        <button class="close-btn" onclick="removerPostit(this)">X</button>
        <button class="minimize-btn" onclick="minimizarPostit(this)">_</button>
        <button class="view-btn" onclick="visualizarPostit(this)">Visualizar</button> <!-- Botão de visualização -->
        <p>Post-it ${criados}</p>
        <p class="data-hora">${dataHoraCriacao}</p> <!-- Data e hora de criação -->
        <textarea placeholder="Escreva aqui..." maxlength="97">${conteudo}</textarea> <!-- Preenche com o conteúdo armazenado -->
        <p id="charCount">Caracteres restantes: ${97 - conteudo.length}</p>
    `;

    const textarea = postit.querySelector('textarea');
    const charCount = postit.querySelector('#charCount');

    textarea.addEventListener('input', function() {
        const remaining = 97 - textarea.value.length;
        charCount.innerText = `Caracteres restantes: ${remaining}`;

        if (remaining <= 0) {
            charCount.style.color = "red";
        } else {
            charCount.style.color = "white";
        }
    });

    postitContainer.appendChild(postit);

    atualizarContadores();
}

function visualizarPostit(button) {
    const postit = button.parentElement;
    const conteudo = postit.querySelector('textarea').value;
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modalText');
    modalText.innerText = conteudo;

    modal.style.display = "block";
   
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}