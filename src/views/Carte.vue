<template>
    <default-layout v-if="general" :text="general.footer" class-name="page-main-menu">
        <div class="page-menu">
            <section class="section-image">
                <h1>La Carte</h1>
               <img src="../assets/images/dole.webp" alt="restaurant la demi-lune à Dole">
            </section>
            <section class="wrapper" v-if="meals">
                <h2>
                    <button :class="{ active: open === 1}" @click="open=1">Nos plats à la carte</button>
                    <button :class="{ active: open === 2}" @click="open=2">Nos menus</button>
                </h2>
                <div class="container_pages" v-show="open === 1">
                    <page-item v-for="page in pages" :key="'page-'+page.id" :page="page" :meals="meals" />
                </div>
                <div class="container_menus" v-show="open === 2">
                    <MenuItem v-for="page in menus" :key="page.id" :page="page" :meals="meals"/>
                </div>
            </section>
            <gallery/>
        </div>
    </default-layout>
</template>

<script>

    import axios from 'axios';
    import MenuItem from "../components/MenuItem";
    import PageItem from "../components/PageItem";
    import Gallery from "../components/Gallery";

    export default {
        name: 'Carte',
        components: {Gallery, PageItem, MenuItem},
        mounted() {
            axios
                .get('http://localhost:3000/general', {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(res => {
                    if(res.data.error || !res.data.length) {
                        window.location.href = '/';
                    } else {
                        this.general = res.data[0];
                        this.pages = this.general.pages.filter(item => item.type === 'page');
                        this.menus = this.general.pages.filter(item => item.type === 'menu');
                    }
                })
                .catch(err => {
                    console.log(err);
                    window.location.href = '/';
                });
            axios
                .get('http://localhost:3000/meals', {
                    headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(res => {
                    if(res.data.error || !res.data.length) {
                        window.location.href = '/';
                    } else {
                        this.meals = res.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                    window.location.href = '/';
                });
        },
        data() {
            return {
                general: undefined,
                menus: undefined,
                pages: undefined,
                meals: undefined,
                open: 1
            }
        }
    }
</script>


<style lang="scss">
    .section-image {
        position: relative;
        height: 700px;
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
            position: relative;
            z-index: 2;
            font-size: 60px;
            padding: 10px 50px;
            background-color: #000;
            color: #fff;
        }
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-position: top;
            object-fit: cover;
        }
    }
    .page-menu {
        padding-bottom: 20px;
        .wrapper {
            padding-top: 100px;
            padding-bottom: 100px;
            max-width: 800px;
        }
        h2 {
            display: flex;
            font-size: 30px;
            justify-content: center;
            padding-bottom: 100px;
            button {
                padding-left: 15px;
                position: relative;
                cursor: pointer;
                &:before {
                    content: '';
                    display: block;
                    height: 100%;
                    width: 0;
                    position: absolute;
                    z-index: -1;
                    top: 0;
                    right: 0;
                    background-color: #ffed00;
                    transition: width ease-in-out .3s
                }
            }
            button:first-of-type {
                margin-right: 40px;
            }
            .active:before, button:hover::before {
                width: 100%;
            }
        }
    }

    .page-menu  {
        text-align: center;
        h3 {
            text-align: center;
            margin: 0 auto 50px;
            width: fit-content;
            padding: 10px 20px 7px;
            background: #000;
            color: #fff;
            font-size: 20px;
        }
        .meal {
            margin-bottom: 30px;
            .price {
                font-size: 14px;
                &:before {
                    content: '';
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background: #000;
                    border-radius: 50%;
                    margin: 0 10px;
                }
            }
        }
    }

    .page-item {
        &:not(:first-of-type) {
            margin-top: 100px;
        }
        p {
            font-weight: 100;
            font-size: 16px;
            line-height: 1.4;
        }
        .or {
            margin: 10px 0;
            font-weight: 300;
            color: #ebda00;
            font-size: 12px;
        }
        h4 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .infos {
            font-style: italic;
            opacity: .5;
            font-size: 14px;
        }
    }

    .menu-choice-web {
        &:not(:first-of-type) {
            &:before {
                content: '';
                display: block;
                width: 5px;
                height: 5px;
                background: #000;
                border-radius: 50%;
                margin: 40px auto;
            }
        }
    }

</style>
