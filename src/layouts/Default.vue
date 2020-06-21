<template>
    <div :class="className">
        <header>
            <router-link :to="{name: 'Home'}">
                <img src="../assets/images/logo_demi_lune_3.svg" alt="logo du restaurant la Demi-lune à Dole">
            </router-link>
            <a class="link-1" href="tel:0384728282">Réservation <span>03 84 72 82 82</span></a>
        </header>
        <main>
            <slot/>
        </main>
        <footer>
            <div>
                <h3>Restaurant la Demi-Lune</h3>
                <p>39 rue Pasteur, 39100 Dole</p>
                <br>
            </div>
            <div>
                <p>Réservation uniquement par téléphone</p>
                <p>03 84 72 82 82</p>
                <br>
            </div>
            <p>{{ text }}</p>
        </footer>
    </div>
</template>

<script>

    export default {
        name: 'Default',
        props: {
            text: String,
            className: String
        }
    }
</script>


<style lang="scss">
    header {
        padding: 10px 20px;
        position: fixed;
        width: calc(100% - 40px);
        top: 0;
        left: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        pointer-events: none;
        font-size: 20px;
        font-weight: 500;
        img {
            width: 200px;
        }
        p {
            margin-left: 10px;
            margin-right: auto;
        }
        a {
            pointer-events: all;
        }
        .link-1 {
            padding: 20px 0 20px 20px;
        }
    }
    footer {
        background-color: #000;
        color: #fff;
        padding: 50px 20px;
        display: flex;
        line-height: 1.5;
        & > div, & > p {
            width: 33%;
        }
        h3 {
            font-size: 20px;
        }
    }
</style>