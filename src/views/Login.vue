<template>
    <div class="page-login wrapper">
        <img src="../assets/images/logo_1.svg" alt="logo du restaurant la Demi-lune à Dole">
        <h1>Connexion</h1>
        <form @submit.prevent="submit">
            <p v-if="errorMessage" class="error"></p>
            <input type="text" name="username" required v-model="username" placeholder="Identifiant" />
            <input type="password" name="password" required v-model="password" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
            <p v-if="error" class="error">Nom d'utilisateur et mot de passe incorrectes</p>
        </form>
    </div>
</template>

<script>

    import axios from 'axios';
    import Authentification from "../stores/Authentification";

    export default {
        name: 'Login',
        data() {
            return {
                username: "",
                password: "",
                error: false
            }
        },
        props: {
            errorMessage: {
                type: String,
                default: ""
            }
        },
        methods: {
            submit() {
               axios
                   .post('http://localhost:3000/users/login', {
                       username: this.username,
                       password: this.password,
                       headers: {'Access-Control-Allow-Origin': '*'}
                   })
                   .then(res => {
                       if(res.data.error) {
                           this.error = true;
                       } else {
                           Authentification.login(res.data);
                           window.location.href = 'admin';
                       }
                   })
                   .catch(err => {
                       console.log('La connexion a échoué', err)
                   })
            }
        }
    }
</script>

<style lang="scss">
    .page-login {
        padding-bottom: 100px;
        min-height: calc(100vh - 100px);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img {
            margin-bottom: 20px;
            width: 100px;
        }
        h1 {
            font-size: 30px;
            margin-bottom: 20px;
        }
        input {
            display: block;
            border: solid 1px #000;
            margin-bottom: 10px;
            padding: 10px;
            font-size: 15px;
            width: 400px;
            &::placeholder {
                font-size: 15px;
            }
        }
        button {
            background: #000;
            height: 40px;
            color: #fff;
            width: 420px;
            font-size: 15px;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: .5px;
            cursor: pointer;
            transition: background ease-out .3s;
            &:hover {
                background: #333;
            }
        }
        .error {
            color: red;
            margin-top: 20px;
            text-align: center;
            font-weight: 300;
        }
    }
</style>
