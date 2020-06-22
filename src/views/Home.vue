<template>
  <default-layout v-if="general" :text="general.footer">
    <div class="page-home">
      <section class="section_video">
        <div>
          <h1 v-html="title()"></h1>
          <div>
            <router-link :to="{name: 'Carte'}">{{ general.button }}</router-link>
          </div>
        </div>
        <video autoplay muted loop poster="../assets/videos/cover.jpg">
          <source src="../assets/videos/demilune.mp4" type="video/mp4">
        </video>
      </section>

      <section class="section_text wrapper section-1">
        <h2>{{ general.title_2 }}</h2>
        <p>{{ general.text_2 }}</p>
      </section>

      <img src="../assets/images/terrasse.webp" alt="terrasse du restaurant la demi-lune à Dole">

      <section class="section_horraires wrapper section-1">
        <h2>Horraires</h2>
        <ul>
          <li v-if="general.day_1 && general.day_1 !== ''"><span>Lundi</span>{{ general.day_1 }}</li>
          <li v-if="general.day_2 && general.day_2 !== ''"><span>Mardi</span>{{ general.day_2 }}</li>
          <li><span>Mercredi</span>{{ general.day_3 }}</li>
          <li><span>Jeudi</span>{{ general.day_4 }}</li>
          <li><span>Vendredi</span>{{ general.day_5 }}</li>
          <li><span>Samedi</span>{{ general.day_6 }}</li>
          <li><span>Dimanche</span>{{ general.day_7 }}</li>
        </ul>
      </section>

      <gallery/>

      <section class="section_menu wrapper section-1 center">
        <router-link class="link-2" :to="{name: 'Carte'}">{{ general.button_2 }}</router-link>
      </section>

    </div>
  </default-layout>
</template>

<script>

    import axios from 'axios';
    import Gallery from "../components/Gallery";

    export default {
        name: 'Home',
        components: {Gallery},
        mounted() {
            axios
                .get('http://localhost:3000/general', {
                  headers: {'Access-Control-Allow-Origin': '*'}
                })
                .then(res => {
                  if(res.data.error || !res.data.length) {
                    console.log("général est vide")
                  } else {
                    this.general = res.data[0];
                    this.testSections()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
        },
        data() {
            return {
                general: undefined
            }
        },
        updated() {
          this.testSections();
          window.addEventListener('scroll',() => {
            this.testSections()
          })
        },
        methods: {
            title() {
                if(this.general) {
                    let newTitle = '';
                    this.general.title.split('<br>').forEach(item => {
                        newTitle += `<span>${ item }</span>`
                    });
                    return newTitle
                }
            },
            testSections() {
              document.querySelectorAll('.page-home section:not(.show)').forEach(section => {
                if(this.isVisible(section)) {
                  section.classList.add('show')
                }
              });
            },
            isVisible(element) {
              var position = element.getBoundingClientRect();
              return position.top < window.innerHeight && position.bottom >= 0;
            }
        }
    }
</script>

<style lang="scss">
  .section_video {
    position: relative;
    height: 100vh;
    color: #fff;
    font-size: 70px;
    line-height: 1;
    video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & > div {
      position: absolute;
      z-index: 2;
      top: 50%;
      transform: translateY(-50%);
      left: 100px;
    }
    h1 span {
      display: block;
      background-color: #000;
      width: fit-content;
      padding: 0 10px;
      overflow: hidden;
      max-width: 1000px;
      white-space: nowrap;
      transition: max-width ease-out .8s .5s, padding ease-out .4s .5s;
      &:nth-of-type(2) {
        transition-delay: .7s;
      }
      &:nth-of-type(3) {
        transition-delay: .9s;
      }
      &:not(:last-of-type) {
        margin-bottom: 15px;
      }
    }
    a {
      margin-top: 40px;
      display: block;
      width: fit-content;
      font-size: 20px;
      padding: 20px 25px 16px;
      line-height: 1;
      font-weight: 300;
      min-width: 150px;
      text-align: center;
      cursor: pointer;
      border: solid 2px #000;
      position: relative;
      transition: color ease-out .3s, transform ease-out .7s 1.1s;
      &:before {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        background-color: #000;
        transition: width ease-out .3s;
      }
      &:hover {
        color: #000;
        &:before {
          width: 0;
        }
      }
    }
    div div {
      overflow: hidden;
    }
    &:not(.show) {
      h1 span {
        max-width: 0;
        padding: 0;
      }
      div div a {
        transform: translateX(-100%);
      }
    }
  }
  .section_text {
    font-size: 45px;
    line-height: 1.5;
    h2 {
      font-size: 20px;
    }
    h2, p {
      transition: transform ease-out 1s .5s, opacity ease-out 1s .5s;
    }
    p {
      transition-delay: .7s;
    }
    &:not(.show) {
      h2, p {
        opacity: 0;
        transform: translateY(30px);
      }
    }
  }
  .section_horraires {
    text-align: center;
    h2 {
      font-size: 45px;
    }
    ul {
      font-size: 35px;
      line-height: 2;
    }
    span {
      position: relative;
      margin-right: 20px;
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #ffed00;
        z-index: -1;
        left: -5px;
        top: 2px;
        transform-origin: 0 0;
        transition: transform ease-out .5s .7s;
      }
    }
    h2, li {
      transition: transform ease-out 1s .5s, opacity ease-out 1s .5s;
    }
    li:nth-of-type(2) {
      transition-delay: .7s;
      span:before {
        transition-delay: .9s;
      }
    }
    li:nth-of-type(3) {
      transition-delay: .9s;
      span:before {
        transition-delay: 1.1s;
      }
    }
    li:nth-of-type(4) {
      transition-delay: 1.1s;
      span:before {
        transition-delay: 1.3s;
      }
    }
    li:nth-of-type(5) {
      transition-delay: 1.3s;
      span:before {
        transition-delay: 1.5s;
      }
    }
    li:nth-of-type(6) {
      transition-delay: 1.5s;
      span:before {
        transition-delay: 1.7s;
      }
    }
    li:nth-of-type(7) {
      transition-delay: 1.7s;
      span:before {
        transition-delay: 1.9s;
      }
    }
    &:not(.show) {
      h2, li {
        opacity: 0;
        transform: translateY(30px);
      }
      span:before {
        transform: scale(0, 1);
      }
    }
  }
  .center {
    text-align: center;
  }
  
  @media screen and (max-width: 1024px) {
    .section_video {
      font-size: 50px;
      line-height: 1.2;
      & > div {
        left: 20px;
      }
    }
    .section_text {
      max-width: 700px;
      font-size: 30px;
      padding-top: 100px;
      padding-bottom: 100px;
    }
    .section_horraires {
      padding-top: 100px;
      padding-bottom: 100px;
      h2 {
        font-size: 20px;
      }
      ul {
        font-size: 30px;
      }
    }
    .sections_images {
      img {
        width: calc(50% - 5px);
        &:nth-of-type(1),
        &:nth-of-type(2) {
          margin-bottom: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 520px) {
    .section_video {
      font-size: 33px;
      line-height: 1.5;
      h1 span:not(:last-of-type) {
        margin-bottom: 10px;
      }
    }
    .section_text {
      font-size: 25px;
    }
    .section_horraires ul {
      font-size: 20px;
    }
    .sections_images {
      img {
        width: 100%;
        margin-bottom: 2px;
        &:nth-of-type(1),
        &:nth-of-type(2) {
          margin-bottom: 2px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }

</style>
