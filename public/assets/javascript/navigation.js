class Navigation {
    navigationContainer = null;

    init(navigationContainer) {
        this.navigationContainer = navigationContainer;
        this.#initListener();
    }

    #initListener() {
        const that = this;
        const navigation = this.navigationContainer.querySelector('.sidenav');
        let burger = this.navigationContainer.querySelector('#burger');
        let closeButton = this.navigationContainer.querySelector('#close-navigation');

        burger.addEventListener('click', function() {
            that.open(navigation);
        });

        closeButton.addEventListener('click', function() {
            that.close(navigation);
        });
    }

    open(navigation) {
        console.log(navigation);
        navigation.style.display = 'block';
    }

    close(navigation) {
        navigation.style.display = 'none';
    }
}

let navigationContainer = document.querySelector('#sidenav-container');
let navigation = new Navigation();
navigation.init(navigationContainer);