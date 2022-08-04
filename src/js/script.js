let selectUl = document.querySelector('.containerUl')
let totalValue = document.querySelector('.totalValue')
let selectCarrinho = document.querySelector('.carrinho')
let selectCarrinhoContent = document.querySelector('.carrinhoContent')

//==FUNÇÃO PARA LISTAR OS PRODUTOS DE ACORDO COM O ARRAY==//

function listarProdutos(array) {
  selectUl.innerHTML = ``
  array.forEach(i => {
    criarCards(i)
  })
  let totalSum = atualizarValor(array)
  totalValue.innerHTML = `R$ ${totalSum},00`
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
  const sum = array.reduce(function (acumulador, atual) {
    return acumulador + atual.preco
  }, 0)
  return sum
}

//==ARRAY DE CATEGORIAS==//

let hortifruti = []
let panificadora = []
let laticinio = []
let arrayCarrinho = []

function listarCategorias() {
  produtos.forEach(function (i) {
    if (i.secao == 'Hortifruti') {
      hortifruti.push(i)
    } else if (i.secao == 'Panificadora') {
      panificadora.push(i)
    } else if (i.secao == 'Laticinio') {
      laticinio.push(i)
    }
  })
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
  produtos.forEach(i => {
    let pesquisaLowerCase = pesquisaUsuario.toLowerCase()
    let nomeProduto = i.nome.toLowerCase()
    let secaoProduto = i.secao.toLowerCase()
    let categoriaProduto = i.categoria.toLowerCase()
    if (
      nomeProduto.includes(pesquisaLowerCase) ||
      categoriaProduto.includes(pesquisaLowerCase) ||
      secaoProduto.includes(pesquisaLowerCase)
    ) {
      arrayPesquisa.push(i)
    }
  })
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
  let index = 0
  array.forEach(function (i) {
    criarCardsCarrinho(i, index)
    index++
  })
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
  let qtd = arrayCarrinho.length
  const sum = arrayCarrinho.reduce(function (acumulador, atual) {
    return acumulador + atual.preco
  }, 0)
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
