<template>
    <Layout2 v-if="auth">
        <div class="wrapper" v-if="pages">
            <div v-if="pages.length" class="container-drag">
                <h1>La liste des pages de la carte</h1>
                <h2 v-if="pages.length > 1">Faites glisser les blocks pour changer l'ordre des pages et menus dans la carte</h2>
                <draggable v-model="pages" @change="saveOrder">
                    <transition-group>
                        <div v-for="page in pages" :key="page.title" class="item">
                            <p>{{page.title}}</p>
                            <router-link class="link-1" :to="{ name: 'PagesUpdate', params: { id: page.id } }"><span>Modifier</span></router-link>
                        </div>
                    </transition-group>
                </draggable>
                <router-link class="link-2" :to="{ name: 'PagesCreate' }">Créer une page +</router-link>
            </div>
            <div v-else>
                <h1>Vous n'avez créé aucune page ni menu pour le moment</h1>
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
                .get('http://localhost:3000/general', {headers: {'Access-Control-Allow-Origin': '*'}})
                .then(res => {
                    this.generalId = res.data[0]._id;
                    this.pages = res.data[0].pages;
                    console.log(this.pages)
                })
                .catch(err => {
                    this.pages = [];
                    console.log(err);
                })
        },
        data() {
            return {
                pages: undefined,
                generalId: undefined
            }
        },
        methods: {
            saveOrder() {
                axios
                    .get('http://localhost:3000/general', {headers: {'Access-Control-Allow-Origin': '*'}})
                    .then(res => {
                        let pages = res.data[0].pages;
                        pages.push(this.page);
                        axios
                            .patch(`http://localhost:3000/general/${ this.generalId }`, {
                                headers: {'Access-Control-Allow-Origin': '*'},
                                pages: this.pages
                            })
                            .then(res => {
                                console.log(res);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>

<style lang="scss">

</style>
