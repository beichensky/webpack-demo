import { join } from 'lodash';

function createSpan(){
    const element = document.createElement('span');
    element.innerHTML = join(['Hello', 'DllPlugin'], ' , ');
    return element;
}

document.querySelector('#root').appendChild(createSpan());