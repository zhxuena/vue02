<template>
    <div class="newscontent">
       <h3 class="title">{{newsinfo.title}}</h3>
       <p class="subtitle">
           <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
           <span>点击：{{newsinfo.click}}</span>
        </p> 

        <hr>

        <div class="content" v-html="newsinfo.content"></div>

        <comment-box :id="this.id"></comment-box>
    </div>
</template>


<script>
import {Toast} from "mint-ui"

import comment from '../subcomments/comment.vue'

 export default {
    data() {
        return {
            id:this.$route.params.id,
             newsinfo:{}  
        }
    },
    created () {
     this.getnewsinfo()
    },
    methods: {
        getnewsinfo() {
            this.$http.get('api/getnew/' +this.id).then(result => {
                console.log(result.body);
                console.log('11111');
                if(result.body.status ===0) {
                    this.newsinfo=result.body.message[0]
                } else {
                    Toast("获取信息失败")
                }
            })
        }
    },
    components: {
        'comment-box':comment
    }
}
</script>

<style lang="scss">
    .newscontent {
        padding:0 5px;
        .title {
            font-size: 16px;
            text-align: center;
            margin:15px 0;

        }
        .subtitle {
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            color: aqua;
        }
        .content {
            font-size: 14px;
            img {
                width: 100%;
            }
        }
        img {
            width: 100%;
        }
    }
</style>
