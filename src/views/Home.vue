<template>
  <default-layout>
    <div class="page-home">
      <section class="section_video">
        <div>
          <h1>
            <span>Restaurant</span>
            <span>de spécialités</span>
            <span>régionales à Dole !</span>
          </h1>
          <a>La carte</a>
        </div>
        <video autoplay muted loop poster="../assets/videos/cover.jpg">
          <source src="../assets/videos/demilune.mp4" type="video/mp4">
        </video>
      </section>

      <section class="section_text wrapper section-1">
        <h2>Envie de déjeuner en terrasse ?</h2>
        <p>Le restaurant la Demi-lune vous propose une jolie terrasse aux bord du canal dans le vieux Dole. Découvrez nos spécialités régionales avec une large sélection de vins pour accompagner ces délicieux produits du terroir.</p>
      </section>

      <img src="../assets/images/terrasse.jpg" alt="terrasse du restaurant la demi-lune à Dole">

      <section class="section_horraires wrapper section-1">
        <h2>Horraires</h2>
        <ul>
          <li><span>Lundi</span> 19h 22h</li>
          <li><span>Mardi</span> 19h 22h</li>
          <li><span>Mercredi</span> 12h 14h - 19h 22h</li>
          <li><span>Jeudi</span> 12h 14h - 19h 22h</li>
          <li><span>Vendredi</span> 12h 14h - 19h 22h</li>
          <li><span>Samedi</span> 12h 14h - 19h 22h</li>
          <li><span>Dimanche</span> 12h 14h - 19h 22h</li>
        </ul>
      </section>

      <section class="sections_images">
        <img src="../assets/images/cover1.jpg" alt="terrasse du restaurant la demi-lune à Dole">
        <img src="../assets/images/cover4.jpg" alt="terrasse du restaurant la demi-lune à Dole">
        <img src="../assets/images/cover3.jpg" alt="terrasse du restaurant la demi-lune à Dole">
        <img src="../assets/images/cover2.jpg" alt="terrasse du restaurant la demi-lune à Dole">
      </section>
      <section class="section_menu wrapper section-1 center">
        <a class="link-2">Voir la carte</a>
      </section>
    </div>
  </default-layout>
</template>

<script>

export default {
  name: 'Home',
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
      padding: 0 5px;
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
      min-width: 200px;
      text-align: center;
      cursor: pointer;
      border: solid 2px #000;
      position: relative;
      transition: color ease-out .3s;
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
  }
  .section_text {
    font-size: 45px;
    line-height: 1.5;
    h2 {
      font-size: 20px;
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
      }
    }
  }
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
  .center {
    text-align: center;
  }
</style>
