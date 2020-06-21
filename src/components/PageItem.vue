<template>
    <div class="page-item" v-if="content.length">
        <h3>{{page.title}}</h3>
        <div class="meal" v-for="meal in content" :key="'meal-'+meal._id">
            <h4>
                <span>{{ meal.title }}</span>
                <span v-if="meal.price" class="price">{{ meal.price | price }}€</span>
            </h4>
            <p class="description" v-if="meal.description">{{ meal.description }}</p>
            <p class="infos" v-if="meal.infos">{{ meal.infos }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageItem',
        props: ['page', 'meals'],
        data() {
            return {
                content: []
            }
        },
        mounted() {
            this.page.content.forEach(id => {
                this.content.push(this.meals.filter(meal => meal._id === id)[0])
            });
        }
    }
</script>