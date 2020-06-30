document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const scroller = new Scroller('#root')

    document.addEventListener('mousewheel', scroller.listenScroll)

});