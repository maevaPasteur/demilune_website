import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Login from '../views/Login'
import Admin from '../views/Admin'
import Meals from "../views/Meals";
import MealsCreate from "../views/MealsCreate";
import MealsUpdate from "../views/MealsUpdate";
import Pages from "../views/Pages";
import PagesCreate from "../views/PagesCreate";
import PagesUpdate from "../views/PagesUpdate";
import Menus from "../views/Menus";
import MenusUpdate from "../views/MenusUpdate";
import MenusCreate from "../views/MenusCreate";
import RestaurantMenu from "../views/RestaurantMenu";
import Carte from "../views/Carte";

Vue.use(VueRouter);

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/connexion',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/admin/plats',
      name: 'Meals',
      component: Meals
    },
    {
      path: '/admin/plats/nouveau',
      name: 'MealCreate',
      component: MealsCreate
    },
    {
      path: '/admin/plats/:id',
      name: 'MealUpdate',
      component: MealsUpdate
    },
    {
      path: '/admin/pages',
      name: 'Pages',
      component: Pages
    },
    {
      path: '/admin/pages/nouveau',
      name: 'PagesCreate',
      component: PagesCreate
    },
    {
      path: '/admin/pages/:id',
      name: 'PagesUpdate',
      component: PagesUpdate
    },
    {
      path: '/admin/menus',
      name: 'Menus',
      component: Menus
    },
    {
      path: '/admin/menus/:id',
      name: 'MenusUpdate',
      component: MenusUpdate
    },
    {
      path: '/admin/menus/:id',
      name: 'MenusCreate',
      component: MenusCreate
    },
    {
      path: '/admin/carte',
      name: 'RestaurantMenu',
      component: RestaurantMenu
    }
    ,
    {
      path: '/carte',
      name: 'Carte',
      component: Carte
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
