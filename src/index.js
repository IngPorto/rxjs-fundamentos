import { fromEvent } from "rxjs";

// interfaz gráfica
const letterRows = document.getElementsByClassName('letter-row');
let letterIndex = 0;
let letterRowIndex = 0;
Array.from(letterRows)[letterRowIndex].children[letterIndex].classList.add("selected-letter")
console.log(`letterIndex:${letterIndex} - letterRowIndex: ${letterRowIndex}`);

// eventos
const onKeyDown$ = fromEvent(document, "keydown");

const insertLetter = {
    next: (event)=>{
        const pressedKey = event.key.toUpperCase();
        // solo letras y de tamaño 1
        if(pressedKey.length == 1 && pressedKey.match(/[a-z]/i)){
            let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            letterBox.textContent = pressedKey;
            letterBox.classList.add("filled-letter");
            letterBox.classList.remove("selected-letter");
            if(letterIndex < 4){
                letterIndex++;
            }else if(letterRowIndex < 5) {
                letterIndex = 0;
                letterRowIndex++;
            } else {
            }
            let nexLetterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            nexLetterBox.classList.add("selected-letter");
            console.log(`letterIndex:${letterIndex} - letterRowIndex: ${letterRowIndex}`);
        }
    }
}

const deteleLetter = {
    next: (event) => {
        if(event.key == 'Backspace'){
            let prevLetterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex]
            prevLetterBox.classList.remove("selected-letter");
            
            if(letterIndex == 4 && letterRowIndex == 5){
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

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(deteleLetter)

const onClick$ = fromEvent(document, "click");
const clicListener = {
    next: (event) =>{ 
        //console.log(event)
    }
}
onClick$.subscribe(clicListener);
