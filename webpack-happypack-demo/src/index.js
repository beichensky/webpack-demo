function createSpan() {
    const element = document.createElement('span');
    element.innerHTML = 'Hello, Happypack';
    return element;
}

document.querySelector('#root').appendChild(createSpan());