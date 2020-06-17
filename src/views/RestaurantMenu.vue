<template>
    <Layout2 v-if="auth && general">
        <div class="wrapper-2" v-if="pages">
            <div class="edit" v-if="pages.length">
                <h1>Personnaliser la carte</h1>
                <form class="form-download" @submit.prevent="submit">
                    <h2>Choisir la ou les pages :</h2>
                    <select required v-model="pageToPrint">
                        <option value="all">Toute la carte</option>
                        <option v-for="page in pages" :key="'pdf-'+page.id" :value="page.id">{{ page.title }}</option>
                    </select>
                    <button type="submit">Télécharger en pdf</button>
                </form>
                <form class="list-settings" @submit.prevent="update" @click="success = false">
                    <div>
                        <h2>Mise en page générale</h2>
                        <div class="f2">
                            <label>
                                <span>Marge supérieur de la page</span>
                                <input type="number" required v-model="general.marginTop"/>
                            </label>
                            <label>
                                <span>Marges droite et gauche de la page</span>
                                <input type="number" required v-model="general.marginLeft"/>
                            </label>
                            <label>
                                <span>Typographie</span>
                                <select required v-model="general.fonts">
                                    <option value="font-1">Elegante</option>
                                    <option value="font-2">Manuscrite</option>
                                    <option value="font-3">Créative</option>
                                    <option value="font-4">Epaisse</option>
                                    <option value="font-5">Moderne</option>
                                    <option value="font-6">Elancée</option>
                                </select>
                            </label>
                            <label>
                                <span>Taille des titres</span>
                                <input type="number" min="12" required v-model="general.titleSize"/>
                            </label>
                            <label>
                                <span>Marge sous les titres</span>
                                <input type="number" required v-model="general.titleMarginBottom"/>
                            </label>
                            <label>
                                <span>Centrer les titres ?</span>
                                <select required v-model="general.centerTitle">
                                    <option :value="true">Oui</option>
                                    <option :value="false">Non</option>
                                </select>
                            </label>
                            <label>
                                <span>Taille des textes</span>
                                <input type="number" min="10" required v-model="general.textSize"/>
                            </label>
                            <label>
                                <span>Interlignage</span>
                                <input type="number"  step="0.1" required v-model="general.lineHeight"/>
                            </label>
                        </div>
                        <h2>Plats</h2>
                        <div class="f2">
                            <label>
                                <span>Tailles des titres des plats</span>
                                <input type="number" required v-model="general.titleMealSize"/>
                            </label>
                            <label>
                                <span>Marge sous les plats</span>
                                <input type="number" required v-model="general.mealMarginBottom"/>
                            </label>
                            <label>
                                <span>Quel affichage des prix ?</span>
                                <select required v-model="general.mealPriceStyle">
                                    <option value="price-1">Lignes</option>
                                    <option value="price-2">Pointillés</option>
                                </select>
                            </label>
                            <label>
                                <span>Couleur de l'info supplémentaire</span>
                                <select required v-model="general.infoColor">
                                    <option value="#aaa">Gris clair</option>
                                    <option value="#940000">Bordeau</option>
                                    <option value="#001fce">Bleu</option>
                                    <option value="#b96e00">Or</option>
                                    <option value="#ef7448">Orange</option>
                                </select>
                            </label>
                        </div>
                        <h2>Menus</h2>
                        <div class="f2">
                            <label>
                                <span>Taille des titres des menus</span>
                                <input type="number" min="12" required v-model="general.titleMenuSize"/>
                            </label>
                            <label>
                                <span>Apparence des prix des menus</span>
                                <select required v-model="general.menuPriceStyle">
                                    <option value="menu-price-1">Option 1</option>
                                    <option value="menu-price-2">Option 2</option>
                                    <option value="menu-price-3">Option 3</option>
                                </select>
                            </label>
                            <label>
                                <span>Style des menus</span>
                                <select required v-model="general.menuStyle">
                                    <option value="menu-style-1">Aligner en haut</option>
                                    <option value="menu-style-2">Hauteur complète</option>
                                </select>
                            </label>
                            <label>
                                <span>Centrer les titres des menus ?</span>
                                <select required v-model="general.centerMenuTitle">
                                    <option :value="true">Oui</option>
                                    <option :value="false">Non</option>
                                </select>
                            </label>
                            <label>
                                <span>Marge sous les titres des menus</span>
                                <input type="number" required v-model="general.titleMenuMarginBottom"/>
                            </label>
                            <label>
                                <span>Marge sous les plats des menus</span>
                                <input type="number" required v-model="general.menuMealMarginBottom"/>
                            </label>
                        </div>
                    </div>
                    <p v-if="success" class="success">Vos modifications ont bien été enregistrées</p>
                    <button class="link-2" type="submit">Enregistrer mes modifications</button>
                </form>
            </div>
            <div v-else>
                <h1>Vous n'avez créé aucune page ni menu pour le moment</h1>
                <router-link class="link-2" :to="{ name: 'PagesCreate' }">Créer une page +</router-link>
            </div>
            <div class="container-pages" v-if="pages.length && meals" :class="fontStyle">
                <MenuPage v-for="page in pages" :key="page.id" :page="page" :general="general" :meals="meals"/>
            </div>
        </div>
        <transition name="fade">
            <div v-if="loader" class="loader"><p>Génération du pdf en cours</p><p><i></i><i></i><i></i></p></div>
        </transition>
    </Layout2>
</template>

<script>
    import Authentification from "../stores/Authentification";
    import Layout2 from "../layouts/Layout2";

    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';
    import axios from 'axios';
    import MenuPage from "../components/MenuPage";

    export default {
        name: 'RestaurantMenu',
        components: {MenuPage, Layout2},
        computed: {
            auth() {
                return Authentification.state.auth
            },
            fontStyle() {
                return this.general.fonts
            }
        },
        async mounted() {
            axios
                .get('http://localhost:3000/pages', {headers: {'Access-Control-Allow-Origin': '*'}})
                .then(res => {
                    this.pages = res.data;
                })
                .catch(err => {
                    this.pages = [];
                    console.log(err);
                });
            axios
                .get('http://localhost:3000/general', {headers: {'Access-Control-Allow-Origin': '*'}})
                .then(res => {
                    this.general = res.data[0];
                })
                .catch(err => {
                    console.log(err);
                });
            axios
                .get('http://localhost:3000/meals', {headers: {'Access-Control-Allow-Origin': '*'}})
                .then(res => {
                    this.meals = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        data() {
            return {
                pages: undefined,
                generalId: undefined,
                meals: undefined,
                success: false,
                loader: false,
                pageToPrint: 'all',
                pdf: undefined,
                options: {
                    margin:       0,
                    filename:     'myfile.pdf',
                    image:        { type: 'jpeg', quality: 1 },
                    html2canvas:  { scale: 2 }
                },
                general: undefined
            }
        },
        methods: {
            submit() {
                this.loader = true;
                if(this.pageToPrint === 'all') {
                    this.printAll()
                } else {
                    this.print()
                }
            },
            async printAll() {
                this.pdf = new jsPDF('p', 'mm', 'a4');
                const filename = 'la_demilune_carte.pdf';
                await this.createCanvas();
                this.pdf.save(filename);
                console.log('save');
                this.loader = false;
            },
            createCanvas() {
               return new Promise(resolve => {
                   this.pages.forEach(async (page, index) => {
                       let canvas = await html2canvas(document.getElementById(page.id), { scale: 2 });
                       if(index !== 0) {
                           this.pdf.addPage();
                       }
                       this.pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
                       console.log('new canvas', page.title);
                       if (index === ( this.pages.length -1)) resolve("resolved");
                   });
               })
            },
            print() {
                const filename  = this.pages.filter(page => page.id === this.pageToPrint)[0].title.replace(/ /g, '_').toLowerCase() + 'pdf';
                html2canvas(document.getElementById(this.pageToPrint),
                    {scale: 2}
                ).then(canvas => {
                    let pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
                    pdf.save(filename);
                    this.loader = false;
                }).catch(err => {
                    this.loader = false;
                    console.log(err)
                })
            },
            update() {
                axios
                    .patch('http://localhost:3000/general', {
                        headers: {'Access-Control-Allow-Origin': '*'},
                        data: this.general
                    })
                    .then(res => {
                        console.log(res);
                        this.success = true
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Pompiere&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Francois+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Vidaloka&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bad+Script&display=swap');
    .container-pages {
        font-family: 'Source Sans Pro', "Helvetica Neue", sans-serif;
        font-weight: 300;
        letter-spacing: .2px;
    }
    .font-1, .font-6 {
        .price {
            font-family: 'Source Sans Pro', "Helvetica Neue", sans-serif;
            font-weight: 600;
            letter-spacing: .2px;
        }
    }
    .font-1 {
        h2, h3, h4 {
            font-family: 'Playfair Display', "Helvetica Neue", serif;
            letter-spacing: normal;
        }
        h3 {
            font-weight: 500;
        }

    }
    .font-2 {
        h2, h3, h4 {
            font-family: 'Dancing Script', "Helvetica Neue", cursive;
            font-weight: 400;
        }
        h3 {
            font-weight: 700;
        }
    }
    .font-3 {
        h2, h3, h4 {
            font-family: 'Pompiere', "Helvetica Neue", cursive;
        }
    }
    .font-4 {
        h2, h3, h4 {
            font-family: 'Francois One', "Helvetica Neue", sans-serif;
        }
    }
    .font-5 {
        h2, h3, h4 {
            font-family: 'Vidaloka', "Helvetica Neue", serif;
        }
    }
    .font-6 {
        h2, h3, h4 {
            font-family: 'Bad Script', "Helvetica Neue", cursive;
        }
    }

    .page-admin .list-settings input, .page-admin .list-settings textarea, .page-admin .list-settings select {
        padding: 10px;
    }
    .page-admin .list-settings input, .page-admin .list-settings textarea {
        width: calc(100% - 20px);
    }
   .wrapper-2 {
       display: flex;
       margin: 50px 0 100px;
       width: 100%;
       .edit {
           width: calc(100% - 800px);
           margin: 0 20px;
           .link-2 {
               display: block;
               width: fit-content;
               margin-bottom: 40px;
           }
           h2:not(:first-of-type) {
               margin-top: 40px;
           }
       }
       .container-pages {
           width: 800px;
           margin-right: 20px;
       }
   }
    .fade-enter-active, .fade-leave-active {
        transition: ease-in-out opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    @keyframes animPoints {
        0% {
            transform: translateY(0);
        }
        20% {
            transform: translateY(-20px);
        }
        40% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(0);
        }
    }
    .loader {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255,255,255,.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        p {
            display: block;
        }
        i {
            display: inline-block;
            width: 10px;
            height: 10px;
            background-color: #000;
            border-radius: 50%;
            margin-top: 40px;
            animation: animPoints ease-in 1s infinite;
            &:not(:first-of-type) {
                margin-left: 20px;
            }
            &:nth-of-type(2) {
                animation-delay: .1s;
            }
            &:nth-of-type(3) {
                animation-delay: .2s;
            }
        }
    }
    .page-admin .form-download {
        margin-top: 40px;
        h2 {
            margin-bottom: 10px;
        }
        button {
            display: block;
            padding: 10px;
            background-color: #000;
            color: #fff;
            text-align: center;
            width: 100%;
            margin: 10px 0 0;
            cursor: pointer;
        }
    }
   @media screen and (min-width: 1300px) {
       .f2 {
           display: flex;
           flex-wrap: wrap;
           align-items: flex-end;
           & > label {
               width: calc(50% - 10px);
               &:nth-of-type(odd) {
                   margin-right: 20px;
               }
           }
       }
   }
</style>
