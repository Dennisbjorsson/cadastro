import {  CadastroUsuario } from "./classes.js";
import { validarUsuario, criarElementoUsuario } from "./utils.js";

const API_URL = "https://68935e51c49d24bce86a8c7d.mockapi.io/api/v1/usuario";
const cadastro = new CadastroUsuario(API_URL);

const { nomeInput, emailInput, addButton, lista, totalDeUsuarios } = (() => {
  const nomeInput = document.querySelector("#nome");
  const emailInput = document.querySelector("#email");
  const addButton = document.querySelector("#add");
  const lista = document.querySelector("#cadastroUsuario");

  const totalDeUsuarios = document.createElement("p");
  document.querySelector("main").appendChild(totalDeUsuarios);

  return { nomeInput, emailInput, addButton, lista, totalDeUsuarios };
})();

function renderizarLista() {
  lista.innerHTML = "";
  cadastro.usuarios
    .map(usuario => criarElementoUsuario(usuario, removerUsuarios))
    .forEach(item => lista.appendChild(item));
}

function atualizarTotalUsuarios() {
  totalDeUsuarios.textContent = `Total de usuários: ${cadastro.calcularTotalUsuarios()}`;
}

async function removerUsuarios(id, item) {
  await cadastro.removerUsuario(id)
    ? (item.remove(), atualizarTotalUsuarios())
    : alert("Erro ao remover o usuário");
}

addButton.addEventListener("click", async () => {
  const [nome, email] = [nomeInput.value.trim(), emailInput.value.trim()];

  if (!validarUsuario(nome, email)) {
    alert("Digite os campos corretamente!");
    return;
  }

  await cadastro.adicionarUsuario(nome, email);

  const novoUsuario = cadastro.usuarios.at(-1);
  lista.appendChild(criarElementoUsuario(novoUsuario, removerUsuarios));
  atualizarTotalUsuarios();

  nomeInput.value = "";
  emailInput.value = "";
});

(async () => {
  await cadastro.carregarUsuarios();
  renderizarLista();
  atualizarTotalUsuarios();
})();







 







    

    
