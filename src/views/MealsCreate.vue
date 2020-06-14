<template>
    <Layout2 v-if="auth">
        <div class="wrapper">
            <router-link :to="{ name: 'Meals' }">Voir tous les plats +</router-link>
            <form @submit.prevent="submit" @click="success = false" v-if="ready">
                <div>
                    <h2>Créer un plat</h2>
                    <label>
                        <span>Titre</span>
                        <input type="text" required v-model="newMeal.title"/>
                    </label>
                    <label>
                        <span>Type de plat</span>
                        <select required v-model="newMeal.type">
                            <option v-for="type in mealTypes" :key="type.title" :value="type._id">{{ type.title }}</option>
                        </select>
                    </label>
                    <label>
                        <span>Prix (optionnel)</span>
                        <input type="number" step="0.01" v-model="newMeal.price"/>
                    </label>
                    <label>
                        <span>Description (optionel)</span>
                        <textarea v-model="newMeal.description"></textarea>
                    </label>
                    <label>
                        <span>Informations supplémentaires (optionel)</span>
                        <textarea v-model="newMeal.infos"></textarea>
                    </label>
                    <div class="d-flex">
                        <label>
                            <span>Nom de la variante 1 (optionel)</span>
                            <input type="text" v-model="newMeal.variant_1_title" placeholder="Escargots x6">
                        </label>
                        <label>
                            <span>Prix de la variante 1 (optionel)</span>
                            <input type="number" step="0.01" v-model="newMeal.variant_1_price">
                        </label>
                    </div>
                    <div class="d-flex">
                        <label>
                            <span>Nom de la variante 2 (optionel)</span>
                            <input type="text" v-model="newMeal.variant_2_title" placeholder="Escargots x12">
                        </label>
                        <label>
                            <span>Prix de la variante 2 (optionel)</span>
                            <input type="number" step="0.01" v-model="newMeal.variant_2_price">
                        </label>
                    </div>
                </div>
                <p v-if="success" class="success">Le plat a bien été créé</p>
                <button type="submit" class="link-2">Créer le nouveau plat</button>
            </form>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'MealsCreate',
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
            axios
                .get('http://localhost:3000/types', {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(res => {
                    this.mealTypes = res.data;
                    console.log(this.mealTypes);
                    this.ready = true;
                })
                .catch(err => {
                    console.log(err);
                    this.ready = false;
                })
        },
        data() {
            return {
                success: false,
                mealTypes: undefined,
                ready: false,
                newMeal: {
                    title: null,
                    description: null,
                    infos: null,
                    type: null,
                    price: null,
                    variant_1_title: null,
                    variant_1_price: null,
                    variant_2_title: null,
                    variant_2_price: null
                }
            }
        },
        methods: {
            submit() {
                let data = {headers: {'Access-Control-Allow-Origin': '*'}};
                for (let [key, value] of Object.entries(this.newMeal)) {
                    if(value) {
                        data[key] = value
                    }
                }
                axios
                    .post(`http://localhost:3000/meals`, data)
                    .then(res => {
                        console.log(res);
                        this.success = true;

                        // Init old value
                        this.newMeal = {
                            title: null,
                            description: null,
                            infos: null,
                            type: null,
                            price: null,
                            variant_1_title: null,
                            variant_1_price: null,
                            variant_2_title: null,
                            variant_2_price: null
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.success = false
                    });
            }


        }
    }
</script>


