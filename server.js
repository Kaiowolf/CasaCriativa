// const é uma VARIÁVEL

//usei o express para criar e configurar meu servidor
const express = require('express');
const server = express();

const ideas = [
  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
    title: 'Curso de Programação',
    category: 'Estudo',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
    url: 'https://rocketseat.com.br'
  },

  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729005.svg',
    title: 'Exercícios',
    category: 'Saúde',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
    url: 'https://rocketseat.com.br'
  },

  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729027.svg',
    title: 'Meditação',
    category: 'Mentalidade',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
    url: 'https://rocketseat.com.br'
  },

  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729021.svg',
    title: 'Streaming',
    category: 'Diversão',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
    url: 'https://rocketseat.com.br'
  },
  
  {
    img: 'https://image.flaticon.com/icons/svg/2737/2737379.svg',
    title: 'Video Game',
    category: 'Diversão',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
    url: 'https://rocketseat.com.br'
  },

  {
    img: 'https://image.flaticon.com/icons/svg/2729/2729034.svg',
    title: 'Conversar',
    category: 'Social',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
    url: 'https://rocketseat.com.br'
  },
];

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'));

//configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
  express: server,
  noCache: true, // boolean true ou false
})



//crirei uma rota /
//e capturo o pedido do cliente para responder
server.get('/', function (req, res) {

  const reversedIdeas = [...ideas].reverse();

  let lastIdeas = [];

  for (idea of reversedIdeas){
    if (lastIdeas.length < 2) {   //if && ifelse são DECIÇÕES '(VALIDAÇÃO, CONDIÇÃO, EXPRESSÃO)
    lastIdeas.push(idea);
    }
  }

  /**
   * Declarações:
   * var: Declara uma variável, opcionalmente, inicializando-a com um valor.
   * let: Declara uma variável local de escopo do bloco, opcionalmente, inicializando-a com um valor.
   * const: Declara uma constante de escopo de bloco, apenas de leitura.
   */


  /**
   * Atribuição: Sigual de =
   * 
   * Verificação/Comparação: Sinais de && (e) ||(ou) != (não é igual) < (menor) == (igual)
   * > (maior) <=(menor ou igual) >=(maior ou igual) <>(diferente de) !(negação) 
   */

  return res.render('index.html', {ideas: lastIdeas}); // {} é um OBJETO && [] é um ARRAY (VETORES)
})

server.get('/ideias', function (req, res) {

  const reversedIdeas = [...ideas].reverse();

  return res.render('ideias.html', {ideas: reversedIdeas});
})

//liguei meu servidor na porta 3000
server.listen(3000);