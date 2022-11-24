import {from, of} from 'rxjs';

const fruitsFrom$ = from(["apple", "tangerine", "pear", "banana"]);
const fruitsOf$ = of("apple", "tangerine", "pear", "banana");

fruitsOf$.subscribe(console.log)