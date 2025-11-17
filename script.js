document.addEventListener('DOMContentLoaded', () => {
    // --- Konfiguration ---
    const SCROLL_DEBOUNCE_MS = 50;
    const VIEWPORT_REFERENCE_PERCENT = 0.6;

    // --- DOM-Elemente ---
    const dynamicTextElement = document.getElementById('dynamic-text');
    const projectDescriptions = document.querySelectorAll('.project-description');
    const navigationAbove = document.getElementById('navigation-above');
    const navigationBelow = document.getElementById('navigation-below');
    const sections = document.querySelectorAll('section');
    const rightColumn = document.querySelector('.right-column');
    const imagesForDynamicText = document.querySelectorAll('.Bilder[data-description]');
    const fixedHeader = document.querySelector('.fixed-header'); //Header hier definieren

    // --- Hilfsfunktionen ---
    const isElementAtReferencePoint = (element, referencePoint) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= referencePoint && rect.bottom >= referencePoint;
    };

    sections.forEach((section, index) => {
        const link = document.createElement('a');
        link.href = `#${section.id}`;
        link.textContent = section.getAttribute('data-nav-name') || section.id;
        link.dataset.targetSection = section.id;

        link.addEventListener('click', (event) => {
            event.preventDefault();

            if (section.id === 'Info') {
                const infoSection = document.getElementById('Info');
                const targetPosition = infoSection.offsetTop - (0.2 * window.innerHeight);

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const updateActiveSection = () => {
        const referencePoint = window.innerHeight * VIEWPORT_REFERENCE_PERCENT;
        let activeIndex = -1;

        sections.forEach((section, index) => {
            if (isElementAtReferencePoint(section, referencePoint)) {
                activeIndex = index;
            }
        });

        projectDescriptions.forEach((desc, index) => {
            const sectionId = desc.id.replace('-text', '');
            const sectionIndex = Array.from(sections).findIndex(sec => sec.id === sectionId);

            desc.style.display = (sectionIndex === activeIndex) ? 'block' : 'none';
        });

        return activeIndex;
    };

    const updateNavigationDisplay = (activeIndex) => {
        navigationAbove.innerHTML = '';
        navigationBelow.innerHTML = '';

        if (activeIndex === 0) {
            sections.forEach((section, index) => {
                if (section.id === 'home') {
                    return;
                }

                const link = document.createElement('a');
                link.href = `#${section.id}`;
                link.textContent = section.getAttribute('data-nav-name') || section.id;
                link.dataset.targetSection = section.id;

                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                navigationAbove.appendChild(link);
            });
            return;
        }

        sections.forEach((section, index) => {
            if (section.id === 'home') {
                return;
            }

            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.textContent = section.getAttribute('data-nav-name') || section.id;
            link.dataset.targetSection = section.id;

            link.addEventListener('click', (event) => {
                event.preventDefault();
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            if (index === activeIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }

            if (index === activeIndex) {
                navigationAbove.appendChild(link);
            } else if (activeIndex !== -1 && index > activeIndex) {
                navigationBelow.appendChild(link);
            } else {
                navigationAbove.appendChild(link);
            }
        });
    };

    const updateDynamicText = () => {
        const referencePoint = window.innerHeight * VIEWPORT_REFERENCE_PERCENT;
        let textToShow = '';
        let activeImageFound = false;

        imagesForDynamicText.forEach(image => {
            if (!activeImageFound && isElementAtReferencePoint(image, referencePoint)) {
                const description = image.getAttribute('data-description');
                if (description) {
                    textToShow = `<p>${description}</p>`;
                    activeImageFound = true;
                }
            }
        });
        dynamicTextElement.innerHTML = textToShow;
    };

    // --- Header Logik ---
    const handleHeaderScroll = () => {
        if (window.innerWidth <= 768 && rightColumn && fixedHeader) {
            const scrollTop = rightColumn.scrollTop;
            const headerHeight = fixedHeader.offsetHeight;

            if (scrollTop > headerHeight) {
                fixedHeader.style.transform = `translateY(-${headerHeight}px)`;
                fixedHeader.style.transition = 'transform 0.3s ease';
            } else {
                fixedHeader.style.transform = 'translateY(0)';
            }
        }
    };

    // --- Haupt-Update und Event Listener ---
    let scrollTimeout;
    const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const activeSectionIndex = updateActiveSection();
            updateNavigationDisplay(activeSectionIndex);
            updateDynamicText();
            handleHeaderScroll(); // Header Logik hier integriert
        }, SCROLL_DEBOUNCE_MS);
    };

    const initialize = () => {
        const activeSectionIndex = updateActiveSection();
        updateNavigationDisplay(activeSectionIndex);
        updateDynamicText();
    };

    // Event Listener
    window.addEventListener('load', () => {
        initialize();
        handleHeaderScroll(); // Header auch beim Laden initialisieren!
    });

    const scrollContainer = rightColumn || window;
    scrollContainer.addEventListener('scroll', handleScroll);

    if (!rightColumn) {
        console.warn('Kein .right-column Element gefunden, Scroll-Event Listener an window angehängt.');
    }

    // 6. Mobile Menü-Button
    const toggleButton = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (toggleButton && mobileMenu) {
        toggleButton.addEventListener('click', () => {
            console.log('Toggle Button clicked');
            mobileMenu.classList.toggle('open');
            console.log('Menu classes:', mobileMenu.className);
        });
    }
});