class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');
        const sectionArr = [...this.sections];
        const currentSectionIndex = sectionArr.findIndex(this.isScrollIntoView);
        this.currentSectionIndex = Math.max(currentSectionIndex, 0);
        this.currentSectionIndex = 0;
        this.isTrottled = false;
        this.scroll = this.scroll.bind(this); // <=> arrow function

        this.drawNavigation();
    }

    isScrollIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = Math.floor(rect.top);
        const elemBottom = Math.floor(rect.bottom);


        const isVissible = (elemTop > 0) && (elemBottom <= window.innerHeight);
        return isVissible;
    }


    listenScroll = (e) => {

        if (this.isTrottled) return;
        this.isTrottled = true;
        setTimeout(() => {
            this.isTrottled = false;
        }, 1000)
        const direction = e.wheelDelta < 0 ? 1 : -1;

        this.scroll(direction)



    }
    scroll = function (direction) {
        if (direction === 1) {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) return;
        } else if (direction === -1) {
            const firstSection = this.currentSectionIndex === 0;
            if (firstSection) return
        }
        this.currentSectionIndex = this.currentSectionIndex + direction;
        this.scrollToCurrentSection();

    }
    scrollToCurrentSection = () => {
        this.selectAtiveNavItem();
        this.sections[this.currentSectionIndex].scrollIntoView({ behavior: "smooth" })
    }
    drawNavigation = () => {
        this.navigationContainer = document.createElement('aside');
        this.navigationContainer.setAttribute('class', 'scroller__navigation');
        const list = document.createElement('ul');

        this.sections.forEach((section, index) => {
            const listItem = document.createElement('li');
            listItem.addEventListener('click', () => {
                this.currentSectionIndex = index;
                this.scrollToCurrentSection();
            })
            list.appendChild(listItem);
            this.navigationContainer.appendChild(list);

            document.body.appendChild(this.navigationContainer);

            this.selectAtiveNavItem();

        })
    }

    selectAtiveNavItem = () => {
        if (this.navigationContainer) {
            const naviItem = this.navigationContainer.querySelectorAll('li');

            naviItem.forEach((item, index) => {
                if (index === this.currentSectionIndex) {
                    item.classList.add('active')
                } else {
                    item.classList.remove('active');
                }

            })
        }
    }

}