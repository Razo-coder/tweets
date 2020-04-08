// Variables
const listaTweets = document.getElementById('lista-tweets');



// Event Listeners
eventListeners();

function eventListeners() 
{
    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',
    agregarTweet);

    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //cargar contenido de localStorage
    document.addEventListener('DOMContentLoaded', LocalStorageListo);

}

// Funciones

// Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    //Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //crear elemento y añadirlo a la lista de tweets
    const li = document.createElement('li');
    li.innerText = tweet;
    //añadir boton borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //Añadir a Local Storage
    agregarTweetLocalStorage(tweet);
}
//Elimina el tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);

    } 
}
//Mostrar datos de LocalStorage en la lista
function LocalStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet) {
         // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //crear elemento y añadirlo a la lista de tweets
        const li = document.createElement('li');
        li.innerText = tweet;
        //añadir boton borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}
//Agrega tweet a Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de String a arreglo para LocalStorage
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}

//Comprobar que haya elementos en Localstorage y retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    //revisamos los valores de Local Storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else{
        tweets = JSON.parse( localStorage.getItem('tweets') );
    }
    return tweets;
}

//Eliminar Tweet de localStorage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets) );
}