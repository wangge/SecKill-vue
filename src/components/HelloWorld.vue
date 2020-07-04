<template>
  <div class="hello">
    <h1>秒杀活动</h1>
    <span>秒杀活动介绍</span>
    <div class="goods">
      <h2>phone11 pro 劲爆跳楼价199</h2>
      <span><img src="../assets/iphone.png"></span>
      <span style="color: brown">价格:￥199</span>
      <div class="des">活动时间：2020-xx-xx;活动规则：没人限购一台。。。。。。。。</div>
    </div>
    <div v-if="canClick">
      <button @click="buy">抢购</button>
    </div>
    <div v-else>
    <button style="color: gray">{{buttonName}}</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {

  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      buttonName:"抢购",
      actEndTime: '2020-07-04 20:04:00',
      canClick: false,
      imageSrc:''
    }
  },
  created() {
    this.countDown();
  },

  methods: {
    timeFormat(param) {
      return param < 10 ? '0' + param : param;
    },
    buy:function(){
      axios.post('http://localhost:9501/sec_kill/buy ',{
        id:1
      },
        {
          headers:{Authorization:this.$store.state.Authorization}
        }).then(function (response) {
        console.log(response);
        let res = response.data;
        if(res.code == 0){
          alert(res.msg);
          this.finish();
        }else {
          alert(res.msg);
        }

      }).catch(function (error) {
        console.log(error);
      });

    },
    finish:function(){
      this.canClick = false,
      this.buttonName = "活动结束";
    },
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.actEndTime).getTime();
        let obj = null;
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000;
          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt(time % (60 * 60 * 24) / 3600);
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          };
        } else { // 活动已结束，全部设置为'00'
          this.canClick = true;
          clearInterval(interval);
        }
        let str = '';
        if(parseInt(obj.day)) str += obj.day + '天';
        if(parseInt(obj.hou)) str += obj.hou + '时';
        if(parseInt(obj.min)) str += obj.min + '分';
        this.buttonName = str + obj.sec + '秒后抢购';
      }, 1000);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
button {
  color: #42b983;
}
  .goods{
    width: 95%;
    height: auto;
    padding: 10px;
    display: block;
    text-align: center;
  }
</style>
