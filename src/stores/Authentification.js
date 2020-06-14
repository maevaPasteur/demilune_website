class Authentification {

    constructor() {
        this.state = {
            auth: localStorage.getItem('usertoken') && localStorage.getItem('usertoken') !== ''
        };
    }

    logout() {
        localStorage.removeItem('usertoken');
        this.state.auth = false;
    }

    login(token) {
        localStorage.setItem('usertoken', token);
        this.state.auth = true;
    }

}

export default new Authentification();