<template>
    <Layout2 v-if="auth && ready">
        <div class="wrapper section-admin-2">
            <router-link :to="{ name: 'Meals' }">Voir tous les plats +</router-link>
            <h1 v-if="!meal">Aucun plat ne correspond à cette url</h1>
            <div v-else>
                <form @submit.prevent="submit" @click="success = false">
                    <div>
                        <h2>Modifier</h2>
                        <label>
                            <span>Titre</span>
                            <input type="text" required v-model="meal.title"/>
                        </label>
                        <label>
                            <span>Type de plat</span>
                            <select required v-model="meal.type">
                                <option v-for="type in mealTypes" :key="type.title" :value="type._id">{{ type.title }}</option>
                            </select>
                        </label>
                        <label>
                            <span>Prix (optionnel)</span>
                            <input type="number" v-model="meal.price"/>
                        </label>
                        <label>
                            <span>Description (optionel)</span>
                            <input type="text" v-model="meal.description"/>
                        </label>
                        <label>
                            <span>Informations supplémentaires (optionel)</span>
                            <textarea v-model="meal.infos"></textarea>
                        </label>
                        <div class="d-flex">
                            <label>
                                <span>Nom de la variante 1 (optionel)</span>
                                <input type="text" v-model="meal.variant_1_title" placeholder="Escargots x6">
                            </label>
                            <label>
                                <span>Prix de la variante 1 (optionel)</span>
                                <input type="number" v-model="meal.variant_1_price">
                            </label>
                        </div>
                        <div class="d-flex">
                            <label>
                                <span>Nom de la variante 2 (optionel)</span>
                                <input type="text" v-model="meal.variant_2_title" placeholder="Escargots x12">
                            </label>
                            <label>
                                <span>Prix de la variante 2 (optionel)</span>
                                <input type="number" v-model="meal.variant_2_price">
                            </label>
                        </div>
                    </div>
                    <p v-if="success" class="success">Modifications effectuées</p>
                    <button type="submit" class="link-2">Mettre à jour</button>
                    <button @click.prevent="deleteMeal" class="link-2 delete">Supprimer</button>
                </form>
            </div>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'MealsUpdate',
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
                .get(`http://localhost:3000/meals/${ this.$route.params.id }`, {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(res => {
                    this.meal = res.data;
                    console.log(this.meal);
                    this.ready = true;
                    axios
                        .get('http://localhost:3000/types', {
                            headers: {'Access-Control-Allow-Origin': '*'}
                        })
                        .then(res => {
                            this.mealTypes = res.data;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                    this.ready = true;
                });
        },
        data() {
            return {
                ready: false,
                meal: undefined,
                mealTypes: [],
                success: false
            }
        },
        methods: {
            submit() {
                let data = {headers: {'Access-Control-Allow-Origin': '*'}};
                for (let [key, value] of Object.entries(this.meal)) {
                    if(value) {
                        data[key] = value
                    }
                }
                axios
                    .patch(`http://localhost:3000/meals/${ this.meal._id }`, data)
                    .then(res => {
                        console.log(res);
                        this.success = true
                    })
                    .catch(err => {
                        console.log(err);
                        this.success = false
                    });
            },
            deleteMeal() {
                axios
                    .delete(`http://localhost:3000/meals/${ this.meal._id }`)
                    .then(() => {
                        window.location.href = '/admin/plats';
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>


