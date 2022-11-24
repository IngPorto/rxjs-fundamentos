import { fromEvent, Subject } from "rxjs";
import { palabras } from "./palabras";
import wordsList from './wordsList.json'

// interfaz gráfica
const letterRows = document.getElementsByClassName('letter-row');
let letterIndex = 0;
let letterRowIndex = 0;
Array.from(letterRows)[letterRowIndex].children[letterIndex].classList.add("selected-letter")
console.log(`letterIndex:${letterIndex} - letterRowIndex: ${letterRowIndex}`);
const getRandomWorld = () => wordsList[Math.floor(Math.random() * wordsList.length)];
const answers = getRandomWorld();
console.log(answers);

// eventos
const onKeyDown$ = fromEvent(document, "keydown");
const userWinOrLoose$ = new Subject();

const insertLetter = {
    next: (event)=>{
        const pressedKey = event.key.toUpperCase();
        // solo letras y de tamaño 1
        if(pressedKey.length == 1 && pressedKey.match(/[a-z]/i)){
            let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            letterBox.textContent = letterBox.textContent || pressedKey;
            letterBox.classList.add("filled-letter");
            letterBox.classList.remove("selected-letter");
            if(letterIndex < 4){
                letterIndex++;
            }
            /*else if(letterRowIndex < 5) {
                letterIndex = 0;
                letterRowIndex++;
            } else {
            }
            */
            moverCursorAdelante()
            console.log(`letterIndex:${letterIndex} - letterRowIndex: ${letterRowIndex}`);
        }
    }
}

const deteleLetter = {
    next: (event) => {
        if(event.key == 'Backspace'){
            let prevLetterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            prevLetterBox.classList.remove("selected-letter");
            
            if(letterIndex == 4){
                console.log('en el final')
                const auxLetter = prevLetterBox.textContent
                prevLetterBox.textContent = '';
                prevLetterBox.classList.remove("filled-letter");
                console.log(auxLetter)
                if(auxLetter != ''){
                    prevLetterBox.classList.add("selected-letter");
                    return;
                }
            }

            console.log('letterIndex != 4 && letterRowIndex != 5')
            if(letterIndex > 0){
                letterIndex--;
            }else if(letterRowIndex > 0) {
                letterIndex = 4;
                letterRowIndex--;
            }
            let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            letterBox.textContent = '';
            letterBox.classList.remove("filled-letter");
            letterBox.classList.add("selected-letter");

            console.log(`letterIndex:${letterIndex} - letterRowIndex: ${letterRowIndex}`);
        }
    }
}

const checkWord = {
    next: event => {
        if(event.key == 'Enter'){
            let lettersProspect = Array.from(Array.from(letterRows)[letterRowIndex].children).map(letter => letter.textContent)
            lettersProspect = lettersProspect.join('').trim();
            // Verifico que se haya completado la palabra
            console.log(lettersProspect.length)
            if(lettersProspect.length < 5){
                const textDisplay = document.getElementsByClassName('message-text')[0];
                textDisplay.textContent = 'No hay suficientes letras'
                return;
            }
            
            if(lettersProspect == answers){
                userWinOrLoose$.next('win')
                
            }else {
                // Verifico letra por letra según cudrícula
                lettersProspect = lettersProspect.split('');
                const answersLetters = answers.split('');
                lettersProspect.map( (letter, indexProspect) => {
                    answersLetters.forEach((answerLetter, indexAnswer) => {
                        let letterBox = Array.from(letterRows)[0].children[indexProspect]
                        // En la casilla correcta: poner en verde esa casilla
                        if(letter == answerLetter){
                        }
                        // Letra en la palabra pero posición equivocada: Amarillo
                        // Letra no está en la palabra: Gris
                    }) 
                })

            }

            console.log(lettersProspect.split(''));
            console.log(answers.split(''));
        }
    }
}

const saltoDeLinea = () => {
    letterIndex = 0;
    letterRowIndex++;
}
const moverCursorAdelante = () => {
    let nexLetterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
    nexLetterBox.classList.add("selected-letter");
}

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(deteleLetter)
onKeyDown$.subscribe(checkWord)
userWinOrLoose$.subscribe((value) => {
    // Verifico toda la palabra
    const textDisplay = document.getElementsByClassName('message-text')[0];
    textDisplay.textContent = 'Iguales';
    Array.from(letterRows)[letterRowIndex].children[4].classList.remove("selected-letter")
    console.log('letterIndex',letterIndex);
    console.log('letterRowIndex',letterRowIndex);
    // pongo en verde toda la fila
    /*
    console.log(Array.from(letterRows)[letterRowIndex].children);
    */
    Array.from(Array.from(letterRows)[letterRowIndex].children).map(box => {
        box.classList.add("good-position-letter")
    })

    saltoDeLinea();
    moverCursorAdelante()
})

const onClick$ = fromEvent(document, "click");
const clicListener = {
    next: (event) =>{ 
        //console.log(event)
    }
}
onClick$.subscribe(clicListener);
