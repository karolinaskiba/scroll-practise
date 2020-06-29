document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const rootElement = document.querySelector('#root');
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isTrottled = false;

    document.addEventListener('mousewheel', (e) => {
        if (isTrottled) return;
        isTrottled = true;
        setTimeout(function () {
            isTrottled = false;
        }, 1000)
        const direction = e.wheelDelta < 0 ? 1 : -1;
        scroll(direction)


        currentSectionIndex = currentSectionIndex + direction;
        console.log(currentSectionIndex);
        scrollToCurrentSection();


    })


    function scrollToCurrentSection() {
        sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" })
    }

    function scroll(direction) {

        if (direction === 1) {
            const isLastSection = currentSectionIndex === sections.length - 1;
            if (isLastSection) return;
        } else if (direction === -1) {
            const firstSection = currentSectionIndex === 0;
            if (firstSection) return
        }
    }

});