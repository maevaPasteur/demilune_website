<template>
    <Layout2 v-if="auth">
        <div class="wrapper" v-if="menus">
            <div v-if="menus.length">
                <h1>La liste des menus</h1>
                <router-link class="link-2" :to="{ name: 'MenusCreate' }">Créer un menu +</router-link>
                <div class="list-menu">
                    <router-link :to="{ name: 'MenusUpdate', params: { id: menu.id } }" v-for="menu in menus" :key="menu.title">
                        <h2>{{ menu.title }} - {{ menu.price }}€</h2>
                        <p>Modifier</p>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <h1>Vous n'avez créé aucun menu pour le moment</h1>
                <router-link class="link-2" :to="{ name: 'PagesCreate' }">Créer un menu +</router-link>
            </div>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'Menus',
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
            axios
                .get('http://localhost:3000/menus', {headers: {'Access-Control-Allow-Origin': '*'}})
                .then(res => {
                    this.menus = res.data;
                    console.log(this.menus);
                })
                .catch(err => {
                    this.pages = [];
                    console.log(err);
                })
        },
        data() {
            return {
                menus: undefined
            }
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
