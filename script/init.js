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
})

carregarConfig();

carregarIndex();

recalcularTudo();