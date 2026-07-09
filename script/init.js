let bloqueiaRecalculo = false;

document.addEventListener("input", function (e) {
  if (bloqueiaRecalculo) return;
  
  if (e.target.classList.contains("dependente")) {
    recalcularTudo();
  }
});

document.addEventListener("input", function (e) {
  if (e.target.classList.contains("config")) {
    salvarConfig();
  }
});

document.getElementById("vida-combate").addEventListener("change", () => {
  atualizarBarra("barra-vida","vida-combate", "vida-maxima-combate");
  atualizarPercentual("percentual-vida", "vida-combate", "vida-maxima-combate");
});

document.getElementById("estamina-combate").addEventListener("change", () => {
  atualizarBarra("barra-estamina","estamina-combate", "estamina-maxima-combate");
  atualizarPercentual("percentual-estamina", "estamina-combate", "estamina-maxima-combate");
});

document.getElementById("corrupcao").addEventListener("change", () => {
  atualizarBarraCorrupcao()
});

document.getElementById("corrupcao-maximo").addEventListener("change", () => {
  atualizarBarraCorrupcao()
});

function adicionarModificadorVisual () {
  const dados = document.querySelectorAll(".botao-rolar");
  dados.forEach(dado => {
    if(dado.id == "rolar-dano-teste") return;
    dado.innerHTML = `<div class="modificadores-teste"></div>` + dado.innerHTML;
  });
}

function removerModificadorVisual () {
  const modificadores = document.querySelectorAll(".modificadores-teste");
  modificadores.forEach(mod => mod.remove());
}

adicionarModificadorVisual();

carregarConfig();

carregarIndex();

recalcularTudo();