<template>
    <div class="parent" v-if="meals && page">
        <div class="page" :id="page.id" :class="menuClass" :style="pageStyles">
            <div class="heading" :style="titleMarginBottom">
                <h2 :style="h2Styles" :class="menuPriceClass">
                    <span>{{ page.title }}</span>
                    <span class="menu-price" v-if="page.price">{{ page.price | price }}€</span>
                </h2>
                <h3 v-if="page.description">{{ page.description }}</h3>
            </div>
            <div v-if="!isMenu">
                <div class="meal" v-for="meal in content" :key="page.id + meal._id" :style="mealStyles">
                    <h3 :style="h3Styles" class="meal-price" :class="general.mealPriceStyle">
                        <span class="title">{{ meal.title }}</span>
                        <span :style="priceStyles" v-if="meal.price" class="price">{{ meal.price | price }}€</span>
                    </h3>
                    <p v-if="meal.description">{{ meal.description }}</p>
                    <p class="info" :style="infoStyle" v-if="meal.infos">{{ meal.infos }}</p>
                    <ul v-if="meal.variant_1_title || meal.variant_2_title" :class="general.mealPriceStyle">
                        <li v-if="meal.variant_1_title && meal.variant_1_price">
                            <h4>{{  meal.variant_1_title }}</h4>
                            <p class="price"><span>{{  meal.variant_1_price | price }}€</span></p>
                        </li>
                        <li v-if="meal.variant_2_title && meal.variant_2_price">
                            <h4>{{  meal.variant_2_title }}</h4>
                            <p class="price"><span>{{  meal.variant_2_price | price }}€</span></p>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else class="menu-meals">
                <MenuChoice v-if="menu.starters.length" :item="menu.starters" :page="page" :info-style="infoStyle" :menu-meal-styles="menuMealStyles" :h3-styles="h3Styles" :menu-choice-style="menuChoiceStyle" />
                <hr v-if="menuStyle === 'menu-style-2' && menu.starters.length">
                <MenuChoice v-if="menu.meals.length" :item="menu.meals" :page="page" :info-style="infoStyle" :menu-meal-styles="menuMealStyles" :h3-styles="h3Styles" :menu-choice-style="menuChoiceStyle" />
                <hr v-if="menuStyle === 'menu-style-2' && menu.meals.length">
                <MenuChoice v-if="menu.desserts.length" :item="menu.desserts" :page="page" :info-style="infoStyle" :menu-meal-styles="menuMealStyles" :h3-styles="h3Styles" :menu-choice-style="menuChoiceStyle" />
            </div>
        </div>
    </div>
</template>

<script>
    import MenuChoice from "./MenuChoicie";
    export default {
        name: 'MenuPage',
        components: {MenuChoice},
        props: {
            page: {},
            general: {},
            meals: {}
        },
        data() {
            return {
                isMenu: this.page.type === 'menu',
                content: [],
                menu: {
                    starters: [],
                    meals: [],
                    desserts: []
                }
            }
        },
        computed: {
            pageStyles() {
                let styles = {
                    padding: this.general.marginTop + 'px ' + this.general.marginLeft + 'px 0',
                    height: 'calc(1120px - ' + this.general.marginTop + 'px)',
                    fontSize: this.general.textSize + 'px',
                    lineHeight: this.general.lineHeight
                };
                if(this.isMenu && this.menuStyle === 'menu-style-2') {
                    styles.padding = this.general.marginTop + 'px ' + this.general.marginLeft + 'px'
                }
                return styles
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
            },
            menuMealStyles() {
                return {
                    margin: (this.general.menuMealMarginBottom / 2) + 'px 0',
                }
            },
            menuStyle() {
              return this.general.menuStyle
            },
            menuClass() {
                if(this.isMenu) {
                    return this.general.menuStyle + ' is-menu'
                } else {
                    return ''
                }
            },
            menuChoiceStyle() {
                if(this.general.menuStyle === 'menu-style-1') {
                    return {
                        marginTop: this.general.menuMealMarginBottom + 'px',
                        paddingTop: this.general.menuMealMarginBottom + 'px'
                    }
                }else {
                    return ''
                }
            }
        },
        mounted() {
            if(this.page.content) {
                this.page.content.forEach(id => {
                    this.content.push(this.meals.filter(meal => meal._id === id)[0]);
                })
            } else {
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
    .meal ul {
        margin-top: 5px;
        li {
            display: flex;
            p:before {
                content: '';
                display: block;
                height: 1px;
                width: 100%;
                margin: 0 10px;
            }
        }
        p {
            flex-grow: 1;
            display: flex;
            align-items: baseline;
        }
        &.price-1 p:before {
            background-color: #ddd;
        }
        &.price-2 p:before {
            border-bottom: dashed 1px #ddd;
        }
    }
    .menu-meals {
        text-align: center;
        max-width: 80%;
        margin: auto;
        .or {
            opacity: .6;
        }
    }
    .menu-style-1 {
        .choices:not(:first-of-type) {
            position: relative;
            &:before {
                content: '';
                width: 150px;
                height: 1px;
                background-color: #ddd;
                display: block;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    .menu-style-2 {
        display: flex;
        flex-direction: column;
        .menu-meals {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        hr {
            width: 150px;
            border: 0;
            border-bottom: solid 1px #ddd;
            margin: 0 auto;
        }
    }
</style>
