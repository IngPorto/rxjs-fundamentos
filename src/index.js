import { Observable, Subject } from 'rxjs';

const numbers$ = new Observable(subscriber => {
    const random = Math.round(Math.random() *100);
    subscriber.next(random)
});

const numberRamdom$ = new Subject();

const observador1 = {
    next: number => {
        console.log(number);
    }
}

const observador2 = {
    next: number => {
        console.log(number);
    }
}

//numbers$.subscribe(observador1)
//numbers$.subscribe(observador2)

numberRamdom$.subscribe(observador1)
numberRamdom$.subscribe(observador2)

// Tiene que estar después de la suscripción
//numberRamdom$.next(Math.round(Math.random() *100))

// Puede suscribir al objeto Subject a un observable
// así unificar los mensajes enviados por el observable
numbers$.subscribe(numberRamdom$)

// Puedo ejecutar de nuevo la función .next() cambiando los
// parámetros de entrada. Se envía a cada suscriptor
numberRamdom$.next(4646464)
