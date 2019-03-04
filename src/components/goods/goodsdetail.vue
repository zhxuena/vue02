<template>
    <div class="detail-content">
        <h3>{{detail.title}}</h3>
        <hr>
        <div v-html="detail.content">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            detail:{}
        }
    },
    created () {
        this.getdetail()
    },
    methods: {
        getdetail() {
            this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                if(result.body.status===0){
                       this.detail=result.body.message[0]
                }
            })
        }
    }
}
</script>


<style lang="scss" >
    .detail-content {
        padding: 5px;
        h3{
            font-size: 16px;
            text-align: center;
            color: aqua;
            margin: 15px 0;
        }
        img {
            width: 100%;
        }
    }
</style>
