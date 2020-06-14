<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: "Gordita";
    font-weight: 300;
    src: url("assets/fonts/Gordita/gorditaregular-webfont.woff2") format("woff2")
  }
  @font-face {
    font-family: "Gordita";
    font-weight: 400;
    src: url("assets/fonts/Gordita/gorditamedium-webfont.woff2") format("woff2")
  }
  @font-face {
    font-family: "Gordita";
    font-weight: 500;
    src: url("assets/fonts/Gordita/gorditabold-webfont.woff2") format("woff2")
  }
  * {
    padding: 0;
    margin: 0;
    font-weight: inherit;
    color: inherit;
    font-size: inherit;
    text-decoration: none;
    list-style-type: none;
    outline: none;
  }
  input {
    outline: none;
  }
  button {
    background: none;
    border: none;
  }
  img {
    width: 100%;
    height: auto;
  }
  button {
      font-family: 'Gordita', sans-serif;
  }
  body {
    font-size: 18px;
    color: #000;
    font-family: 'Gordita', sans-serif;
  }
  main {
    position: relative;
    z-index: 1;
  }
  .wrapper {
    width: calc(100% - 20px);
    max-width: 1000px;
    display: block;
    margin: auto;
  }
  .section-1 {
    padding-top: 150px;
    padding-bottom: 150px;
    h2 {
      margin-bottom: 50px;
    }
  }
  .link-1, .page-admin header li {
    span, a {
      position: relative;
      &:before {
        content: '';
        display: block;
        width: 0;
        height: calc(100% + 5px);
        position: absolute;
        right: -6px;
        top: -2px;
        background-color: #ffed00;
        z-index: -1;
        transition: width ease-out .2s;
      }
    }
    &:hover span:before,
    &:hover a:before {
      width: 100%;
    }
  }
  .link-2 {
    border: solid 2px #000;
    font-size: 20px;
    padding: 20px 25px 16px;
    line-height: 1;
    font-weight: 300;
    position: relative;
    transition: color ease-out .3s;
    cursor: pointer;
    &:before {
      content: '';
      z-index: -1;
      position: absolute;
      width: 0;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #000;
      display: block;
      transition: width ease-out .3s;
    }
    &:hover {
      color: #fff;
      &:before {
        width: 100%;
      }
    }
  }
</style>
