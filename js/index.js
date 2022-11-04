// las variables que empiezan con el simbolo de dolar ($) indicarian que es un elemento del DOM
const $ = id => document.getElementById(id)
const $$ = element => document.createElement(element)

const $botonMascotaJugador = $('boton-mascota')
const $inputHipodoge = $('hipodoge')
const $inputCapipepo = $('capipepo')
const $inputRatigueya = $('ratigueya')

$botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

const $spanMascotaJugador = $('mascota-jugador')

const $spanMascotaEnemigo = $('mascota-enemigo')

const $sectionMensajes = $('resultado')
const $ataquesJugador = $('ataques-jugador')
const $ataquesEnemigo = $('ataques-enemigo')
const $nuevoAtaqueJugador = $$('p')
const $nuevoAtaqueEnemigo = $$('p')

const $spanVidasJugador = $('vidas-jugador')
const $spanVidasEnemigo = $('vidas-enemigo')

const $botonReiniciar = $('boton-reiniciar')

let $botonFuego = $("boton-fuego")
let $botonAgua = $("boton-agua")
let $botonTierra = $("boton-tierra")

$botonFuego.addEventListener('click', ataqueFuego)
$botonAgua.addEventListener('click', ataqueAgua)
$botonTierra.addEventListener('click', ataqueTierra)

$botonReiniciar.addEventListener('click', reiniciarJuego)

const $sectionSeleccionarAtaque = $('seleccionar-ataque')

const $sectionSeleccionarMascota = $('seleccionar-mascota')

const $sectionReiniciar = $('reiniciar')

$sectionSeleccionarAtaque.style.display = 'none'
$sectionReiniciar.style.display = 'none'

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre,foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/images/hipodoge.webp', 5)

let capipepo = new Mokepon('Capipepo', './assets/images/capipepo.webp', 5)

let ratigueya = new Mokepon('Ratigueya', './assets/images/ratigueya.webp', 5)

console.log(hipodoge, capipepo, ratigueya)

/* function iniciarJuego() {
    $botonFuego.addEventListener('click', ataqueFuego)
    $botonAgua.addEventListener('click', ataqueAgua)
    $botonTierra.addEventListener('click', ataqueTierra)
}
iniciarJuego() */

function seleccionarMascotaJugador() {
    $sectionSeleccionarMascota.style.display = 'none'
    $sectionSeleccionarAtaque.style.display = 'flex'

    if($inputHipodoge.checked) {
        $spanMascotaJugador.innerHTML = 'Hipodoge'
    }
    else if ($inputCapipepo.checked) {
        $spanMascotaJugador.innerHTML = 'Capipepo'
    }
    else if ($inputRatigueya.checked) {
        $spanMascotaJugador.innerHTML = 'Ratigueya'
    }
    else {
        alert('Selecciona un Moqopon')
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,3)

    if (mascotaAleatoria == 1) {
        $spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatoria == 2) {
        $spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        $spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO🔥🔥🔥'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA💧💧💧'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA🌱🌱🌱'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)

    if(ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO🔥🔥🔥'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA💧💧💧'
    } else {
        ataqueEnemigo = 'TIERRA🌱🌱🌱'
    }
    combate()
}

function combate() {
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATE')
    } else if (ataqueJugador == 'FUEGO🔥🔥🔥' && ataqueEnemigo == 'TIERRA🌱🌱🌱') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        $spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'AGUA💧💧💧' && ataqueEnemigo == 'FUEGO🔥🔥🔥') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        $spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'TIERRA🌱🌱🌱' && ataqueEnemigo == 'AGUA💧💧💧') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        $spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje('PERDISTE')
        vidasJugador--
        $spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal('Felicitaciones Ganaste :)')
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Felicitaciones Perdiste :(')
    }
}

function crearMensaje(resultado) {
    //$parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ' La mascota del enemigo atacó con ' + ataqueEnemigo + ' ' + resultado
    //$sectionMensajes.appendChild($parrafo)
    $sectionMensajes.innerHTML = resultado
    $nuevoAtaqueJugador.innerHTML = ataqueJugador
    $nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    $ataquesJugador.appendChild($nuevoAtaqueJugador)
    $ataquesEnemigo.appendChild($nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    //$parrafo.innerHTML = resultadoFinal
    //$container-mensajes.appendChild($parrafo)
    $sectionMensajes.innerHTML = resultadoFinal

    $botonFuego.disabled = true
    $botonAgua.disabled = true
    $botonTierra.disabled = true

    $sectionReiniciar.style.display = 'block'

    $botonFuego.style.background = '#fff'
    $botonAgua.style.background = '#fff'
    $botonTierra.style.background = '#fff'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

