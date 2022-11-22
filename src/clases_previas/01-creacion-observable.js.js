import {Observable} from 'rxjs'
//Observable, fuente de información
const observableAlfa$ = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(3);
    //subscriber.complete();
    //a; // Error
    subscriber.next(4);
    subscriber.next(5);
    subscriber.next('Curso');
    subscriber.next({test: true});
})

const observador = {
    next: (value) =>{
        console.log(value)
    },
    complete: () =>{
        console.log('Observable completado')
    },
    // El error no se implementa inplícitamente 
    error: (error) =>{
        console.log('Error en el observable: ')
        console.error(error)
    },
}

observableAlfa$.subscribe(observador);