// const é uma VARIÁVEL

//usei o express para criar e configurar meu servidor
const express = require('express');
const server = express();

const db = require('./db');
// const ideas = [
//   {
//     img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
//     title: 'Curso de Programação',
//     category: 'Estudo',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
//     url: 'https://rocketseat.com.br'
//   },

//   {
//     img: 'https://image.flaticon.com/icons/svg/2729/2729005.svg',
//     title: 'Exercícios',
//     category: 'Saúde',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
//     url: 'https://rocketseat.com.br'
//   },

//   {
//     img: 'https://image.flaticon.com/icons/svg/2729/2729027.svg',
//     title: 'Meditação',
//     category: 'Mentalidade',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
//     url: 'https://rocketseat.com.br'
//   },

//   {
//     img: 'https://image.flaticon.com/icons/svg/2729/2729021.svg',
//     title: 'Streaming',
//     category: 'Diversão',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
//     url: 'https://rocketseat.com.br'
//   },
  
//   {
//     img: 'https://image.flaticon.com/icons/svg/2737/2737379.svg',
//     title: 'Video Game',
//     category: 'Diversão',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
//     url: 'https://rocketseat.com.br'
//   },

//   {
//     img: 'https://image.flaticon.com/icons/svg/2729/2729034.svg',
//     title: 'Conversar',
//     category: 'Social',
//     description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, iure fuga ducimus, repellat quos corrupti ea distinctio vel ipsam recusandae soluta necessitatibus, dolore exercitationem! Quisquam necessitatibus soluta repellat eaque accusamus.',
//     url: 'https://rocketseat.com.br'
//   },
// ];

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'));

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
  express: server,
  noCache: true, // boolean true ou false
})



//criei uma rota
//e capturo o pedido do cliente para responder



server.get('/', function (req, res) {
  
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!');
    }

    const reversedIdeas = [...rows].reverse();

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
   * > (maior) <=(menor ou igual) >=(maior ou igual) <>(diferente de) !(negação) === (extremante igual) 
   */

  return res.render('index.html', {ideas: lastIdeas}); // {} é um OBJETO && [] é um ARRAY (VETORES)
  });
  
})

server.get('/ideias', function (req, res) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!');
    }
    
    const reversedIdeas = [...rows].reverse();
  
    return res.render('ideias.html', {ideas: reversedIdeas});

  });

})

server.post('/', function (req, res) {
  // Inserir dado na tabela
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES (?,?,?,?,?);
  `
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]
  db.run(query,values, function(err) {
    if (err) {
      console.log(err)
      return res.send('Erro no banco de dados!');
    }

    return res.redirect('/ideias');
  
  });
});

server.delete('/ideas', function(req, res){

  const buttondelete = [
    req.body.id,
  ]
  
  db.run(buttondelete,`DELETE FROM ideas WHERE id = ?`,[id], function(err) {
      if (err) {
        return res.send ('Erro ao deletar. Tente novamente.')
      }
  
      return res.redirect('/ideias');
    });

});

//liguei meu servidor na porta 3000
server.listen(3000);