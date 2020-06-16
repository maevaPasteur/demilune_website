<template>
    <Layout2 v-if="auth">
        <div class="wrapper">
            <router-link :to="{ name: 'Pages' }">Voir toutes les pages</router-link>
            <form @submit.prevent="submit" @click="success = false" v-if="ready">
                <div>
                    <h2>Ajouter une page</h2>
                    <label>
                        <span>Titre</span>
                        <input type="text" required v-model="page.title"/>
                    </label>
                    <label>
                        <span>Description (optionel)</span>
                        <input type="text" v-model="page.description"/>
                    </label>
                    <div class="create-content">
                        <h3>Choisir son contenu</h3>
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
                <button type="submit" class="link-2">Créer la nouvelle page</button>
            </form>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'PagesCreate',
        components: {Layout2},
        computed: {
            auth() {
                return Authentification.state.auth
            }
        },
        async mounted() {
            if(!this.auth) {
                window.location.href = 'connexion';
            }
            let date = new Date;
            this.page.id = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'-'+date.getHours()+'-'+date.getSeconds()+'-'+date.getMilliseconds();
            const types = await this.getMealsType();
            const allMeals = await this.getMeals();
            types.forEach(type => {
                let result = allMeals.filter(word => word.type === type._id);
                if(result.length) {
                    this.meals[type.title] = result;
                }
            });
            this.ready = true
        },
        data() {
            return {
                success: false,
                ready: false,
                meals: {},
                checked: [],
                page: {
                    title: null,
                    content: [],
                    description: null
                }
            }
        },
        methods: {
            generateId() {
                let date = new Date;
                this.page.id = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'-'+date.getHours()+'-'+date.getSeconds()+'-'+date.getMilliseconds();
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
            },
            submit() {
                axios
                    .post('http://localhost:3000/pages', {
                        headers: {'Access-Control-Allow-Origin': '*'},
                        page: this.page
                    })
                    .then(res => {
                        this.success = true;
                        this.page = {
                            title: undefined,
                            description: undefined,
                            content: []
                        };
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>


