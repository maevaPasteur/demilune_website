<template>
    <Layout2 v-if="auth">
        <div class="wrapper" v-if="pages">
            <div v-if="pages.length" class="container-drag">
                <h1>La liste des pages de la carte</h1>
                <h2>Faites coulisser les blocks pour changer l'ordre des pages et menus</h2>
                <draggable v-model="pages" @change="saveOrder">
                    <transition-group>
                        <div v-for="page in pages" :key="page._id" class="item">
                            {{page.title}}
                        </div>
                    </transition-group>
                </draggable>
                <router-link class="link-2" :to="{ name: 'PagesCreate' }">Créer une page +</router-link>
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

    import draggable from 'vuedraggable';
    import axios from 'axios';

    export default {
        name: 'Pages',
        components: {Layout2, draggable},
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
        },
        methods: {
            saveOrder() {
                console.log(this.pages)
            }
        }
    }
</script>

<style lang="scss">

</style>
