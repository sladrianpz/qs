window.addEventListener("scroll", function() {
    var header = document.querySelector('#header');
    header.classList.toggle('rolagem', window.scrollY > 50);
});

const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sDescricao = document.querySelector('#m-descricao');
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

function openModal(edit = false, index = 0) {
    modal.classList.add('active');

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active');
        }
    };

    if (edit) {
        sNome.value = itens[index].nome;
        sDescricao.value = itens[index].descricao;
        id = index;
    } else {
        sNome.value = '';
        sDescricao.value = '';
        id = undefined;
    }
}

function editItem(index) {
    openModal(true, index);
}

function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.descricao}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
    if (sNome.value == '' || sDescricao.value == '') {
        return;
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value;
        itens[id].descricao = sDescricao.value;
    } else {
        itens.push({'nome': sNome.value, 'descricao': sDescricao.value});
    }

    setItensBD();

    modal.classList.remove('active');
    loadItens();
    id = undefined;
};

function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();
