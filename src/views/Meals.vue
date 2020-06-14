<template>
    <Layout2 v-if="auth">
        <div class="wrapper section-admin-2">
            <h1>La liste des plats proposés</h1>
            <router-link :to="{ name: 'MealCreate' }">Créer un plat +</router-link>
            <div class="list" v-if="ready">
                <details v-for="(type, key) in meals" :key="key" open>
                    <summary><h2>{{ key }}</h2></summary>
                    <router-link v-for="meal in type" :key="meal.title" :to="{ name: 'MealUpdate', params: { id: meal._id }}">
                        <h3>{{ meal.title }} <span v-if="meal.price">- {{ meal.price }}€</span></h3>
                        <p v-if="meal.description">{{ meal.description }}</p>
                        <p class="infos" v-if="meal.infos">{{ meal.infos }}</p>
                        <ul v-if="meal.variant_1_title || meal.variant_2_title">
                            <li v-if="meal.variant_1_title">{{ meal.variant_1_title + ' - ' + meal.variant_1_price }}€</li>
                            <li v-if="meal.variant_2_title">{{ meal.variant_2_title + ' - ' + meal.variant_2_price }}€</li>
                        </ul>
                    </router-link>
                </details>
            </div>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'Meals',
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
            await this.getMealsType();
            await this.getMeals();
            this.mealTypes.forEach(type => {
                let result = this.allMeals.filter(word => word.type === type._id);
                if(result.length) {
                    this.meals[type.title] = this.allMeals.filter(word => word.type === type._id);
                }
            });
            console.log(this.meals);
            this.ready = true
        },
        data() {
            return {
                ready: false,
                meals: {},
                mealTypes: [],
                allMeals: []
            }
        },
        methods: {
            getMealsType() {
                return new Promise(resolve => {
                    axios
                        .get('http://localhost:3000/types', {
                                headers: {'Access-Control-Allow-Origin': '*'}
                            })
                                .then(res => {
                                    this.mealTypes = res.data;
                                    resolve(true);
                                })
                                .catch(err => {
                                    resolve(false);
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
                            this.allMeals = res.data;
                            resolve(true);
                        })
                        .catch(err => {
                            resolve(false);
                            console.log(err);
                        })
                })
            },
            submit() {

            }
        }
    }
</script>

<style lang="scss">

</style>
