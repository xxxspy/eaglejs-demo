<template>
    <div class="anime-group" style="position:fixed;top:1%;left:10%;width:80%;height:50%;scale:0.2">
        <audio 
            v-for="src in audios"
            :key="src"
            ref="audios"
        >
            <source
                :src="src"
                type="audio/mp3"
            >
        </audio>
       
        <div ref="n167" style="left:37%;top:1%;position:absolute;opacity:0;">167</div>
        <img ref="p167" 
            src="./statics/standing-human-body-silhouette.svg"
            style="bottom:1%;left:32%;position:absolute;object-fit:cover;"
            width="10%" 
            height="0%"
        >
        <div ref="n187" style="left:50%;top:1%;position:absolute;">187</div>
        <img ref="p187" 
            src="./statics/standing-human-body-silhouette.svg"
            style="bottom:1%;left:45%;position:absolute;object-fit:cover;"
            width="10%" 
            height="0%"
        >
        <span ref="plus1"
            class="absolute"
            style="left:44%"
        >+</span>
        <div ref="line1"
            class="line"
            style="width:1%;left:36%;top:12%;"
        ></div>
        <div ref="n" style="left:44%;top:13%;position:absolute;">2</div>
        <div ref="equal" style="left:58%;top:6%;">=</div>
        <div ref="mean" style="left:64%;top:6%;">177</div>
        <img ref="p157" 
            src="./statics/standing-human-body-silhouette.svg"
            style="bottom:1%;left:20%;position:absolute;object-fit:cover;"
            width="5%" 
            height="0%"
        >
        <div ref="n157" style="left:23%;top:1%;">157</div>
        <span ref="plus2"
            class="absolute"
            style="left:33%"
        >+</span>
        <span
            ref="n2"
            class="absolute"
            style="left:38%;top:13%;"
        >N</span>
        <span
            ref="sum"
            class="absolute"
            style="left:36%"
        >∑</span>
        <span
            ref="x"
            class="absolute"
            style="left:39%;top:1%"
        >x</span>
        <span
            ref="i"
            class="absolute"
            style="left:41%;top:7%;font-size:20px;"
        >i</span>
        <div
            ref="xbar"
            class="absolute"
            style="left:64%;top:6%;border:none;border-top:solid;"
        >x</div>
        <img ref="belive" 
            src="./statics/belive.gif" width='10%' height="30%"
            style="left:44%;top:120%"
        >



    </div>
</template>

<script>
import audio from '../../components/audio.vue';
export default {
  components: { audio },
    name: 'MeanCalculater',

    data(){
        return {
            audios: [
                require("./audios/两个人的身高是167厘米和187厘米.mp3"),
                require("./audios/我们可以很容易的计算两个数的平均值.mp3"),
                require("./audios/如果再增加一个人.mp3"),
                require("./audios/现在假设有N个人.mp3"),
                require("./audios/累加符号∑代表所有x之和.mp3"),
                require("./audios/而平均值就表示为x加横线， 念作x bar.mp3"),
                require("./audios/我们可以使用平均值来描述一个群体的身高水平.mp3"),
                require('./audios/但是这个结论很难让人信服.mp3'),
            ],
        }
    },

    props: {
        isShowing: {
            type: Boolean,
            default: false,
        },
    },

    deactivated: function(){
        console.log('deactivated&&&&&&&&&&&&&&&&&&&&&&&')
    },

    mounted: function(){
        let tm = this.$anime.timeline({
            autoplay: false,
        })
        const that = this;
        tm.add(this.sound(that.$refs.audios[0]))
        .add(this.show(this.$refs.n167, {
            duration: 3000,
        }))
        .add(this.show(this.$refs.p167, {height: 60, width:16, easing: 'linear'}), 1)
        .add(this.show(this.$refs.n187))
        .add(this.show(this.$refs.p187, {
            height: 70, width:16, easing: 'linear',
            
        }), 500)
        .add(this.sound(this.$refs.audios[2-1]), 6000)
        .add(this.show(this.$refs.plus1, {
            
        }), 9000)
        .add(this.show(this.$refs.line1, {width: '20%'}))
        .add(this.show(this.$refs.n,))
        .add(this.show(this.$refs.equal,))
        .add(this.show(this.$refs.mean,))
        .add(this.sound(this.$refs.audios[3-1], 500))
        .add(this.show(this.$refs.p157, {height: 50, width: 8}))
        .add(this.show(this.$refs.n157,))
        .add(this.show(this.$refs.plus2))
        .add({
            targets: this.$refs.line1,
            width: 35,
            left: 22,
        })
        .add({
            targets: this.$refs.n,
            left: 38,
        }, '-=500')
        .add({
            targets: this.$refs.n,
            innerHTML: 3,
            round: 10,
        })
        .add({
            targets: this.$refs.mean,
            innerHTML: 170,
            round: 1,
        })
        // 假设现在有N个人
        .add({
            targets: [this.$refs.n187, this.$refs.n157, this.$refs.n167, this.$refs.plus1, this.$refs.plus2],
            left: 37,
            opacity: [1, 0],
        }, '+=2500')
        .add({
            targets: this.$refs.line1,
            width: 8,
            left: 35,
        }, '-=500')
        .add(this.sound(this.$refs.audios[4-1], 300), '-=500')
        .add(this.hide(this.$refs.n))
        .add(this.show(
            this.$refs.n2,
        ),)
        .add(this.show(this.$refs.x))
        .add(this.show(this.$refs.i), '+=500')
        .add(this.show(this.$refs.sum), '+=500')
        // 累加符号∑代表所有x之和
        .add(this.sound(this.$refs.audios[5-1]), '+=2000')
        .add(this.emphasize(this.$refs.sum), '+=1000')
        // 而平均值就表示为x加横线， 念作x bar
        .add(this.sound(this.$refs.audios[6-1], 1000), '+=2000')
        .add(this.hide(this.$refs.mean),)
        .add(this.show(this.$refs.xbar))
        // 我们可以使用平均值来描述一个群体的身高水平
        .add(this.sound(this.$refs.audios[6],), '+=3000')
        .add({
            targets: [this.$refs.p157, this.$refs.p187],
            left: 32,
            width: 16,
            height: 60,
            duration: 2000,
        }, '+=1000')
        .add({
            targets: this.$refs.xbar,
            left: 39,
            top: 25,
        })
        .add({
            targets: this.$refs.n157,
            innerHTML: 169.7,
            round: 10,
            left: 37,
            top: 100,
            opacity: [0, 1],
        }, '+=2000')
        .add({
            targets: this.$refs.p167,
            left: 45,
            filter: 'invert(1)',
            height: '+=5',

        }, '+=6000')
        .add({
            targets: this.$refs.n167,
            innerHTML: 170.7,
            round: 10,
            left: 50,
            top: 100,
            opacity: [0, 1],
        })
        // 这个结论很难让人信服
        .add(this.sound(this.$refs.audios[7]), '+=3000')
        .add(this.show(this.$refs.belive), '+=2000')

        
        

        this.timeline = tm;
        if(this.isRuning){
            this.timeline.restart()
        }
    },

    beforeUnmount(){
        this.isRuning = false;
        console.log('unmounted...<<<<<<<<<<<<<<<<<')
        this.timeline.pause();
        this.stopAllSound();
    },

    beforeDestroy(){
        this.isRuning = false;
        this.timeline.pause();
        this.stopAllSound();
    },

    methods: {

        show(targets, configs){
            
            let rtn = {
                targets,
                opacity: [0, 1],
                scale: [1.3, 1],
                easing: 'linear',
            }
            if(configs!=undefined){
                Object.assign(rtn, configs)
            }
            return rtn
        },

        hide(targets, configs){
            
            let rtn = {
                targets,
                opacity: [1, 0],
                scale: [1, 0.5],
                easing: 'linear',
            }
            if(configs!=undefined){
                Object.assign(rtn, configs)
            }
            return rtn
        },

        emphasize(targets){
            return {
                targets,
                rotate: '1turn',
            }
        },

        sound(ref, dur){
            let duration
            let that = this;
            if(dur==undefined){
                duration = 100
            }else{
                duration=dur
            }
            return {
                duration,
                targets: this.$refs.audios[0],
                begin(){
                    if(!that.isShowing){
                        return
                    }
                    console.log('play sound......'+that.isShowing)
                    ref.currentTime = 0;
                    ref.play()
                },
            }
        },

        stopAllSound(){
            this.$refs.audios.forEach(au=>{
                au.pause()
                au.currentTime = 0;
            })
        }
    },

    watch: {
        isShowing: function(val){
            console.log('isShowing changed:'+val)
            if(val){
                console.log('restarting...............')
                this.timeline.restart()
            }else{
                console.log('stoping all..............')
                this.timeline.pause()
                this.stopAllSound()
            }
        }
    },
}
</script>

<style>
    .invisible{
        opacity: 0;
        background-color:#00000000;
    }


    .line{
        border-style: solid;
        border-width: px;
        height: 1px;
        border-bottom: none;
        border-left: none;
        border-right: none;
    }

    .anime-group > * {
        position: absolute;
    }


</style>