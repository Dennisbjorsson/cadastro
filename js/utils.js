// Validação de usuário
export const validarUsuario = (nome, email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return nome.trim() !== "" && emailRegex.test(email);
};

// Criar elemento visual para lista de usuários
export const criarElementoUsuario = (usuario, removerCallback) => {
    const item = document.createElement("li");
    item.textContent = `${usuario.nome} - ${usuario.email}`;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "❌";

    botaoRemover.addEventListener("click", () => removerCallback(usuario.id, item));

    item.appendChild(botaoRemover);
    return item;
};
