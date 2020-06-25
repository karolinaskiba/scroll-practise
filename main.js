document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const rootElement = document.querySelector('#root');
    const section = document.querySelectorAll('section');

    document.addEventListener('mousewheel', (e) => {
        console.log(e.wheelDelta)
    })
});