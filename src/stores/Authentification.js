class Authentification {

    constructor() {
        this.state = {
            auth: localStorage.getItem('usertoken') && localStorage.getItem('usertoken') !== ''
        };
        console.log('hello', this.state.auth)
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