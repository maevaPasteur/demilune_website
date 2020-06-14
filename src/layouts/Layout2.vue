<template>
    <div class="page-admin">
        <header>
            <router-link to="/"><img src="../assets/images/logo_1.svg" alt="logo du restaurant la Demi-lune à Dole"></router-link>
            <nav>
                <ul>
                    <li>
                        <router-link to="/admin">Paramètres globaux</router-link>
                    </li>
                    <li>
                        <router-link to="/admin">La carte</router-link>
                    </li>
                    <li>
                        <router-link to="/admin">Les pages</router-link>
                    </li>
                    <li>
                        <router-link to="/admin">Les menus</router-link>
                    </li>
                    <li>
                        <router-link to="/admin">Les plats</router-link>
                    </li>
                    <li>
                        <router-link to="/admin">Les types de plats</router-link>
                    </li>
                </ul>
            </nav>
            <button class="link-2" @click="logout">Déconnexion</button>
        </header>
        <main>
            <slot/>
        </main>
    </div>
</template>

<script>

    import Authentification from "../stores/Authentification";

    export default {
        name: 'Layout2',
        methods: {
            logout() {
                Authentification.logout();
                window.location.href = 'connexion';
            }
        }
    }
</script>

<style lang="scss">
    .page-admin {
        header {
            padding: 5px 20px;
            font-size: 18px;
            position: relative;
            pointer-events: all;
            ul {
                display: flex;
                align-items: center;
            }
            img {
                width: 50px;
            }
            button, a {
                font-weight: 400;
                font-size: 15px;
            }
            button {
                padding: 12px 15px 8px;
            }
            a {
                padding: 0;
            }
            li:not(:last-of-type) {
                margin-right: 20px;
            }
        }
        main {
            display: flex;
            background-color: #eee;
            min-height: calc(100vh - 67px);
            aside {
                width: 200px;
                background-color: #000;
                color: #fff;
                padding: 20px;
                font-weight: 300;
                min-height: calc(100vh - 40px);
            }
        }
        .wrapper {
            margin-top: 100px;
        }
    }
</style>