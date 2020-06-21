<template>
    <Layout2 v-if="auth && ready">
        <div class="wrapper section-new-page large">
            <div v-if="menu">
                <h1>Modifier le menu : {{ menu.title }}</h1>
                <router-link :to="{ name: 'Menus' }">Voir tous les menus</router-link>
                <form @submit.prevent="submit" @click="success = false">
                    <div class="d-flex full">
                        <div>
                            <div>
                                <h2>Mettre le menu</h2>
                                <label>
                                    <span>Titre</span>
                                    <input type="text" required v-model="menu.title"/>
                                </label>
                                <label>
                                    <span>Description</span>
                                    <textarea v-model="menu.description"></textarea>
                                </label>
                                <div class="create-content">
                                    <h3>Ajouter ou supprimer des plats</h3>
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
                            <p v-if="success" class="success">Le menu a bien été mis à jour</p>
                            <button type="submit" class="link-2">Enregistrer les modifications</button>
                            <button @click.prevent="removeMenu" class="link-2 delete">Supprimer</button>
                        </div>
                        <div class="drag">
                            <h2>Ordre</h2>
                            <p>Pour changer l'odre des plats faites glisser les blocks</p>
                            <div v-if="menu.starters.length">
                                <h3>Les entrées</h3>
                                <draggable v-model="menu.starters" class="container-drag">
                                    <transition-group>
                                        <div v-for="item in menu.starters" :key="item" class="item">
                                            {{ title(item) }}
                                        </div>
                                    </transition-group>
                                </draggable>
                            </div>
                            <div v-if="menu.meals.length">
                                <h3>Les plats</h3>
                                <draggable v-model="menu.meals" class="container-drag">
                                    <transition-group>
                                        <div v-for="item in menu.meals" :key="item" class="item">
                                            {{ title(item) }}
                                        </div>
                                    </transition-group>
                                </draggable>
                            </div>
                            <div v-if="menu.desserts.length">
                                <h3>Les desserts</h3>
                                <draggable v-model="menu.desserts" class="container-drag">
                                    <transition-group>
                                        <div v-for="item in menu.desserts" :key="item" class="item">
                                            {{ title(item) }}
                                        </div>
                                    </transition-group>
                                </draggable>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else>
                <h1>Aucune menu ne correspond à cette url</h1>
                <router-link class="link-2" :to="{ name: 'Menus' }">Voir tous les menus</router-link>
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
        name: 'MenusUpdate',
        components: {Layout2, draggable},
        computed: {
            auth() {
                return Authentification.state.auth
            }
        },
        async mounted() {
            if(!this.auth) {
                window.location.href = '/connexion';
            }
            this.menu = await this.getMenu();
            const types = await this.getMealsType();
            this.allMeals = await this.getMeals();
            types.forEach(type => {
                let result = this.allMeals.filter(meal => meal.type === type._id);
                if(result.length) {
                    this.meals[type.title] = result;
                }
            });
            this.ready = true
        },
        data() {
            return {
                menu: undefined,
                success: false,
                ready: false,
                meals: {},
                allMeals: undefined
            }
        },
        methods: {
            submit() {
                axios
                    .patch(`http://localhost:3000/menus/${this.$route.params.id}`, {
                        headers: {'Access-Control-Allow-Origin': '*'},
                        menu: this.menu
                    })
                    .then(res => {
                        console.log(res);
                        this.success = true
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            removeMenu() {
                axios
                    .delete(`http://localhost:3000/menus/${this.$route.params.id}`, {headers: {'Access-Control-Allow-Origin': '*'}})
                    .then(res => {
                        console.log(res);
                        window.location.href = '/admin/menus'
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            /**
             * Get the active menu by the routes id parameter
             * @returns {Promise}
             */
            getMenu() {
                return new Promise(resolve => {
                    axios
                        .get(`http://localhost:3000/menus/${ this.$route.params.id }`)
                        .then(res => {
                            console.log(res);
                            resolve(res.data[0])
                        })
                        .catch(err => {
                            console.log(err);
                            this.ready = true
                        })
                })
            },

            /**
             * Get all meals types
             * @returns {Promise}
             */
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

            /**
             * Get all meals
             * @returns {Promise}
             */
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

            /**
             * Test if the props key is a starters, a meal or a dessert
             * @param title
             * @returns {string}
             */
            getMealModel(title) {
                if(title === 'Les entrées') {
                    return 'starter'
                } else if(title === 'Les glaces' || title === 'Les fromages' || title === 'Les desserts' || title === 'Les crêpes') {
                    return 'dessert'
                } else {
                    return 'meal'
                }
            },

            /**
             * Show the meals title with its id
             * @param id
             * @returns {string}
             */
            title(id) {
                let title = '';
                this.allMeals.forEach(meal => {
                    if(meal._id === id) {
                        title = meal.title;
                    }
                });
                return title
            },
        }
    }
</script>

<style lang="scss">
    .list-menu {
        margin-top: 40px;
        a {
            background-color: #ffff;
            margin-top: 10px;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:hover {
                p {
                    color: #e4af08;
                }
            }
        }
        p {
            font-size: 14px;
            font-weight: 300;
            transition: color ease-in-out .3s;
        }
    }
</style>
