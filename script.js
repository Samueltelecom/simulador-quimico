// Lista inicial de reações conhecidas
let reacoesConhecidas = [
  { reagente1: "hcl", reagente2: "naoh", produto: "NaCl + H₂O", tipo: "Neutralização Ácido-Base" },
  { reagente1: "ch4", reagente2: "o2", produto: "CO₂ + H₂O", tipo: "Combustão" },
  { reagente1: "fe", reagente2: "cuso4", produto: "FeSO₄ + Cu", tipo: "Deslocamento Simples" },
  { reagente1: "caco3", reagente2: "→", produto: "CaO + CO₂", tipo: "Decomposição Térmica" },
  { reagente1: "na", reagente2: "cl2", produto: "NaCl", tipo: "Síntese" },
  { reagente1: "agno3", reagente2: "nacl", produto: "AgCl + NaNO₃", tipo: "Dupla Troca" }
];

// Função para normalizar texto (remove espaços, acentos, deixa minúsculo)
function normalizar(texto) {
  return texto.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Simula uma reação com base nos reagentes informados
function simularReacao() {
  const r1 = normalizar(document.getElementById('reagente1').value);
  const r2 = normalizar(document.getElementById('reagente2').value);

  let produto = `${r1} + ${r2} → Produto Simulado`;
  let tipo = "Desconhecida";

  for (let reacao of reacoesConhecidas) {
    if (
      (reacao.reagente1 === r1 && reacao.reagente2 === r2) ||
      (reacao.reagente1 === r2 && reacao.reagente2 === r1)
    ) {
      produto = `${reacao.reagente1.toUpperCase()} + ${reacao.reagente2.toUpperCase()} → ${reacao.produto}`;
      tipo = reacao.tipo;
      break;
    }
  }

  const resultado = `${produto} [${tipo}]`;
  document.getElementById('resultado').innerText = resultado;
  salvarHistorico(resultado);
  mostrarHistorico();
}

// Cadastra uma nova reação na lista
function cadastrarReacao() {
  const r1 = normalizar(document.getElementById('novoR1').value);
  const r2 = normalizar(document.getElementById('novoR2').value);
  const produto = document.getElementById('novoProduto').value;
  const tipo = document.getElementById('novoTipo').value;

  if (r1 && r2 && produto && tipo) {
    reacoesConhecidas.push({ reagente1: r1, reagente2: r2, produto, tipo });
    document.getElementById('cadastroMsg').innerText = "✅ Reação cadastrada com sucesso!";
    mostrarTabelaReacoes(); // Atualiza a tabela
  } else {
    document.getElementById('cadastroMsg').innerText = "⚠️ Preencha todos os campos.";
  }
}

// Salva a reação no histórico (máximo de 5)
function salvarHistorico(reacao) {
  let historico = JSON.parse(localStorage.getItem('historicoReacoes')) || [];
  historico.unshift(reacao);
  if (historico.length > 5) historico.pop();
  localStorage.setItem('historicoReacoes', JSON.stringify(historico));
}

// Mostra o histórico de reações
function mostrarHistorico() {
  const lista = document.getElementById('listaHistorico');
  lista.innerHTML = '';
  const historico = JSON.parse(localStorage.getItem('historicoReacoes')) || [];
  historico.forEach(reacao => {
    const item = document.createElement('li');
    item.textContent = reacao;
    lista.appendChild(item);
  });
}

// Limpa o histórico
function limparHistorico() {
  localStorage.removeItem('historicoReacoes');
  mostrarHistorico();
}

// Mostra a tabela com todas as reações conhecidas
function mostrarTabelaReacoes() {
  const tabela = document.getElementById('tabelaReacoes');
  tabela.innerHTML = '';

  reacoesConhecidas.forEach(reacao => {
    const linha = document.createElement('tr');

    const r1 = document.createElement('td');
    r1.textContent = reacao.reagente1.toUpperCase();

    const r2 = document.createElement('td');
    r2.textContent = reacao.reagente2.toUpperCase();

    const produto = document.createElement('td');
    produto.textContent = reacao.produto;

    const tipo = document.createElement('td');
    tipo.textContent = reacao.tipo;

    linha.appendChild(r1);
    linha.appendChild(r2);
    linha.appendChild(produto);
    linha.appendChild(tipo);

    tabela.appendChild(linha);
  });
}

// Inicializa a interface ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  mostrarHistorico();
  mostrarTabelaReacoes();
});