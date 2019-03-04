<template>
    <div>
         <!-- 轮播图区域
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in lunbolist" :key="item.id">
                    <img :src="item.img" alt="">
                </mt-swipe-item>
             
            </mt-swipe> -->

            <swiper :lunbolist="lunbolist" :isfull=true></swiper>

        <!-- 6宫格 -->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photo">
		                    <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodlist">
		                    <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		            
		        </ul> 
    </div>
</template>
<script>
import {Toast} from "mint-ui";
// 引入轮播
import swiper from '../subcomments/swiper.vue'

export default {
    data() {
        return {
            lunbolist:[]
        }
    },
    created () {
        this.getLunbo()
    },
    methods: {
        getLunbo(){
            this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(result => {
                console.log(result.body);
                if(result.body.status ===0) {
                    this.lunbolist=result.body.message;
                }else {
                    Toast("加载轮播图失败")
                }

            })
        }
    },
    components: {
        swiper
    }
}
</script>

<style lang="scss" scoped>
    // .mint-swipe {
    //     height: 200px;
    //     .mint-swipe-item {
    //         &:nth-child(1) {
    //             background-color: blue;
    //         }
    //         &:nth-child(2) {
    //             background-color: skyblue;
    //         }
    //         &:nth-child(3) {
    //             background-color: pink;
    //         }
    //         img {
    //             width: 100%;
    //             height: 100%;
    //         }
    //     }
    // }

    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img {
            width: 60px;
            height: 60px;
        }

        .mui-media-body{
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
        }
</style>