<template>
    <div class="parent" v-if="meals && page">
        <div class="page" :id="page.id" :class="{ isMenu: 'is-menu' }" :style="pageStyles">
            <div class="heading" :style="titleMarginBottom">
                <h2 :style="h2Styles" :class="menuPriceClass">
                    <span>{{ page.title }}</span>
                    <span class="menu-price" v-if="page.price">{{ page.price | price }}€</span>
                </h2>
                <h3 v-if="page.description">{{ page.description }}</h3>
            </div>
            <div v-if="!isMenu">
                <div class="meal" v-for="meal in content" :key="meal.id" :style="mealStyles">
                    <h3 :style="h3Styles" class="meal-price" :class="general.mealPriceStyle">
                        <span class="title">{{ meal.title }}</span>
                        <span :style="priceStyles" v-if="meal.price" class="price">{{ meal.price | price }}€</span>
                    </h3>
                    <p v-if="meal.description">{{ meal.description }}</p>
                    <p class="info" :style="infoStyle" v-if="meal.infos">{{ meal.infos }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MenuPage',
        props: {
            page: {},
            general: {},
            meals: {}
        },
        data() {
            return {
                isMenu: this.page.type === 'menu',
                content: []
            }
        },
        computed: {
            pageStyles() {
                return {
                    padding: this.general.marginTop + 'px ' + this.general.marginLeft + 'px 0',
                    height: 'calc(1120px - ' + this.general.marginTop + 'px)',
                    fontSize: this.general.textSize + 'px',
                    lineHeight: this.general.lineHeight
                }
            },
            h2Styles() {
              return {
                  fontSize: this.isMenu ? this.general.titleMenuSize + 'px' : this.general.titleSize + 'px',
                  textAlign: (this.page.type === 'menu' && this.general.centerMenuTitle) || (this.page.type !== 'menu' && this.general.centerTitle) ? 'center' : 'left'
              }
            },
            mealStyles() {
              return {
                  marginTop: this.general.mealMarginBottom + 'px'
              }
            },
            h3Styles() {
                return {
                    fontSize: this.general.titleMealSize + 'px'
                }
            },
            titleMarginBottom() {
                return {
                    marginBottom: this.isMenu ? this.general.titleMenuMarginBottom + 'px' : this.general.titleMarginBottom + 'px'
                }
            },
            priceStyles() {
                return {
                    fontSize: this.general.textSize + 'px'
                }
            },
            infoStyle() {
                return {
                    color: this.general.infoColor
                }
            },
            menuPriceClass() {
                return this.isMenu ? this.general.menuPriceStyle : ''
            }
        },
        mounted() {
            if(this.page.content) {
                this.page.content.forEach(id => {
                    this.meals.forEach(meal => {
                        if(meal._id === id) {
                            this.content.push(meal)
                        }
                    })
                })
            }
            console.log('general');
            console.log(this.general)
        }
    }
</script>


<style lang="scss">
    .container-pages .parent {
        margin-bottom: 100px;
    }
    .page {
        position: relative;
        background-color: #fff;
        padding: 20px;
        h3 {
            margin-bottom: 5px;
        }
        .info {
            font-style: italic;
        }
    }
    .meal-price {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .price {
            display: flex;
            flex-grow: 1;
            align-items: baseline;
            min-width: 70px;
        }
        .price:before {
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            margin: 0 10px;
        }
        &.price-1 .price:before {
            background: #ddd;
        }
        &.price-2 .price:before {
            border-bottom: dashed 1px #ddd;
        }
    }
    .menu-price-2 {
        display: flex;
        align-items: center;
        justify-content: center;
        .menu-price {
            display: flex;
            align-items: baseline;
            font-size: 70%;
        }
        .menu-price:before {
            content: '';
            display: block;
            width: 30px;
            height: 2px;
            background-color: #ddd;
            margin: 0 10px;
        }
    }
    .menu-price-3 {
        span:first-of-type {
            border-bottom: solid 1px #ddd;
        }
        .menu-price {
            display: block;
            font-size: 70%;
            margin-top: 5px;
        }
    }
    .menu-price-1 {
        &:before,
        &:after {
            content: '';
            display: block;
            width: 150px;
            height: 1px;
            background-color: #ddd;
            margin: auto;
        }
        &:before {
            margin-bottom: 10px;
        }
        &:after {
            margin-top: 10px;
        }
        .menu-price {
            font-size: 80%;
            margin-left: 20px;
            transform: translateY(-10%);
            display: inline-block;
        }
    }
</style>
