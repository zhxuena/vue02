<template>
    <div class="comment">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" class="text" v-model="msg">

        </textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
            <div class="cmt-list">
                <div class="cmt-item"  v-for="(item,i) in comments" :key="i">
                    <div class="cmt-title">
                        第{{i+1}}楼 &nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}

                    </div>
                    <div class="cmt-body">
                        {{item.content}}
                    </div>
                </div>
            </div>
            
          

        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageindex:1,
            comments:[],
            msg:'',
           
        }
    },
    created () {
        this.getcomment()
    },
    methods: {
      getcomment() {
          this.$http.get("api/getcomments/"+this.id+" ?pageindex=" + this.pageindex).then(result => {
                 console.log(result.body);
                 if(result.body.status ===0) {
                    // this.comments=result.body.message
                    this.comments=this.comments.concat(result.body.message)
                 } else {
                     Toast("获取评论失败")
                 }
            })  
      },
      getmore() {
          this.pageindex++;
          this.getcomment()
      },
      postComment() {
          if(this.msg.trim().length === 0) {
                  return  Toast("评论不能为空")
              }

          this.$http.post('api/postcomment/' + this.$route.params.id,{content:this.msg.trim()}).then(result => {
              if(result.body.status === 0 ) {
                  var cmt ={user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()}
                  this.comments.unshift(cmt)
                  this.msg=''
              }
          })
      }
    },
    props: ['id']
}
</script>


<style lang="scss" scoped>
    .comment {
        h3 {
            font-size: 18px;
        }
        .text {
            font-size: 12px;
        }
        .cmt-list {
            font-size: 14px;
            
            .cmt-title {
                margin:5px 0;
                background-color: silver;
            }
            .cmt-body {
                margin-left: 30px;
               margin-bottom: 5px;
            }
        }
    }
</style>
