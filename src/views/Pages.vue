<template>
    <Layout2 v-if="auth">
        <div class="wrapper" v-if="pages">
            <div v-if="pages.length">
                <h1>La liste des pages de la carte</h1>
                <router-link :to="{ name: 'MealCreate' }">Créer une page +</router-link>
                <div class="list" v-if="pages && pages.length">
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
            <h1>Vous n'avez créé aucune page pour le moment</h1>
            <router-link class="link-2" :to="{ name: 'PagesCreate' }">Créer une page +</router-link>
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
                    this.pages = res.data
                })
                .catch(err => {
                    this.pages = [];
                    console.log(err);
                })
        },
        data() {
            return {
                ready: false,
                pages: undefined,
                meals: {},
                mealTypes: [],
                allMeals: []
            }
        }
    }
</script>

<style lang="scss">

</style>
