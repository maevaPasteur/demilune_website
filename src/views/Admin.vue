<template>
    <Layout2 v-if="auth">
        <h1>Bravo tu es co!</h1>
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

</style>
