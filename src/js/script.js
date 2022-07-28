let selectUl = document.querySelector('.containerUl')
let totalValue = document.querySelector('.totalValue')


//==FUNÇÃO PARA LISTAR OS PRODUTOS DE ACORDO COM O ARRAY==//
function listarProdutos(array) {
    selectUl.innerHTML = ``
    for(let i = 0; i < array.length; i++) {
    criarCards(array[i])
    }
    let totalSum = atualizarValor(array)
    totalValue.innerHTML = `R$ ${totalSum},00`
}


//==FUNÇÃO PARA CRIAR OS CARDS DE ACORDO COM O PRODUTO==//
function criarCards(produto) {
    let nome = produto.nome
    let preco = produto.preco
    let secao = produto.secao
    let img = produto.img

    let createLi = document.createElement('li')
    let createImg = document.createElement('img')
    let createh3 = document.createElement('h3')
    let createSpan = document.createElement('span')
    let createP = document.createElement('p')
    selectUl.appendChild(createLi)
    createLi.append(createImg,createh3,createSpan,createP)

    //===Adicionando propriedades dos objetos===//
    createImg.src = `${img}`
    createImg.alt = `${nome}`
    createh3.innerHTML = `${nome}`
    createSpan.innerHTML = `${secao}`
    createP.innerHTML = `${preco}`
}

//==FUNÇÃO PARA ATUALIZAR O VALOR TOTAL DOS PRODUTOS==//

function atualizarValor(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += array[i].preco
    }
    console.log(sum)
    return sum
}

//==ARRAY DE CATEGORIAS==//

let hortifruti = []
let panificadora = []
let laticinio = []

function listarCategorias() {
    for(let i = 0; i < produtos.length; i++) {
        if(produtos[i].secao == 'Hortifruti') {
            hortifruti.push(produtos[i])
        }
        else if(produtos[i].secao == 'Panificadora') {
            panificadora.push(produtos[i])
        } 
        else if (produtos[i].secao == 'Laticínio') {
            laticinio.push(produtos[i])
        }
    }
}

listarProdutos(produtos)

listarCategorias()


//==CRIANDO BOTÃO DE BUSCA FUNCIONAL==//

let inputSearch = document.querySelector('.campoBuscaPorNome')
let inputButton = document.querySelector('.botaoBuscaPorNome')

inputButton.addEventListener('click', function() {
    let pesquisaUsuario = inputSearch.value
    pesquisarProdutos(pesquisaUsuario)
    arrayPesquisa = []
})

let arrayPesquisa = []

function pesquisarProdutos(pesquisaUsuario) {
    for(let i = 0; i < produtos.length; i++) {
        let pesquisaLowerCase = pesquisaUsuario.toLowerCase()
        let nomeProduto = produtos[i].nome.toLowerCase()
        let categoriaProduto = produtos[i].categoria.toLowerCase()
        if (nomeProduto.includes(pesquisaLowerCase) || categoriaProduto.includes(pesquisaLowerCase)) {
            arrayPesquisa.push(produtos[i])
        }
    }
    listarProdutos(arrayPesquisa)
}

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