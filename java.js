const cepInput = document.getElementById("cep");
const form = document.getElementById("formCadastro");

// 🔍 Buscar endereço pelo CEP
cepInput.addEventListener("blur", () => {
  const cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      document.getElementById("rua").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf;
    })
    .catch(() => alert("Erro ao buscar CEP"));
});

// 💾 Salvar no LocalStorage
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    cep: cepInput.value,
    rua: document.getElementById("rua").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value
  };

  localStorage.setItem("cadastro", JSON.stringify(dados));

  alert("Dados salvos!");
});

// 🔄 Restaurar dados ao carregar
window.addEventListener("load", () => {
  const dadosSalvos = localStorage.getItem("cadastro");

  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);

    document.getElementById("nome").value = dados.nome || "";
    cepInput.value = dados.cep || "";
    document.getElementById("rua").value = dados.rua || "";
    document.getElementById("bairro").value = dados.bairro || "";
    document.getElementById("cidade").value = dados.cidade || "";
    document.getElementById("estado").value = dados.estado || "";
  }
});