<template>
    <section class="sections_images">
        <img src="../assets/images/cover1.jpg" alt="terrasse du restaurant la demi-lune à Dole">
        <img src="../assets/images/cover4.jpg" alt="terrasse du restaurant la demi-lune à Dole">
        <img src="../assets/images/cover3.jpg" alt="terrasse du restaurant la demi-lune à Dole">
        <img src="../assets/images/cover2.jpg" alt="terrasse du restaurant la demi-lune à Dole">
    </section>
</template>

<script>
    export default {
        name: 'Gallery',
    }
</script>

<style lang="scss">
    .sections_images {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        img {
            width: calc(50% - 10px);
            object-fit: cover;
            &:nth-of-type(1),
            &:nth-of-type(2) {
                margin-bottom: 20px;
            }
        }
    }
</style>