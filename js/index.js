// las variables que empiezan con el simbolo de dolar ($) indicarian que es un elemento del DOM
const $ = id => document.getElementById(id)
const $$ = element => document.createElement(element)

const $botonMascotaJugador = $('boton-mascota')

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

const contenedorTarjetas = $('contenedorTarjetas')

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDePokepones
let vidasJugador = 3
let vidasEnemigo = 3
let $inputHipodoge
let $inputCapipepo
let $inputRatigueya

class Mokepon {
    constructor(nombre,foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/images/hipodoge.webp', 5)

let capipepo = new Mokepon('Capipepo', './assets/images/capipepo.webp', 5)

let ratigueya = new Mokepon('Ratigueya', './assets/images/ratigueya.webp', 5)

hipodoge.ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
)
capipepo.ataques.push(
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
)
ratigueya.ataques.push(
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🌱', id:'boton-tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

mokepones.forEach((mokepon) => {
    opcionDePokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="card-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="${mokepon.nombre}">
        </label>
    `;
    contenedorTarjetas.innerHTML += opcionDePokepones

    $inputHipodoge = $('Hipodoge')
    $inputCapipepo = $('Capipepo')
    $inputRatigueya = $('Ratigueya')
})

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
        $spanMascotaJugador.innerHTML = $inputHipodoge.id
    }
    else if ($inputCapipepo.checked) {
        $spanMascotaJugador.innerHTML = $inputCapipepo.id
    }
    else if ($inputRatigueya.checked) {
        $spanMascotaJugador.innerHTML = $inputRatigueya.id
    }
    else {
        alert('Selecciona un Moqopon')
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)

    $spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    /* if (mascotaAleatoria == 1) {
        $spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleatoria == 2) {
        $spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        $spanMascotaEnemigo.innerHTML = 'Ratigueya'
    } */
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

