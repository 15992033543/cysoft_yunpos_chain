<template>
  <div class="not-found-container">
    <div class="img-container">
      <img class="main-img" :src="notFoundImg">
    </div>
    <div class="content-container">
      <h2 class="title">糟糕！</h2>
      <p class="tips">该页面不能访问，请检查您输入的地址是否正确</p>
      <p class="select">您可以选择：</p>
      <ul class="nav">
        <li><a @click="$appPush({ name: 'Home' })">返回首页</a></li>
        <li><a @click="$router.go(-1)">返回上一页</a></li>
      </ul>
      <p class="copyright">版权所有：<a href="http://chaoying.com.cn/" target="_blank">广州市超赢信息科技有限公司</a></p>
    </div>
  </div>
</template>

<script>
import notFoundImg from '@/assets/img/404.gif'

export default {
  name: 'Error404',

  data () {
    return {
      notFoundImg: notFoundImg
    }
  }
}
</script>

<style scoped lang="scss">
  .not-found-container {
    width: 850px;
    margin: 0 auto;
    position: relative;
    top: 100px;
    overflow: hidden;

    .img-container {
      width: 450px;
      float: left;
      position: relative;

      .main-img {
        width: 100%;
        opacity: 0;
        animation: fade-out 1s forwards;
      }
    }
    .content-container {
      float: left;
      width: 400px;
      color: #000;
      font-size: 14px;
      margin-top: 50px;

      .title {
        font-size: 32px;
        color: #1482f0;
        margin: 0;
        animation: slide-up 0.5s forwards;
        opacity: 0;
      }

      .tips {
        color: red;
        margin: 20px 0;
        font-weight: 700;
        animation: slide-up 0.5s forwards;
        animation-delay: 0.1s;
        opacity: 0;
      }

      .select {
        animation: slide-up 0.5s forwards;
        animation-delay: 0.2s;
        opacity: 0;
      }

      .nav {
        font-size: 14px;
        margin-top: 10px;
        margin-left: 17px;
        animation: slide-up 0.5s forwards;
        animation-delay: 0.3s;
        opacity: 0;

        li {
          list-style-type: disc;
          padding: 2px 0;
        }
      }

      .copyright {
        animation: slide-up 0.5s forwards;
        animation-delay: 0.4s;
        opacity: 0;
      }

      @keyframes slide-up {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
    a {
      color: #409EFF;
      cursor: pointer;
    }
    p {
      margin: 0;
      margin-top: 10px;
    }
  }
</style>
