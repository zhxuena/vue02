<template>
    <div class="goodlist">

        <div class="gooditem" v-for="item in goodlist" :key="item.id" @click="godetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1>{{item.title}}</h1>
            <div class="down">
                <p class="price">
                    <span class="new">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="cell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
      
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodlist:[],
            pageindex:1
        }
    },
    created () {
        this.getgoodlist()
    },
    methods: {
        getgoodlist() {
            this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
                if(result.body.status === 0) {
                    this.goodlist=this.goodlist.concat(result.body.message);
                    
                }
            })
        },
        getMore() {
            this.pageindex++;
            this.getgoodlist()
        },
        godetail(id) {
            // 1.
            this.$router.push('/home/goodinfo/'+id)

            // 2.
            //  this.$router.push({path:'/home/goodinfo'+id})
         }
        
    }
}
</script>


<style lang="scss" scoped>
    .goodlist {
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
        padding: 7px;
        .gooditem {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin-top: 5px;
            padding: 2px;
             padding-top: 10px;
            // min-height: 283px;
              display: flex;
              flex-direction: column;  
               justify-content: space-between;
            img {
                width: 100%;
            }

            h1 {
                font-size: 14px;
                margin: 5px 0;

            }

            .down {
                margin-top: 10px;
                background-color: #eee;

                .price {
                    font-size: 14px;
                    padding-top: 7px;
                    .new {
                        color: red;
                        font-size: 16px;
                         font-weight: bold;
                    }
                    .old {
                        margin-left: 10px;
                        text-decoration: line-through;
                    }
                }
                .cell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    margin-bottom: 0;
                 
                }
                
            }
        }

        button {
            margin: 20px 0;
        }
    }
    
</style>

