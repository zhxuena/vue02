<template>
    <div class="goodinfo">

       <transition
       @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
       >
            <div class="ball" v-show="flag" ref="ball"></div>
       </transition>
       <div class="mui-card">

				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbolist="lunbo" :isfull=false></swiper>
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            <span class="old">市场价：<del>￥{{goodsinfo.market_price}}</del></span>
                            <span class="new">销售价：<b>￥{{goodsinfo.sell_price}}</b></span>
                        </p>
                        <p>购买数量：<memberbox @getcount="getselectedCount" :max="goodsinfo.stock_quantity"></memberbox></p>
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger" @click="addshopcar">加入购物车</mt-button>
					</div>
				</div>
			</div>

            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner content">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间：{{goodsinfo.add_time}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
                    <mt-button type="danger"  size="large" plain @click="gocomment(id)">商品评论</mt-button>
                </div>
			</div>
            
            
    </div>    
</template>


<script>

import swiper from "../subcomments/swiper.vue"
import memberbox from "../subcomments/mumberbox.vue"

export default {
    data() {
        return {
            id:this.$route.params.id,
            lunbo:[],
            goodsinfo:{},
            flag:false,
            selectedCount:1
        }
    },
    created () {
        this.getgoodslunbo(),
        this.getgoods()
    },
    methods: {
        getgoodslunbo() {
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                // console.log(result.body);
                if(result.body.status ===0 ){
                    result.body.message.forEach(item => {
                        item.img=item.src
                    })
                    this.lunbo=result.body.message
                }
            })
        },
        getgoods() {
            this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                console.log(result.body);
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0]
                }
            })
        },
        godesc(id) {
            this.$router.push("/home/goodsdetail/"+id)
        },
        gocomment(id) {
            this.$router.push("/home/goodscomment/"+id)
        },
        addshopcar() {
            this.flag=!this.flag
            var goodsinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.sell_price,
                selected:true
            }
            this.$store.commit('addToCar',goodsinfo)
        },
         beforeEnter(el) {
            el.style.transform = "translate(0, 0)";
            },
            enter(el,done){
                el.offsetwidth
            
                const ballPosition=this.$refs.ball.getBoundingClientRect()
                const badgePosition=document.getElementById("badge").getBoundingClientRect()

                const x=badgePosition.left-ballPosition.left
                const y=badgePosition.top-ballPosition.top
                el.style.transform=`translate(${x}px,${y}px)`

                el.style.transition="all 0.6s cubic-bezier(.4,-0.3,1,.68)"
                done()
            },
         afterEnter(el) {
            this.flag = !this.flag;
            },

          getselectedCount(count) {
              this.selectedCount=count
              console.log(this.selectedCount);
          }  

    },
    components: {
        swiper,
        memberbox
    }
}
</script>


<style lang="scss" scoped>
    .goodinfo {
        background-color: #eee;
        overflow: hidden;

        .price {
            font-size: 14px;
            .new {
                margin-left: 10px;
                b {
                    color: red;
                    font-size: 16px;
                }
                
            }
        }
        .content {
            font-size: 14px;
            color: #ccc;
        }

        .mui-card-footer {
            display: block;
            button {
                margin: 15px 0;
            }
        }

        .ball {
           width: 15px;
           height: 15px;
           background-color: red;
            border-radius: 50%;
            position: absolute;
            left: 148px;
            top: 390px;
            z-index: 999;
           
        }

    }
</style>
 