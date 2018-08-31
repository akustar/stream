<template>
  <div class="header">
    <h1 class="branding"><a href="/" class="logo">stream</a></h1>
    <div class="actions">
      <a href="#!" v-if="isDesktop">데스크탑 다운로드</a>
      <a href="#!" v-if="!isDesktop && !isStandalone">홈 화면에 추가</a>
      <button type="button" class="icon-button"><i class="material-icons">more_vert</i></button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isDesktop: window.ontouchstart !== null,
        isStandalone: window.matchMedia('(display-mode: standalone)').matches
      }
    },
  }
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    padding: 0 8px 0 16px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  }

  .branding {
    display: flex;
  }

  .branding > a.logo {
    padding-left: 32px;
    font-size: 24px;
    font-weight: 400;
    color: #292929;
    background: url(../assets/images/logo.svg) no-repeat 2px 100%;
    background-size: 28px auto;
  }

  .branding > a.logo:hover {
    text-decoration: none;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .actions .icon-button {
    margin-left: 8px;
    padding: 8px;
    color: #292929;
  }

  .actions .icon-button i.material-icons {
    font-size: 30px;
  }

  @media (max-width: 1088px) {
    .header {
      height: 56px;
      padding: 0 12px 0 6px;
    }
    .branding > a.logo {
      font-size: 22px;
      background-size: 26px auto;
    }
    .actions .icon-button {
      padding: 4px;
    }
  }  
</style>