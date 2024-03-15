/*NUMBER */
/*let x = 1;
let y = 10;
let c = x - y;*/

/*STRING*/
/*let name = "hola";
let name_1 = 'hola';*/

/*boleano */
/*let a = true;
let b = false;*/

/*alert(c);*/


/*let button = document.getElementById("btn"); /*interacciòn con el boton agregado en index*/

/*DOM: es la estructura del HTML */

/*console.log(button); /*imprimir la acciòn */

/*function es_primo(n){
    if (n <= 1)
        return false;

    for(let i = 2; i < n; i ++)
        if(n % i === 0)
            return false;

    return true; 
}

/* dentro de los 100 números imprimir solo los primos 
for(let i = 1; i <= 100; i ++)
    if (es_primo(i))
        console.log(i);

/*Imprimir los primeros 100 números primos
let cont = 0;
for(let i = 1; cont <= 100; i ++)
    if (es_primo(i))
        console.log(i);
        cont++;
        /*cont = cont + 1;
        cont += 1; FORMAS QUE SE PUEDEN AGREGAR LOS CONTADORES*/

//forma de recuperar un elemento
const containerClicks = document.getElementById('container-clicks');
const btnIncrement = document.querySelector('.btn-primary');
const btnDecrement = document.querySelector('.btn-secondary');
const btnReset = document.querySelector('.btn-reset');

let counter = 0;

btnIncrement.onclick = function(){
    counter ++;
    containerClicks.innerText = counter;

}

btnDecrement.onclick = function(){
    counter --;
    containerClicks.innerText = counter;
}

btnReset.onclick = function(){
    counter = 0;
    containerClicks.innerText = counter;
}
//console.log(containerClicks);//