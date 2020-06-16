<template>
    <Layout2 v-if="auth">
        <div class="wrapper">
            <router-link :to="{ name: 'Menus' }">Voir tous les menus</router-link>
            <form @submit.prevent="submit" @click="success = false" v-if="ready">
                <div>
                    <h2>Ajouter une page</h2>
                    <label>
                        <span>Titre</span>
                        <input type="text" required v-model="menu.title"/>
                    </label>
                    <label>
                        <span>Prix</span>
                        <input type="number" step="0.01" required v-model="menu.price"/>
                    </label>
                    <label>
                        <span>Description (optionnel)</span>
                        <textarea v-model="menu.description"></textarea>
                    </label>
                    <div class="create-content">
                        <h3>Choisir son contenu</h3>
                        <details v-for="(type, key) in meals" :key="key">
                            <summary><h2>{{ key }}</h2></summary>
                            <label v-for="meal in type" :key="meal.title">
                                <input v-if="getMealModel(key) === 'starter'" type="checkbox" :id="meal.id" :value="meal._id" v-model="menu.starters">
                                <input v-else-if="getMealModel(key) === 'dessert'" type="checkbox" :id="meal.id" :value="meal._id" v-model="menu.desserts">
                                <input v-else type="checkbox" :id="meal.id" :value="meal._id" v-model="menu.meals">
                                <span>{{ meal.title }}</span>
                            </label>
                        </details>
                    </div>
                </div>
                <p v-if="success" class="success">Le menu a bien été créé</p>
                <button type="submit" class="link-2">Créer le menu</button>
            </form>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'MenusCreate',
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
            const types = await this.getMealsType();
            const allMeals = await this.getMeals();
            types.forEach(type => {
                let result = allMeals.filter(word => word.type === type._id);
                if(result.length) {
                    this.meals[type.title] = result;
                }
            });
            console.log(this.meals);
            this.ready = true;
        },
        data() {
            return {
                meals: {},
                ready: false,
                success: false,
                menu: {
                    data: {headers: {'Access-Control-Allow-Origin': '*'}},
                    title: undefined,
                    description: undefined,
                    starters: [],
                    meals: [],
                    desserts: []
                }
            }
        },
        methods: {
            getMealModel(title) {
                if(title === 'Les entrées') {
                    return 'starter'
                } else if(title === 'Les glaces' || title === 'Les fromages' || title === 'Les desserts' || title === 'Les crêpes') {
                    return 'dessert'
                } else {
                    return 'meal'
                }
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
                    .post('http://localhost:3000/menus', this.menu)
                    .then(res => {
                       console.log(res);
                       this.success = true;
                       this.menu = {
                            data: {headers: {'Access-Control-Allow-Origin': '*'}},
                            title: undefined,
                                description: undefined,
                                starters: [],
                                meals: [],
                                desserts: []
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>
