<template>
    <div class="photocontent">
        <h1>
            {{photoinfo.title}}
        </h1>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time |dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图 -->
       
            <vue-preview :slides="slide1" class="thumbs"></vue-preview>
      

        <div v-html="photoinfo.content" class="content"></div>

        <!-- 评论组件 -->
        <com :id="id"></com>
    </div>

</template>

<script>
    import {Toast} from "mint-ui"
    import comment from '../subcomments/comment.vue'
    export default {
        data() {
            return {
                id:this.$route.params.id,
                photoinfo:{},
                slide1:[]
            }
        },
        created () {
            this.getphotoinfo(),
            this.getpicture()
        },
        methods: {
            getphotoinfo() {
                this.$http.get('api/getimageInfo/' +this.id).then(result => {
                    if(result.body.status === 0) {
                        this.photoinfo=result.body.message[0]
                    } else {
                        Toast('失败')
                    }
                })
            },
            getpicture() {
                this.$http.get('api/getthumimages/' +this.id).then(result => {
                     if(result.body.status === 0) {
                           result.body.message.forEach(item => {
                               item.w = 600;
                               item.h = 400;
                               item.msrc = item.src
                           })
                        } else {
                            Toast('失败...')
                        }
                        this.slide1=result.body.message;
                })
            }
        },
        components: {
            'com':comment
        }
    }

</script>


<style lang="scss" >
    .photocontent {
        padding: 10px;
        h1 {
            color: skyblue;
            font-size: 16px;
            margin: 15px 0;
            text-align: center;
        }
        .subtitle {
            font-size: 14px;
            display: flex;
            justify-content:space-between;
            margin: 10px 0;
        }
        .content {
            font-size: 14px;
        }

        .thumbs {
             .my-gallery{
                display: flex;
                flex-wrap: wrap;
                figure {
                    margin: 10px;
                    box-shadow: 0 0 10px #999;
                    img{
                        width: 100px;
                        vertical-align: middle;
                    }
                }
                }
        }
    }

</style>