const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const imgBtn = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.getElementById("timer")
const musica = new Audio('sons/luna-rise-part-one.mp3')
const play = new Audio('sons/play.wav')
const beep = new Audio('sons/beep.mp3')
const pause = new Audio('sons/pause.mp3')
musica.loop = true

let temporizadorDecorridoEmSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    temporizadorDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    temporizadorDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    temporizadorDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (temporizadorDecorridoEmSegundos <= 0) {
        beep.play()
        zerar()
        return
    }
    temporizadorDecorridoEmSegundos -= 1
    mostrarTempo()


}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pause.play()
        zerar()
        return
    }
    else {
        play.play()
        intervaloId = setInterval(contagemRegressiva, 1000)
        iniciarOuPausarBt.textContent = "Pausar"
        imgBtn.setAttribute('src', 'imagens/pause.png')
    }
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    imgBtn.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null

}

function mostrarTempo() {
    const tempo = new Date(temporizadorDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
