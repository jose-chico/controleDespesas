// Seleciona elementos
const form = document.getElementById("form-transacao");
const tipoInput = document.getElementById("tipo");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const dataInput = document.getElementById("data");
const listaTransacoes = document.getElementById("lista-transacoes");

const totalEntradas = document.getElementById("total-entradas");
const totalSaidas = document.getElementById("total-saidas");
const saldoFinal = document.getElementById("saldo-final");

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

// Atualiza a interface
function atualizarResumo() {
  let entradas = 0;
  let saidas = 0;

  transacoes.forEach(transacao => {
    if (transacao.tipo === "entrada") {
      entradas += transacao.valor;
    } else {
      saidas += transacao.valor;
    }
  });

  totalEntradas.textContent = formatarMoeda(entradas);
  totalSaidas.textContent = formatarMoeda(saidas);
  saldoFinal.textContent = formatarMoeda(entradas - saidas);
}

// Adiciona nova transação
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const tipo = tipoInput.value;
  const descricao = descricaoInput.value;
  const valor = parseFloat(valorInput.value);
  const data = dataInput.value;

  if (!tipo || !descricao || !valor || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  const novaTransacao = {
    id: Date.now(),
    tipo,
    descricao,
    valor,
    data,
  };

  transacoes.push(novaTransacao);
  salvar();
  limparFormulario();
  renderizarTransacoes();
  atualizarResumo();
});

// Renderiza todas as transações
function renderizarTransacoes() {
  listaTransacoes.innerHTML = "";

  transacoes.forEach(transacao => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="tipo-${transacao.tipo}">${transacao.tipo === "entrada" ? "Entrada" : "Saída"}</td>
      <td>${transacao.descricao}</td>
      <td>${formatarMoeda(transacao.valor)}</td>
      <td>${formatarData(transacao.data)}</td>
      <td><button class="excluir" onclick="removerTransacao(${transacao.id})">Excluir</button></td>
    `;

    listaTransacoes.appendChild(tr);
  });
}

// Remove uma transação
function removerTransacao(id) {
  transacoes = transacoes.filter(transacao => transacao.id !== id);
  salvar();
  renderizarTransacoes();
  atualizarResumo();
}

// Formata valor como moeda
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Formata data
function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Salva no localStorage
function salvar() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

// Limpa o formulário
function limparFormulario() {
  tipoInput.value = "";
  descricaoInput.value = "";
  valorInput.value = "";
  dataInput.value = "";
}

function filtrarTransacoes(tipo) {
    let transacoesFiltradas = [];
  
    if (tipo === "todas") {
      transacoesFiltradas = transacoes;
    } else {
      transacoesFiltradas = transacoes.filter(t => t.tipo === tipo);
    }
  
    listaTransacoes.innerHTML = "";
  
    transacoesFiltradas.forEach(transacao => {
      const tr = document.createElement("tr");
  
      tr.innerHTML = `
        <td class="tipo-${transacao.tipo}">${transacao.tipo === "entrada" ? "Entrada" : "Saída"}</td>
        <td>${transacao.descricao}</td>
        <td>${formatarMoeda(transacao.valor)}</td>
        <td>${formatarData(transacao.data)}</td>
        <td><button class="excluir" onclick="removerTransacao(${transacao.id})">Excluir</button></td>
      `;
  
      listaTransacoes.appendChild(tr);
    });
  }
  
  

// Inicializa
renderizarTransacoes();
atualizarResumo();
