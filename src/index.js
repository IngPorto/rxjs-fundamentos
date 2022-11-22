import { fromEvent } from 'rxjs';

//const onMouseMove$ = fromEvent(document, "mousemove");
const onKeyDown$ = fromEvent(document, "keydown");

const observadorMouse = {
    next: (event)=> {
        console.log({
            event: event,
            key: event.key,
            coor: `${event.clientX} - ${event.clientY}`,
        });
    },
    complete: () => {
		console.log("There is no more events");
	},
	error: (error) => {
		console.log("Something went wrong: ", error.message);
	}
};

onKeyDown$.subscribe(observadorMouse);