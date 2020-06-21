<template>
    <div class="page-item">
        <h3>{{page.title}} - {{ page.price | price }}€</h3>
        <menu-choice-web :meals="menu.starters"/>
        <menu-choice-web :meals="menu.meals"/>
        <menu-choice-web :meals="menu.desserts"/>
    </div>
</template>

<script>
    import MenuChoiceWeb from "./MenuChoiceWeb";
    export default {
        name: 'MenuItem',
        components: {MenuChoiceWeb},
        props: ['page', 'meals'],
        data() {
            return {
                meal: undefined,
                menu: {
                    starters: [],
                    meals: [],
                    desserts: []
                }
            }
        },
        mounted() {
            this.page.starters.forEach(id => {
                this.menu.starters.push(this.meals.filter(meal => meal._id === id)[0])
            });
            this.page.meals.forEach(id => {
                this.menu.meals.push(this.meals.filter(meal => meal._id === id)[0])
            });
            this.page.desserts.forEach(id => {
                this.menu.desserts.push(this.meals.filter(meal => meal._id === id)[0])
            })
        }
    }
</script>