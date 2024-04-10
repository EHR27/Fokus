const html = document.querySelector('html');
const btnCorto = document.querySelector('.app__card-button--corto');
const btnEnfoque = document.querySelector('.app__card-button--enfoque');
const btnLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const input = document.querySelector('#alternar-musica');
const texto = document.querySelector('#start-pause span');
const tiempoPantalla = document.querySelector('#timer');
const iconoPausa = document.querySelector('.app__card-primary-butto-icon');

const btnIniciarPausar = document.querySelector('#start-pause');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')


let tiempoSegundos = 1500;
let idIntervalo = null;

musica.loop = true;

input.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

btnCorto.addEventListener('click', () => {
    tiempoSegundos = 300;
    cambiarContexto('descanso-corto');
    btnCorto.classList.add('active');
});

btnEnfoque.addEventListener('click', () => {
    tiempoSegundos = 1500;
    cambiarContexto('enfoque');
    btnEnfoque.classList.add('active');
})

btnLargo.addEventListener('click', () => {
    tiempoSegundos = 900;
    cambiarContexto('descanso-largo');
    btnLargo.classList.add('active');
});

function cambiarContexto(contexto){
    mostrarTiempo();
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);

    switch(contexto){
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro?
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie
            <strong class="app__title-strong">Haz una pausa larga.</strong>`
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoSegundos <= 0){
        audioTiempoFinalizado.play();
        alert('Tiempo final');
        reiniciar();
        return;
    }
    
    //iniciarPausar();
    tiempoSegundos -= 1;
    console.log(tiempoSegundos);
    console.log(idIntervalo);
    mostrarTiempo();
}

btnIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(idIntervalo){
        audioPausa.play()
        reiniciar()
        return
    }
    audioPlay.play();
    texto.textContent = "Pausar";
    iconoPausa.setAttribute('src', `/imagenes/pause.png`);
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    texto.textContent = "Comenzar";
    iconoPausa.setAttribute('src', `/imagenes/play_arrow.png`);
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoSegundos * 1000);
    const tiempoFormato = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'});
    tiempoPantalla.innerHTML = `${tiempoFormato}`;
}

mostrarTiempo();