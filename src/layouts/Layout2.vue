<template>
    <div class="page-admin">
        <header>
            <router-link to="/">
                <img src="../assets/images/logo_1.svg" alt="logo du restaurant la Demi-lune à Dole">
                <p>Accueil</p>
            </router-link>
            <button @click="logout">Déconnexion</button>
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
            position: relative;
            a {
                padding: 0;
                display: flex;
                align-items: center;
            }
        }
    }
</style>