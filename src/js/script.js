let selectUl = document.querySelector('.containerUl')
let totalValue = document.querySelector('.totalValue')
let selectCarrinho = document.querySelector('.carrinho')
let selectCarrinhoContent = document.querySelector('.carrinhoContent')

//==FUNÇÃO PARA LISTAR OS PRODUTOS DE ACORDO COM O ARRAY==//
function listarProdutos(array) {
  selectUl.innerHTML = ``
  for (let i = 0; i < array.length; i++) {
    criarCards(array[i])
  }
  let totalSum = atualizarValor(array)
  totalValue.innerHTML = `R$ ${totalSum},00`
}

{
  /* <img src="./src/img/banana.png" alt="Imagem banana" />
<h3>Banana</h3>
<span>Hortifruti</span>
<ul class="nutrientes">
  <li>Potássio</li>
  <li>Vitamina B6</li>
  <li>Vitamina C</li>
  <li>Folatos</li>
</ul>
<p>R$ 2.00</p>
<button>Comprar</button> */
}

//==FUNÇÃO PARA CRIAR OS CARDS DE ACORDO COM O PRODUTO==//
function criarCards(produto) {
  let nome = produto.nome
  let preco = produto.preco
  let secao = produto.secao
  let img = produto.img
  let id = produto.id

  let createLi = document.createElement('li')
  createLi.classList.add('animate__animated', 'animate__fadeInLeft')
  createLi.style.setProperty('--animate-duration', '0.5s')
  let createImg = document.createElement('img')
  let createh3 = document.createElement('h3')
  let createSpan = document.createElement('span')
  let createUl = document.createElement('ul')
  let createP = document.createElement('p')
  let createButton = document.createElement('button')
  selectUl.appendChild(createLi)
  createLi.append(
    createImg,
    createh3,
    createSpan,
    createUl,
    createP,
    createButton
  )
  createUl.classList.add('nutrientes')
  createButton.classList.add('buttonComprar')

  for (let i = 0; i < produtos[id].componentes.length; i++) {
    let createLi = document.createElement('li')
    createUl.append(createLi)
    createLi.innerHTML = produtos[id].componentes[i]
  }

  // let createLi01 = document.createElement('li')
  // let createLi02 = document.createElement('li')
  // let createLi03 = document.createElement('li')
  // let createLi04 = document.createElement('li')

  // createUl.append(createLi01, createLi02, createLi03, createLi04)
  // createLi01.innerHTML = produtos[id].componentes[0]
  // createLi02.innerHTML = produtos[id].componentes[1]
  // createLi03.innerHTML = produtos[id].componentes[2]
  // createLi04.innerHTML = produtos[id].componentes[3]

  //===Adicionando propriedades dos objetos===//
  createImg.src = `${img}`
  createImg.alt = `${nome}`
  createh3.innerHTML = `${nome}`
  createSpan.innerHTML = `${secao}`
  createP.innerHTML = `R$ ${preco},00`
  createButton.innerHTML = `Comprar`
  createButton.id = id
}

//==FUNÇÃO PARA ATUALIZAR O VALOR TOTAL DOS PRODUTOS==//

function atualizarValor(array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i].preco
  }
  return sum
}

//==ARRAY DE CATEGORIAS==//

let hortifruti = []
let panificadora = []
let laticinio = []
let arrayCarrinho = []

function listarCategorias() {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].secao == 'Hortifruti') {
      hortifruti.push(produtos[i])
    } else if (produtos[i].secao == 'Panificadora') {
      panificadora.push(produtos[i])
    } else if (produtos[i].secao == 'Laticinio') {
      laticinio.push(produtos[i])
    }
  }
}

listarProdutos(produtos)

listarCategorias()

//==CRIANDO BOTÃO DE BUSCA FUNCIONAL==//

let inputSearch = document.querySelector('.campoBuscaPorNome')
let inputButton = document.querySelector('.botaoBuscaPorNome')

inputButton.addEventListener('click', function () {
  let pesquisaUsuario = inputSearch.value
  pesquisarProdutos(pesquisaUsuario)
  arrayPesquisa = []
})

let arrayPesquisa = []

function pesquisarProdutos(pesquisaUsuario) {
  for (let i = 0; i < produtos.length; i++) {
    let pesquisaLowerCase = pesquisaUsuario.toLowerCase()
    let nomeProduto = produtos[i].nome.toLowerCase()
    let secaoProduto = produtos[i].secao.toLowerCase()
    let categoriaProduto = produtos[i].categoria.toLowerCase()
    if (
      nomeProduto.includes(pesquisaLowerCase) ||
      categoriaProduto.includes(pesquisaLowerCase) ||
      secaoProduto.includes(pesquisaLowerCase)
    ) {
      arrayPesquisa.push(produtos[i])
    }
  }
  listarProdutos(arrayPesquisa)
}

//== FUNÇÃO EXTRA PRA PESQUISAR SE APERTAR O ENTER == //
let body = document.querySelector('body')

body.addEventListener(
  'keypress',
  function (event) {
    if (event.which == 13) {
      let pesquisaUsuario = inputSearch.value
      pesquisarProdutos(pesquisaUsuario)
      arrayPesquisa = []
    }
  },
  false
)

selectUl.addEventListener('click', function (event) {
  let btnComprar = event.target
  let btnId = btnComprar.id
  if (btnComprar.tagName == 'BUTTON') {
    arrayCarrinho.unshift(produtos[btnId])
    listarProdutosCarrinho(arrayCarrinho)
    if (arrayCarrinho.length > 0) {
      let cartItem = document.querySelectorAll('.itemCard')[0]
      cartItem.classList.add('animate__animated', 'animate__backInLeft')
      cartItem.style.setProperty('--animate-duration', '0.6s')
    }
  }
})

let carrinhoItem = document.querySelector('.carrinhoItem')

function listarProdutosCarrinho(array) {
  carrinhoItem.innerHTML = ``
  for (let i = 0; i < array.length; i++) {
    criarCardsCarrinho(array[i], i)
  }
  atualizarValorCarrinho()
}

function criarCardsCarrinho(array, indice) {
  let nome = array.nome
  let img = array.img
  let preco = array.preco
  let secao = array.secao
  let id = indice

  let carrinhoCard = document.createElement('div')
  carrinhoCard.classList.add('itemCard')
  let createInfoNames = document.createElement('div')
  createInfoNames.classList.add('infoNames')
  let carrinhoImg = document.createElement('img')
  let carrinhoh3 = document.createElement('h3')
  let carrinhoSpan = document.createElement('span')
  let carrinhoP = document.createElement('p')
  carrinhoItem.append(carrinhoCard)
  createInfoNames.append(carrinhoh3, carrinhoSpan, carrinhoP)

  carrinhoh3.innerHTML = nome
  carrinhoImg.src = img
  carrinhoSpan.innerHTML = secao
  carrinhoP.innerHTML = `R$${preco},00`

  // CRIANDO LIXEIRA //

  let divLixeira = document.createElement('div')
  let imgLixeira = document.createElement('img')
  divLixeira.classList.add('itemLixeira')
  divLixeira.append(imgLixeira)
  imgLixeira.src = './src/img/lixeira.svg'
  imgLixeira.id = id
  carrinhoCard.append(carrinhoImg, createInfoNames, divLixeira)
}

let carrinhoConteudo = document.querySelector('.carrinhoItem')

carrinhoConteudo.addEventListener('click', removerItemCarrinho)

function removerItemCarrinho(event) {
  let btnRemover = event.target
  let btnId = btnRemover.id
  let cartItem = document.querySelectorAll('.itemCard')[btnId]
  if (btnRemover.tagName == 'IMG') {
    arrayCarrinho.splice(btnId, 1)
    cartItem.classList.add('animate__animated', 'animate__backOutRight')
    cartItem.style.setProperty('--animate-duration', '0.6s')
  }
  setTimeout(function () {
    listarProdutosCarrinho(arrayCarrinho)
  }, 400)
}

let priceTotal = document.querySelector('.priceTotalSpan')
let qtdTotal = document.querySelector('.qtdTotalSpan')
let noItens = document.querySelector('.noItens')
let itensTotal = document.querySelector('.itensTotal')

function atualizarValorCarrinho() {
  let sum = 0
  let qtd = arrayCarrinho.length
  for (let i = 0; i < arrayCarrinho.length; i++) {
    sum += arrayCarrinho[i].preco
  }
  priceTotal.innerHTML = `R$${sum},00`
  qtdTotal.innerHTML = `${qtd}`
  if (arrayCarrinho.length == 0) {
    noItens.style = `display: flex`
    itensTotal.style = `display: none`
  } else if (arrayCarrinho.length > 0) {
    noItens.style = `display: none`
    itensTotal.style = `display: block`
  }
}

atualizarValorCarrinho()

// Primeira entrega do M2, refatorei um e-commerce aplicando conceito mobile-first, totalmente responsivo, utilizei apenas HTML, CSS, JS puro.
// Também utilizei uma biblioteca externa de animações para tornar o layout mais dinâmico! Muita fé e progresso.
// Kenzie Academy Brasil
