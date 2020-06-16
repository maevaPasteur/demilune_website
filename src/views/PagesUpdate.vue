<template>
    <Layout2 v-if="auth && ready">
        <div class="wrapper section-new-page large">
            <div v-if="page">
                <h1>Modifier la page : {{ page.title }}</h1>
                <router-link :to="{ name: 'Pages' }">Voir toutes les pages</router-link>
                <form @submit.prevent="submit" @click="success = false">
                    <div class="d-flex full">
                        <div>
                            <div>
                                <h2>Mettre à jour la page</h2>
                                <label>
                                    <span>Titre</span>
                                    <input type="text" required v-model="page.title"/>
                                </label>
                                <div class="create-content">
                                    <h3>Ajouter ou supprimer des plats</h3>
                                    <details v-for="(type, key) in meals" :key="key">
                                        <summary><h2>{{ key }}</h2></summary>
                                        <label v-for="meal in type" :key="meal.title">
                                            <input type="checkbox" :id="meal.id" :value="meal._id" v-model="page.content">
                                            <span>{{ meal.title }}</span>
                                        </label>
                                    </details>
                                </div>
                            </div>
                            <p v-if="success" class="success">La page a bien été créé</p>
                            <button type="submit" class="link-2">Enregistrer les modifications</button>
                            <button @click.prevent="deletePage" class="link-2 delete">Supprimer</button>
                        </div>
                        <div class="drag">
                            <h2>Ordre</h2>
                            <p>Pour changer l'odre des plats faites glisser les blocks</p>
                            <draggable v-model="page.content" class="container-drag">
                                <transition-group>
                                    <div v-for="item in page.content" :key="item" class="item">
                                        {{ title(item) }}
                                    </div>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else>
                <h1>Aucune page ne correspond à cette url</h1>
                <router-link class="link-2" :to="{ name: 'Pages' }">Voir toutes les pages</router-link>
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
        name: 'PagesUpdate',
        components: {Layout2, draggable},
        computed: {
            auth() {
                return Authentification.state.auth
            }
        },
        async mounted() {
            if(!this.auth) {
                window.location.href = 'connexion';
            }
            await this.getPage();
            const types = await this.getMealsType();
            this.allMeals = await this.getMeals();
            types.forEach(type => {
                let result = this.allMeals.filter(word => word.type === type._id);
                if(result.length) {
                    this.meals[type.title] = result;
                }
            });
            this.ready = true
        },
        data() {
            return {
                generalId: undefined,
                success: false,
                ready: false,
                page: undefined,
                pages: undefined,
                meals: {},
                allMeals: undefined
            }
        },
        methods: {
            title(id) {
                let title = '';
                this.allMeals.forEach(meal => {
                    if(meal._id === id) {
                        title = meal.title;
                    }
                });
                return title
            },
            async submit() {
                await this.updatePages(this.pages);
                this.success = true;
            },
            async deletePage() {
                let newPages = [];
                this.pages.forEach(page => {
                    if(page.id !== this.$route.params.id) {
                        newPages.push(page)
                    }
                });
                await this.updatePages(newPages);
                window.location.href = '/admin/pages'
            },
            updatePages(pages) {
                return new Promise(resolve => {
                    axios
                        .get('http://localhost:3000/general', {headers: {'Access-Control-Allow-Origin': '*'}})
                        .then(res => {
                            axios
                                .patch(`http://localhost:3000/general/${res.data[0]._id}`, {
                                    headers: {'Access-Control-Allow-Origin': '*'},
                                    pages: pages
                                })
                                .then(res => {
                                    console.log(res);
                                    resolve();
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            },
            getPage() {
                return new Promise(resolve => {
                    axios
                        .get('http://localhost:3000/general', {headers: {'Access-Control-Allow-Origin': '*'}})
                        .then(res => {
                            this.pages = res.data[0].pages;
                            this.page = this.pages.filter(item => item.id === this.$route.params.id)[0];
                            this.generalId = res.data[0]._id;
                            resolve(res)
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
            },
            getMealsType() {
                return new Promise(resolve => {
                    axios
                        .get('http://localhost:3000/types', {
                            headers: {'Access-Control-Allow-Origin': '*'}
                        })
                        .then(res => {
                            resolve(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            },
            getMeals() {
                return new Promise(resolve => {
                    axios
                        .get('http://localhost:3000/meals', {
                            headers: {'Access-Control-Allow-Origin': '*'}
                        })
                        .then(res => {
                            resolve(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            }
        }
    }
</script>


