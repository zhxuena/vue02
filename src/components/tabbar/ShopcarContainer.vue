<template>
     <div class="shopcarcontent">
           <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content goodlist">
					<div class="mui-card-content-inner">

						<mt-switch></mt-switch>
                              <img :src="item.thumb_path" alt="">
                              <div class="info">
                                   <h1>{{item.title}}</h1>
                                   <p>
                                        <span class="price">￥{{item.sell_price}}</span>
                                        <numbox :initcount="$store.getters.getGoodsCount[item.id]"  :goodsid="item.id"></numbox>
                                        <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                                   </p>
                              </div>
					</div>
				</div>
			</div>

          <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                                   <p>总计</p>
                                   <p>已勾选商品<span class="red">0</span>件&nbsp;&nbsp; 总价：<span class="red">0</span></p>
                              </div>
                              <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>

     </div>
</template>
<script>
import numbox from '../subcomments/shopcar-numberbox.vue'
export default {
     data() {
          return {
               goodslist:[]
          }
     },
     created () {
       this.getGoodsList()
     },
     methods: {
          getGoodsList() {
               var idarr=[];
               this.$store.state.car.forEach(item => idarr.push(item.id)) 
                    if(idarr.length<=0) {
                         return
                    }

                    this.$http.get("api/goods/getshopcarlist/"+idarr.join(',')).then(result=> {
                         console.log(result.body);
                         if(result.body.status===0) {
                              this.goodslist=result.body.message
                         }
                    })
              
          },
          remove(id,index) {
               this.goodslist.splice(index,1)
               this.$store.commit("removecar",id)
          }
     },
    components: {
         numbox
    }
}
</script>

<style lang="scss" scoped>
     .shopcarcontent {
          background-color: #eee;
          overflow: hidden;
          .goodlist {
               .mui-card-content-inner {
                    display: flex;
                    align-items: center
               }
               img {
                    width: 60px;
                    height: 60px;
                    margin-left: 6px;
               }
               h1 {
                    font-size: 13px;
                    margin-bottom: 8px;
               }
               .info{
                   margin-left: 6px;
                    .price {
                         color: red;
                         font-weight:bold;
                    }
                    a {
                         margin-left: 20px;
                    }
               }
          }

          .jiesuan {
               display: flex;
               align-items: center;
               justify-content: space-between;

               .red{
                    color: red;
                    font-size: 16px;
                    font-weight: bold;
               }
          }
     }
</style>


