<template>
    <div v-if="meals" class="menu-choice-web">
        <div v-for="(meal, index) in meals" :key="meal._id">
            <p class="or" v-if="index !== 0">Ou</p>
            <h4>{{ meal.title }}</h4>
            <p class="description" v-if="meal.description">{{ meal.description }}</p>
            <p class="infos" v-if="meal.infos">{{ meal.infos }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MenuChoiceWeb',
        props: ['meals']
    }
</script>

