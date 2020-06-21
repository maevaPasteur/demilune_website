<template>
    <div class="choices" :style="menuChoiceStyle">
        <div v-for="(meal, index) in item" :key="page.id+'item'+index">
            <p :style="menuMealStyles" v-if="index !== 0" class="or">Ou</p>
            <h3 :style="h3Styles" class="title">{{ meal.title }}</h3>
            <p v-if="meal.description">{{ meal.description }}</p>
            <p class="info" :style="infoStyle" v-if="meal.infos">{{ meal.infos }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MenuChoice',
        props: ['item', 'page', 'infoStyle', 'menuMealStyles', 'h3Styles', 'menuChoiceStyle']
    }
</script>