<template>
    <div class="page-admin">
        <header>
            <router-link to="/"><img src="../assets/images/logo.svg" alt="logo du restaurant la Demi-lune à Dole"></router-link>
            <nav>
                <ul>
                    <li>
                        <router-link :to="{ name: 'Admin' }">Paramètres globaux</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'RestaurantMenu' }">La carte</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Pages' }">Les pages</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Menus' }">Les menus</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Meals' }">Les plats</router-link>
                    </li>
                </ul>
            </nav>
            <button class="link-2" @click="logout">Déconnexion</button>
        </header>
        <main>
            <slot/>
        </main>
    </div>
</template>

<script>

    import Authentification from "../stores/Authentification";

    export default {
        name: 'Layout2',
        methods: {
            logout() {
                Authentification.logout();
                window.location.href = '/connexion';
            }
        }
    }
</script>

<style lang="scss">
    .page-admin {
        .delete {
            border-color: red;
            margin-left: 10px;
            color: red;
            &:before {
                background-color: red;
            }
            &:hover {
                color: #fff;
            }
        }
        input::placeholder {
            opacity: .5;
            font-style: italic;
            font-size: 15px;
        }
        header {
            padding: 5px 20px;
            font-size: 18px;
            position: relative;
            pointer-events: all;
            ul {
                display: flex;
                align-items: center;
            }
            img {
                width: 50px;
            }
            button, a {
                font-weight: 400;
                font-size: 15px;
            }
            button {
                padding: 12px 15px 8px;
            }
            a {
                padding: 0;
            }
            li:not(:last-of-type) {
                margin-right: 20px;
            }
        }
        main {
            display: flex;
            background-color: #eee;
            min-height: calc(100vh - 67px);
            aside {
                width: 200px;
                background-color: #000;
                color: #fff;
                padding: 20px;
                font-weight: 300;
                min-height: calc(100vh - 40px);
            }
        }
        .wrapper {
            margin-top: 100px;
            padding-bottom: 100px;
        }
        h1 {
            font-size: 30px;
            margin-bottom: 20px;
             & + a {
                 display: block;
                 width: fit-content;
                 margin-top: 40px;
             }
        }
        form {
            & > div {
                margin-top: 40px;
                padding-top: 40px;
                border-top: solid 2px #ddd;
            }
            button {
                margin: 40px auto 100px;
                font-size: 16px;
                font-weight: 400;
            }
            h2 {
                position: relative;
                display: inline-block;
                &:before {
                    content: '';
                    width: 100%;
                    height: 100%;
                    display: block;
                    z-index: -1;
                    background-color: #ffed00;
                    top: 0;
                    left: 0;
                    position: absolute;
                }
            }
            .d-flex {
                display: flex;
                justify-content: space-between;
                label {
                    width: calc(50% - 10px);
                }
            }
            .success {
                color: #42b983;
                margin-top: 40px;
            }
        }
        label {
            display: block;
            margin-top: 20px;
            span {
                font-size: 14px;
                margin-bottom: 5px;
                display: block;
            }
        }
        input, textarea, select {
            width: calc(100% - 40px);
            border: 0;
            background: #fff;
            padding: 20px;
        }
        select {
            width: 100%;
        }
        textarea {
            min-height: 100px;
            min-width: calc(100% - 40px);
            max-width: calc(100% - 40px);
        }
        details {
            margin-top: 10px;
            &:first-of-type {
                margin-top: 40px;
            }
            a {
                display: block;
                margin-top: 20px;
                padding-left: 40px;
                line-height: 1.5;
                font-size: 15px;
                font-weight: 300;
                &:last-of-type {
                    margin-bottom: 20px;
                }
                &:not(:last-of-type) {
                    border-bottom: solid 1px #ccc;
                    padding-bottom: 20px;
                }
                &:hover h3 {
                    color: #e4af08;
                }
            }
            h3 {
                font-size: 18px;
                font-weight: 400;
                & + p, & + ul {
                    margin-top: 5px;
                }
            }
            li {
                list-style-type: disc;
                margin-left: 20px;
            }
        }
        .infos {
            opacity: .5;
            font-style: italic;
        }
        summary {
            padding: 20px;
            display: flex;
            font-size: 25px;
            align-items: center;
            background-color: #fff;
            cursor: pointer;
        }
        .create-content {
            h3 {
                font-size: 14px;
                margin-top: 40px;
                margin-bottom: 5px;
            }
            details:first-of-type {
                margin-top: 0;
            }
            input {
                position: absolute;
                opacity: 0;
                pointer-events: none;
                &:checked + span:after {
                    content: '';
                    display: inline-block;
                    vertical-align: sub;
                    margin-right: 10px;
                    border: solid 2px #000;
                    border-top: 0;
                    border-left: 0;
                    transform: rotate(45deg);
                    width: 5px;
                    height: 10px;
                    top: 2px;
                    left: 46px;
                    position: absolute;
                }
            }
            label {
                cursor: pointer;
                &:last-of-type {
                    margin-bottom: 20px;
                }
                span {
                    position: relative;
                    &:before {
                        content: '';
                        display: inline-block;
                        vertical-align: sub;
                        margin-right: 10px;
                        border: solid 2px;
                        width: 15px;
                        height: 15px;
                        margin-left: 40px;
                    }
                }
            }
        }
    }
    .container-drag {
        h2 {
            margin-bottom: 40px;
            font-weight: 300;
            opacity: .8;
        }
        .item {
            background-color: #fff;
            padding: 20px;
            cursor: pointer;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: box-shadow ease-in-out .3s;
            &:not(:last-of-type) {
                margin-bottom: 10px;
            }
            &:hover {
                box-shadow: 5px 5px 5px rgba(0,0,0,.1);
            }
            a {
                font-size: 14px;
                margin: 0;
                z-index: 2;
            }
        }
        a {
            display: block;
            width: fit-content;
            margin-top: 40px;
        }
    }
    .large {
        max-width: 1200px;
    }
    form > .d-flex > div {
        width: calc(50% - 20px);
    }
    .d-flex .drag {
        p {
            font-size: 14px;
            margin: 20px 0 40px;
        }
        & > div:not(:first-of-type) {
            margin-top: 40px;
        }
        h3 {
            margin-bottom: 10px;
        }
    }
    .section-new-page {
        form .create-content label {
            width: 100%;
            span {
                display: flex;
                align-items: flex-start;
                line-height: 1.3;
                &:before, &:after {
                    margin-top: -3px;
                }
            }
            span:before {
                display: block;
                flex-shrink: 0;
            }
        }
    }
    .section-new-page form > .full label {
        width: 100%;
    }
</style>