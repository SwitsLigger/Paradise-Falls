const container = document.queryselector('.container');

const box = document.getElementById('box');
const button = document.querySelector('button');

button.addEventListener("click", () => {

const boxStyle = box.style.background;

if (boxStyle === 'red') {

box.style.background = 'red';

} else {
    box.style.background = 'blue';
}


});