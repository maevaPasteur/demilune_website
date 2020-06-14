<template>
    <Layout2 v-if="auth">
        <div class="wrapper" v-if="pages">
            <div v-if="pages.length">
                <h1>La liste des pages de la carte</h1>
                <router-link :to="{ name: 'PagesCreate' }">Créer une page +</router-link>

                <div class="container-drag">
                    <div v-for="page in pages" :key="page.title">
                        <p>{{ page.title }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1>Vous n'avez créé aucune page pour le moment</h1>
                <router-link class="link-2" :to="{ name: 'PagesCreate' }">Créer une page +</router-link>
            </div>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'Pages',
        components: {Layout2},
        computed: {
            auth() {
                return Authentification.state.auth
            }
        },
        async mounted() {
            axios
                .get('http://localhost:3000/pages', {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(res => {
                    this.pages = res.data;
                    console.log(this.pages)
                })
                .catch(err => {
                    this.pages = [];
                    console.log(err);
                })
        },
        data() {
            return {
                pages: undefined
            }
        }
    }
</script>

<style lang="scss">

</style>
