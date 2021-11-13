const btnProxima = document.getElementById("proxima")
let wrapperGame = document.getElementById("wrapperGame")
const botaoConfirmar = document.getElementById("confirma")
const audioAcertou = document.getElementById("soundTrue")
const audioErrou = document.getElementById("soundError")
let jogarBtn = document.getElementById("camarote")
let innerResultado = document.getElementById("resultado")
let displayPontos = document.getElementById("pontos")
let pontosJogador = 0
var respostaTrue = undefined
var just = undefined
let quantidadePerguntas = 15
let indicePergunta = undefined

let perguntas = [
  { pergunta: "Apenas uma pessoa na história recebeu o Prêmio Nobel em áreas científicas diferentes. Quem foi essa pessoa?", opcoes: { a: "Linus Pauling", b: "Marie Curie", c: "Stephen Hawking" }, v: "r2", just: "A cientista Marie Curie venceu o Prêmio Nobel de Física em 1903 e o Prêmio Nobel de Química em 1911. Ela foi responsável pelo desenvolvimento da teoria da radioatividade e pela descoberta de dois elementos químicos (Rádio e Polônio)." },
  { pergunta: "Qual a obra de arte mais cara já arrematada em um leilão?", opcoes: { a: "O Sonho de Pablo Picasso", b: "O Grito de Edvard Munch", c: "Salvator Mundi de Leonardo da Vinci" }, v: "r3", just: "O quadro Salvator Mundi, conhecido como “o último da Vinci”, foi arrematado por um príncipe árabe em um leilão pelo valor de 450,3 milhões de dólares, cerca de 2,4 bilhões de reais." },
  { pergunta: "Qual o país mais novo do mundo?", opcoes: { a: "Sudão do Sul", b: "Timor Leste", c: "Kosovo" }, v: "r1", just: "O Sudão do Sul tornou-se independente em 2011 e representa o país mais novo do mundo. " },
  { pergunta: "Quem foi a primeira mulher a viajar para o espaço?", opcoes: { a: "Svetlana Savitskaya", b: "Valentina Tereshkova", c: "Kathryn D. Sullivan" }, v: "r2", just: "Valentina Tereshkova foi a primeira cosmonauta (equivalente soviético a astronauta) a viajar para o espaço em 16 de junho de 1963." },
  { pergunta: "Qual foi a célebre invenção feita por Robert Kahn e Vint Cerf?", opcoes: { a: "Internet", b: "Rádio-gravador", c: "Televisão" }, v: "r1", just: "A internet. Robert Kahn e Vint Cerf criaram o TCP/IP, que permite a comunicação e a troca de documentos entre computadores distintos." },
  { pergunta: "Qual o lugar mais profundo dos oceanos?", opcoes: { a: "Fossa das Marianas", b: "Fossa de Java", c: "Fossa das Ilhas Sandwich" }, v: "r1", just: "A Fossa das Marianas é o logar mais profundo do planeta, sua profundidade atinge os 10 984 metros." },
  { pergunta: "Quanto tempo durou o regime do apartheid na Africa do Sul?", opcoes: { a: "37 anos", b: "46 anos", c: "51 anos" }, v: "r2", just: "46 anos. O regime de segregação racial, conhecido como apartheid na África do Sul durou de 1948 a 1994. No dia 10 de maio de 1994, Nelson Mandela foi eleito presidente, decretando o fim do regime." },
  { pergunta: "Quantos pares de costelas um ser humano, normalmente, possui?", opcoes: { a: "12", b: "15", c: "10" }, v: "r1", just: "Uma pessoa normal possui 12 pares de costelas, mas 0,5% das pessoas possuem um par de costelas “extra”, o 13º par." },
  { pergunta: "Quais planetas do sistema solar realizam seu movimento de rotação em sentido horário?", opcoes: { a: "Saturno e Júpiter", b: "Mercúrio e Saturno", c: "Vênus e Urano" }, v: "r3", just: "Vênus e Urano.  É comum que os planetas realizem o movimento de rotação no sentido anti-horário. Em nosso sistema solar apenas Vênus e Urano rotacionam no sentido oposto." },
  { pergunta: "O termo CPI, utilizado para referira às investigações realizadas pelo poder legislativo, significa:", opcoes: { a: "Coordenação Pública de Investigação", b: "Comitiva Política de Investigação", c: "Comissão Parlamentar de Inquérito" }, v: "r3", just: "Comissão Parlamentar de Inquérito. A comissão parlamentar de inquérito (CPI) é um instrumento de senadores e deputados para fiscalizar e investigar possíveis crimes cometidos na administração pública." },
  { pergunta: "Atualmente, quantos elementos químicos a tabela periódica possui?", opcoes: { a: "113", b: "118", c: "109" }, v: "r2", just: "Os últimos elementos foram adicionados à tabela periódica em 2016. Eles são: 113 (Nihônio), 115 (Moscóvio), 117 (Tenessino) e 118 (Oganessônio)." },
  { pergunta: "Quem foi o inventor da vacina?", opcoes: { a: "Jonas Salk", b: "Louis Pasteur", c: "Edward Jenner" }, v: "r3", just: 'O médico britânico Edward Jenner criou a primeira vacina, em 1796, como um experimento a partir das observações sobre o contágio da varíola e sua variante bovina. Daí, o termo vacina, que tem origem no latim vaccinus e quer dizer "derivado da vaca".' },
  { pergunta: "Qual a velocidade da luz?", opcoes: { a: "304 540 870 metros por segundo (m/s)", b: "199 792 458 metros por segundo (m/s)", c: "299 792 458 metros por segundo (m/s)" }, v: "r3", just: "A primeira medição real da luz foi feita pelo astrônomo Ole Romer, que em 1676 chegou a um número próximo da velocidade da luz. Hoje, sabe-se com precisão que a velocidade da luz é 299 792 458 metros por segundo." },
  { pergunta: 'Que líder mundial ficou conhecida como “Dama de Ferro”?', opcoes: { a: "Christine Lagarde", b: "Margaret Thatcher", c: " Angela Merkel" }, v: "r2", just: 'Margaret Thatcher (1925-2013), conhecida como a “dama de ferro”, foi a primeira-ministra britânica e a primeira mulher a ocupar este posto. Ela esteve nesta posição entre os anos de 1979 e 1990 e seu governo teve como principal característica a implantação do neoliberalismo no Reino Unido. Contrária ao socialismo, ela realizou um discurso em 1976 contra a URSS e, por conta disso, os soviéticos passaram a chamá-la de “dama de ferro”.' },
  { pergunta: "Quais os nomes dos três Reis Magos?", opcoes: { a: " Gaspar, Nicolau e Natanael", b: "Belchior, Gaspar e Nataniel", c: "Belchior, Gaspar e Baltazar" }, v: "r3", just: "Os três reis magos são personalidades que visitaram Jesus após o seu nascimento. Eles ofereceram alguns itens como forma de presentear a chegada do Salvador. Assim, Belchior levou ouro, Gaspar, incenso, e Baltazar, mirra." },
  { pergunta: "Quais são os cromossomos que determinam o sexo masculino?", opcoes: { a: "Os Y", b: "Os X", c: "Os V" }, v: "r1", just: "Os cromossomos sexuais são dois: o “X” é o cromossomo feminino e “Y”, o cromossomo masculino." },]
// quantidade perguntas = 16

function create() {
  if (quantidadePerguntas > -1){
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  jogarBtn.style.display = 'inline';
  innerResultado.textContent = " "
  jogo(getRandomInt(0, quantidadePerguntas))
}else{
  console.log (")jogo acabou")
  divGameInner.textContent = "acabou malacoi"
  wrapperGame.style.display = "none"
  innerResultado.style.display = "none"
}

}

function jogo(p) {
  botaoConfirmar.style.display = 'inline';
  jogarBtn.style.display = 'none';
  wrapperGame.style.display = "inline"
  document.getElementById("pergunta").textContent = perguntas[p].pergunta
  document.getElementById("text1").textContent = perguntas[p].opcoes.a
  document.getElementById("text2").textContent = perguntas[p].opcoes.b
  document.getElementById("text3").textContent = perguntas[p].opcoes.c 
  respostaTrue = perguntas[p].v
  just= perguntas[p].just
  indicePergunta = p 
}


function confirma(){
  console.log(quantidadePerguntas)
  console.log(respostaTrue)
/*   jogarBtn.style.display = 'inline'; */
btnProxima.style.display = "inline"
  botaoConfirmar.style.display = 'none';
  let alternativeRarioBtn = document.getElementsByName("alternativeRarioBtn")

  for (var i = 0 in alternativeRarioBtn){
    if (alternativeRarioBtn[i].checked) {
    radioCheck = alternativeRarioBtn[i].value}
  }
  console.log(radioCheck)
  if (radioCheck == respostaTrue) {
    pontosJogador++
    audioAcertou.currentTime = 0
    audioAcertou.play()
    innerResultado.textContent = "Certa resposta.    " + just
  } else {
    botaoConfirmar.style.display = 'none';
    audioErrou.currentTime = 0
    audioErrou.play()
    innerResultado.textContent = "Resposta errada.    " +just
  } 

quantidadePerguntas--
  displayPontos.textContent = "Pontos: " + pontosJogador
  console.log(perguntas)
}
 
function next(){
  btnProxima.style.display = "none"
  create()
  perguntas.splice(indicePergunta,1)
}