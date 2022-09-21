class Navigation {
    navigationContainer = null;

    init(navigationContainer) {
        this.navigationContainer = navigationContainer;
        this.#initListener();
    }

    #initListener() {
        const that = this;
        const navigation = this.navigationContainer.querySelector('.sidenav');
        const openButton = this.navigationContainer.querySelector('#burgerbtn');
        const closeButton = this.navigationContainer.querySelector('#close-navigation');
        const navigationItems = this.navigationContainer.querySelectorAll('li a');

        this.#setActiveLink(navigationItems);

        openButton.addEventListener('click', function() {
            that.open(navigation, openButton, closeButton, navigationItems);
        });

        closeButton.addEventListener('click', function() {
            that.close(navigation, openButton, closeButton, navigationItems);
        });
    }

    #setActiveLink(navigationLinks) {
        let currentModule = document.querySelector('[data-module]');
        navigationLinks.forEach(function (link, currenModule) {
            if (currentModule.dataset.module === link.dataset.moduleLink) {
                link.classList.add('active');
            }
        });
    }

    open(navigation, openbtn, closebtn, navigationItems) {
        openbtn.style.display = 'none';
        closebtn.style.display = 'block';
        navigation.style.width = '20%';

        navigationItems.forEach(function (item) {
            item.querySelector('span').style.display = '';
        });
    }

    close(navigation, openbtn, closebtn, navigationItems) {
        openbtn.style.display = 'block';
        closebtn.style.display = 'none';
        navigation.style.width = '5%';

        navigationItems.forEach(function (item) {
            item.querySelector('span').style.display = 'none';
        });
    }
}

let navigationContainer = document.querySelector('#sidenav-container');
let navigation = new Navigation();
navigation.init(navigationContainer);