<template>
    <Layout2 v-if="auth">
        <div class="wrapper section-admin-1">
            <h1>Bienvenue</h1>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    export default {
        name: 'Admin',
        components: {Layout2},
        computed: {
          auth() {
              return Authentification.state.auth
          }
        },
        mounted() {
            if(!this.auth) {
                window.location.href = 'connexion';
            }
        }
    }
</script>

<style lang="scss">
    .section-admin-1 {
        h1 {
            font-size: 30px;
        }
    }
</style>
