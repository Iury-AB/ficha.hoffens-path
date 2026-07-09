
function enviarRequest(dados, server, canal) {

  const discord = document.getElementById("conectar-discord");
  if (!discord.checked) return;
  
  fetch(server+canal, {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then(json => alert(JSON.stringify(json, null, 2)));

}

function d20() {
  return Math.floor(Math.random() * 20) + 1;
}

function testeAtributo(id, nome, condicoes = null) {
  var atributo = Number(document.getElementById(id).value) || 0;
  var rolagem = d20();

  var resultado = rolagem + atributo + modificadorGlobalCondicao;

  const jogador = document.getElementById("usuario-discord").value || "---";
  const servidorDiscord = document.getElementById("servidor-discord").value;
  
  let totalCondicoes = (condicoes !== null) ? adicionarListaCondicoesModificadores(condicoes) : listaCondicoesModificadores;

  var dados = {
    [`resultado.${nome}`]: resultado,
    [`Hab.${nome}`]: atributo,
    "modificadorGlobalCondicao": modificadorGlobalCondicao,
    "condicoes": totalCondicoes,
    "discordID": servidorDiscord,
    "Jogador": jogador
  };

  const bot = document.getElementById("bot-discord").value;

  if (servidorDiscord != "") enviarRequest(dados, bot, "/habilidade");
}

function rolarPericiaPersonalizada (pericia) {
  const nomePericia = document.getElementById(pericia).value || "Perícia";
  testeAtributo(pericia+"-total", nomePericia);
}

function rolarPoderPersonalizado (poder, efeito, ligado) {
  const nomePoder = document.getElementById(`nome-poder-${poder}`).value || "Teste de Poder";
  const nomeEfeito = document.getElementById(`nome-efeito-${poder}-${efeito}-${ligado}`).value || "Efeito";
  const nomeTeste = `${nomePoder} [${nomeEfeito}]`;
  testeAtributo(`lvl-efeito-${poder}-${efeito}-${ligado}`, nomeTeste);
}

function testeDano(nvl, rol, crit) {
  var dmg = Number(document.getElementById(nvl).value) || 0;
  var somaDados = 0;
  if(dmg != ""){
    
    var rolagem = document.getElementById(rol).value;
    var rolDano;
    if(dmg > 0){
      var parts = rolagem.split(/d|\+/);
      var nDados = Number(parts[0]);
      var dado = Number(parts[1]);
      var bonus = Number(parts[2]) || 0;

      // rolar o dano
      var rolls = [];
      for(var n = 0; n < nDados; n++){
        var thisDado = Math.floor(Math.random() * dado) + 1;
        somaDados += thisDado;
        rolls.push(thisDado);
      }
      rolDano = rolls.join(", ");
      somaDados += bonus;
    }
    const critico = document.getElementById(crit).checked;

    const jogador = document.getElementById("usuario-discord").value || "---";
    const servidorDiscord = document.getElementById("servidor-discord").value;
    
    var dados = {
      "Dano Teste": dmg,
      "Rolagem Teste": rolagem,
      "resultadoDano": somaDados,
      "rolagensDano": rolDano,
      "critico": critico,
      "discordID": servidorDiscord,
      "Jogador": jogador
    };

    const bot = document.getElementById("bot-discord").value;

    if (servidorDiscord != "") enviarRequest(dados, bot, "/dano");
  }
}

function testeAcerto(ataque) {
  const nomeAtaque = document.getElementById(`nome-ataque-${ataque}`).value || `Ataque ${ataque}`;
  const acerto = Number(document.getElementById(`acerto-ataque-${ataque}`).value) || 0;
  const rolagem = d20();
  const resultado = rolagem + acerto;
  const critico = Number(document.getElementById(`critico-ataque-${ataque}`).value) || 20;
  const critou = document.getElementById(`critico-${ataque}-check`);
  if (rolagem >= critico & !critou.checked) {
    critou.checked = true;
    destacaCritico(`linha-ataque-${ataque}`);
  } else if(rolagem <= critico & critou.checked) {
    critou.checked = false;
    destacaCritico(`linha-ataque-${ataque}`);
  }
  
  const jogador = document.getElementById("usuario-discord").value || "---";
  const servidorDiscord = document.getElementById("servidor-discord").value;
  
  var dados = {
    "Acerto": acerto,
    "nomeAtaque": nomeAtaque,
    "resultadoAc": resultado,
    "Crit": critico,
    "discordID": servidorDiscord,
    "Jogador": jogador
  };

  const bot = document.getElementById("bot-discord").value;
  if (servidorDiscord != "") enviarRequest(dados, bot, "/ataqueNaoDano");
}

function testeAtaque(ataque) {
  const nomeAtaque = document.getElementById(`nome-ataque-${ataque}`).value;
  testeAtributo(`nivel-ataque-${ataque}`, nomeAtaque);
}

function testeDefesa(defesa, nome) {

  const listaCondicoes = document.querySelectorAll(".condicao");
  var condicoes = null;
  listaCondicoes.forEach(condicao => {
    const condicaoId = condicao.id;
    if (condicaoId in condicoesDefesa) {
      condicoes = condicaoId;
    }
  });
  
  testeAtributo(defesa, nome, condicoes);
}

function testeCura(nvl, rol, crit) {
  var nivel = Number(document.getElementById(nvl).value) || 0;
  var somaDados = 0;
  if(nivel != ""){
    
    var rolagem = document.getElementById(rol).value;
    var rolDano;
    if(nivel > 0){
      var parts = rolagem.split(/d|\+/);
      var nDados = Number(parts[0]);
      var dado = Number(parts[1]);

      // rolar o dano
      var rolls = [];
      for(var n = 0; n < nDados; n++){
        var thisDado = Math.floor(Math.random() * dado) + 1;
        somaDados += thisDado;
        rolls.push(thisDado);
      }
      rolDano = rolls.join(", ");
    }
    const critico = document.getElementById(crit).checked;

    const jogador = document.getElementById("usuario-discord").value || "---";
    const servidorDiscord = document.getElementById("servidor-discord").value;
    
    var dados = {
      "Cura Teste": nivel,
      "Rolagem Teste": rolagem,
      "resultadoCura": somaDados,
      "rolagensCura": rolDano,
      "critico": critico,
      "discordID": servidorDiscord,
      "Jogador": jogador
    };

    const bot = document.getElementById("bot-discord").value;

    if (servidorDiscord != "") enviarRequest(dados, bot, "/cura");
  }
}

function testeRolagemAtaque(ataque) {
  const tipoAtaque = document.getElementById(`tipo-ataque-${ataque}`).value;
  if(tipoAtaque == "dano") {
    testeDano(`nivel-ataque-${ataque}`,`rolagem-ataque-${ataque}`,`critico-${ataque}-check`);
  } else if(tipoAtaque == "cura") {
    testeCura(`nivel-ataque-${ataque}`,`rolagem-ataque-${ataque}`,`critico-${ataque}-check`);
  }
}