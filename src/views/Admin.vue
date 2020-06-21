<template>
    <Layout2 v-if="auth">
        <div class="wrapper section-admin-1" v-if="ready">
            <div v-if="general">
                <h1>Bienvenue</h1>
                <p>Modifier les textes de la page d'accueil</p>
                <form @submit.prevent="submit" @click="success = false">
                    <div>
                        <h2>Section avec vidéo</h2>
                        <label>
                            <span>Titre</span>
                            <textarea required v-model="general.title"></textarea>
                        </label>
                        <label>
                            <span>Bouton</span>
                            <input type="text" required v-model="general.button">
                        </label>
                    </div>
                    <div>
                        <h2>Block de texte</h2>
                        <label>
                            <span>Titre</span>
                            <input type="text" required v-model="general.title_2"/>
                        </label>
                        <label>
                            <span>Texte</span>
                            <textarea required v-model="general.text_2"></textarea>
                        </label>
                    </div>
                    <div>
                        <h2>Les horraires</h2>
                        <label>
                            <span>Lundi</span>
                            <input type="text" v-model="general.day_1"/>
                        </label>
                        <label>
                            <span>Mardi</span>
                            <input type="text" v-model="general.day_2"/>
                        </label>
                        <label>
                            <span>Mercredi</span>
                            <input type="text" v-model="general.day_3"/>
                        </label>
                        <label>
                            <span>Jeudi</span>
                            <input type="text" v-model="general.day_4"/>
                        </label>
                        <label>
                            <span>Vendredi</span>
                            <input type="text" v-model="general.day_5"/>
                        </label>
                        <label>
                            <span>Samedi</span>
                            <input type="text" v-model="general.day_6"/>
                        </label>
                        <label>
                            <span>Dimanche</span>
                            <input type="text" v-model="general.day_7"/>
                        </label>
                    </div>
                    <div>
                        <h2>Pied de page</h2>
                        <label>
                            <span>Texte</span>
                            <textarea required v-model="general.footer"></textarea>
                        </label>
                    </div>
                    <p v-if="success" class="success">Vos modifications ont bien été enregistrées</p>
                    <button type="submit" class="link-2">Enregistrer les modifications</button>
                </form>
            </div>
            <h1 v-else>Aucun setting n'est enregistré pour le moment</h1>
        </div>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import axios from 'axios';

    export default {
        name: 'Admin',
        components: {Layout2},
        computed: {
          auth() {
              return Authentification.state.auth
          }
        },
        mounted() {
            if(!this.auth) {
                window.location.href = '/connexion';
            }
            axios
                .get('http://localhost:3000/general', {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(res => {
                    if(res.data.error || !res.data.length) {
                        console.log("général est vide")
                    } else {
                        this.general = res.data[0];
                    }
                    this.ready = true;
                })
                .catch(err => {
                    console.log(err);
                    this.ready = true;
                })
        },
        data() {
            return {
                general: undefined,
                ready: false,
                success: false
            }
        },
        methods: {
            submit() {
                axios
                    .patch(`http://localhost:3000/general/${this.general._id}`, {
                        button: this.general.button,
                        button_2: this.general.button_2,
                        day_1: this.general.day_1,
                        day_2: this.general.day_2,
                        day_3: this.general.day_3,
                        day_4: this.general.day_4,
                        day_5: this.general.day_5,
                        day_6: this.general.day_6,
                        day_7: this.general.day_7,
                        footer: this.general.footer,
                        text_2: this.general.text_2,
                        title: this.general.title,
                        title_2: this.general.title_2,
                        headers: {'Access-Control-Allow-Origin': '*'}
                    })
                    .then(res => {
                        console.log(res);
                        this.success = true
                    })
                    .catch(err => {
                        console.log(err);
                        this.success = false
                    });
            }
        }
    }
</script>


