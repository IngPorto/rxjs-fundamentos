# rxjs-fundamentos
[diapositivas](https://static.platzi.com/media/public/uploads/2-slides-del-curso-de-programacion-reactiva-con-rxjs_dc67a054-992f-4bea-9bd9-c440fab6b94c.pdf)

## Beneficios
---
* Base de código mucho más legible (simplifica el callback hell)
* Simplifica los procesos asíncronos
* Simplifica la transformación de información
* Uso creciente en la industria tech

Nota: 
* Red de descubrimiento de nuevos paquetes JS: [openbase](https://openbase.com/) 
* [ReactiveX](https://reactivex.io)

## Teoría
---
**Observable:** Puede emitir cualquier tipo de valores respecto al tiempo. Emite la señal de que ha sucedido y qué sucedió. 

**Suscripción:** Es como un EventListener que permite escuchar eventos.

**Observador:** Quien se suscribe a un observable.

**El sistema:** Reacciona a una acción realizada o evento emitido.

### ReactiveX
`ReactiveX != RxJS`
* RxJS es una implementación de ReactiveX orientada a JS.
* Basada en programación funcional.
* Reduce código con métodos.
* Manejo de errores para código asíncrono.
* Desarrollo sencillo de código asíncrono.

Sistemas asíncronos a gran escala con el patrón `Observer` y `Iterator`.
Nace en .NET, luego en Java.

### Reactividad
```html
<OBSERVABLE> <---<SUSCRIPCIÓN>---| <OBSERVADOR>
```

**Observable Contract**
**Métodos para interectuar con el Observable**
NEXT: Se ejecuta cada vez que el observable decide enviarle un mensaje a un Observador.
COMPLETE: Método que envía un mensaje de completado al observador. Notifica que no serán enviados más mensajes.
ERROR: Cuando falla algo en el observable. Viene con información y deja de emitir valores.

**Métodos para interactuar con el Observador**
SUBSCRIBE: Vincularse a un Observable. Petición de obtener información.
UNSUBSCRIBE: Eliminar la relación de vinculación.

Sistema Push: El observable envía sin que le pidan
Evaluación Lazy: Esta función no es ejecutada hasta que se llame. Si un observable no tiene un observador, no emitirá mensajes.

**Diagrama de canicas**
[rxmarbles](https://rxmarbles.com/)

OPERADOR: Transforma los valores de un observable a otro observable

### Subject
Operador que permite unificar un mensaje emitido por un Observable. Permite la multi-difusión o multi-cast.

* Es un tipo de observador que puede suscibirse a otros observables.
* Permite agregar parámetos a su función .next() después de ser inicializada.

### From y Of
Permite la creación de Observables. Al suscribirse a uno de estos operadores, se pasa como parámetros una función a la cual es le entregará cada parámetro entregado en la inicialización del Observable.

- **From**:
Creación de Observable a partir de un arreglo. El último parámetros del arreglo es donde el Observable emite el `Complete`.

- **Of**:
Creación de Observable a partir de un *n* candidad de parámetros de entrada. El último parámetro de entrada detemina donde el Observable emite el `Complete`.

### asynSchedulers
Envía las operacione al Queue de JS

**Cómo funcionan las operaciones no bloqueantes:**
(Operación o tarea js) --[cuando inicia el programa va a]--> `Call Stack` --[Si es una tarea bloqueante, que dura un tiempo, se envía a]--> `Thread Pool` --[cuando se completa la operación se envía a]--> `Queue` ---[una vez el programa complete un ciclo, envía las tareas pendientes a]---> `Call Stack`

## Práctica 
---

### fromEvent
Crea un observable que emite eventos de un determinado elemento
```
fromEvent(elemento,'click')
```
### PlatziWordle
**Desarrollo de proyecto**
1. Instrucciones para inicializar nuestro proyecto
```
npm i rxjs webpack webpack-dev-server
npm i -D webpack-cli
```
2. Crea tu archivo de configuración con Webpack
```
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'development'
}
```
3. En la propiedad scripts de package.json añade:
```
"scripts": {
    "start": "webpack server"
}
```