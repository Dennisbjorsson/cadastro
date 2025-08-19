export class Usuario {
  constructor(nome, email, id) {
    this.nome = nome;
    this.email = email;
    if (id !== undefined) this.id = id;
  }
}

export class CadastroUsuario {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.usuarios = [];
  }

  // Carregar usuários
  async carregarUsuarios() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) throw new Error("Erro ao carregar usuários");
    this.usuarios = await response.json();
    return this.usuarios;
  }

  // Adicionar usuário
  async adicionarUsuario(...dados) {
    const [nome, email] = dados;
    const novoUsuario = new Usuario(nome, email);

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novoUsuario.nome, email: novoUsuario.email }),
    });

    if (!response.ok) throw new Error("Erro ao criar usuário");

    const criado = await response.json();
    this.usuarios = [...this.usuarios, criado];
    return criado;
  }

  // Remover usuário
  async removerUsuario(id) {
    const response = await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
    if (!response.ok) return false;

    this.usuarios = this.usuarios.filter(u => String(u.id) !== String(id));
    return true;
  }

  
  // Calcular total de usuarios
  calcularTotalUsuarios() {
  return this.usuarios.reduce((total, usuario) => total + 1, 0);
}
}

