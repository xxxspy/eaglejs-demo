<template>
    <div
        class="absolute"
        style="width:80%;left:10%;height:90%;top:5%"
    >
        <h4 ref="title">如何量化均值的代表性----方差</h4>
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
        <div class="absolute" ref="num" style="left:10%;top:20%;">
            <span style="">156</span>    
            <span style="padding-left:60%">167</span>
            <span style="padding-left:60%">187</span>
        </div> 
        <div ref="mean1" class="absolute" style="left:20%;top:26%;" >
        <vue-mathjax formula="$\bar x = 170$"></vue-mathjax>
        </div>
        <div class="absolute" ref="cha1" style="left:10%;top:35%;">-14</div>
        <div class="absolute" ref="cha2" style="left:23%;top:35%;">-3</div>
        <div class="absolute" ref="cha3" style="left:33%;top:35%;">17</div>
        <div class="absolute" ref="square1" style="left:10%;top:48%;">14✖14</div>
        <div class="absolute" ref="square2" style="left:23%;top:48%;">9✖9</div>
        <div class="absolute" ref="square3" style="left:33%;top:48%;">17✖17</div>
        <div class="absolute" ref="add1" style="left:19%;top:48%;">+</div>
        <div class="absolute" ref="add2" style="left:30%;top:48%;">+</div>
        <div class="absolute" ref="chaSum" style="left:15%;top:63%;">494</div>
        <div class="absolute" ref="n" style="left:24%;top:63%;">÷3</div>
        <div class="absolute" ref="var" style="left:14%;top:78%;">164.7</div>
        <div ref="nn" class="absolute" style="left:60%;top:15%">N</div>
        <div ref="xn" class="absolute" style="left:50%;top:20%" >
            <vue-mathjax formula="$x_1, x_2, x_3, ... x_n$"></vue-mathjax>
        </div>
        <div ref="mean2" class="absolute" style="left:70%;top:20%;">
            <vue-mathjax formula="$\bar x$"></vue-mathjax>
        </div>
        <div ref="cha4" class="absolute" style="left:50%;top:35%">
            <vue-mathjax formula="$x_1-\bar x, x_2-\bar x, ... x_n-\bar x$"></vue-mathjax>
        </div>
        <div ref="square4" class="absolute" style="left:50%;top:48%">
            <vue-mathjax formula="$(x_1-\bar x)^2, (x_2-\bar x)^2, ... (x_n-\bar x)^2$"></vue-mathjax>
        </div>
        <div ref="chaSum2" class="absolute" style="left:50%;top:63%">
            <vue-mathjax formula="$(x_1-\bar x)^2+(x_2-\bar x)^2+... (x_n-\bar x)^2$"></vue-mathjax>
        </div>
        <div ref="chaSum3" class="absolute" style="left:80%;top:70%">
            <vue-mathjax formula="$\sum (x_i-\bar x)^2$"></vue-mathjax>
        </div>
        <div ref="var2" class="absolute" style="left:50%;top:78%">
            <vue-mathjax formula="$\sum (x_i-\bar x)^2/N$"></vue-mathjax>
        </div>
    </div>
</template>

<script>
import MeanCalculater from './meanstep'
export default {
    name: 'Variance',
    mixins: [MeanCalculater],

    data(){
        return {
            audios: [
                require("./audios/slide-4/我们还来看这三个人的身高，他们的均值是170厘米.mp3"),
                require("./audios/slide-4/三个数都减去均值就是离均差，也就是距离均值的大小，有正也有负.mp3"),
                require("./audios/slide-4/离均差为负数说明他比平均值低.mp3"),
                require("./audios/slide-4/求离均差的平方，就忽略了负号的影响，只考虑绝对值的大小.mp3"),
                require("./audios/slide-4/将平方后的结果加和，再除以三，就是我们最终想要的方差.mp3"),
                require("./audios/slide-4/下面我们需要对方差进行符号化，假设现在有n个人.mp3"),
                require("./audios/slide-4/用x代表人的身高，人的平均身高就是x bar.mp3"),
                require("./audios/slide-4/将离均差进行平方，再求和.mp3"),
                require("./audios/slide-4/可以用累加符号来简化我们的公式.mp3"),
                require("./audios/slide-4/最后除以人数N，就得到总体方差的计算公式了.mp3"),
            ],
        }
    },

    mounted(){
        this.timeline = this.$anime.timeline({autoplay: false,});
        this.timeline.add(this.show(this.$refs.num, {sound: this.$refs.audios[0]}), )
        .add(this.show(this.$refs.mean1), '+=3000')
        .add(this.show(this.$refs.cha1, {sound: this.$refs.audios[1], duration: 2000}))
        .add(this.show(this.$refs.cha2, {duration: 1000}))
        .add(this.show(this.$refs.cha3))
        .add(this.emphasize([this.$refs.cha3,]), '+=2000')
        .add(this.emphasize([this.$refs.cha1, this.$refs.cha2]))
        .add({
            targets: [this.$refs.cha1, this.$refs.cha2],
            fontSize: '-=5',
            top: '+=2',
            delay: 2000,
            duration: 2000,
            begin: ()=>{
                if(this.isShowing){
                    this.$refs.audios[2].currentTime = 0;
                    this.$refs.audios[2].play()
                }
            },
        })
        .add(this.show(
            [this.$refs.square1, this.$refs.square2, this.$refs.square3], 
            {
                delay: this.$anime.stagger(1000),
                sound: this.$refs.audios[3],
            }
        ))
        .add(this.show([this.$refs.add1, this.$refs.add2],  {sound: this.$refs.audios[4]}), '+=3000')
        .add(this.show(this.$refs.chaSum))
        .add(this.show(this.$refs.n), '+=2000')
        .add(this.show(this.$refs.var))


        // 用符号化表示
        this.timeline.add(this.show(this.$refs.nn, {sound: this.$refs.audios[5], delay: 2000}), '+=2000')
        this.timeline.add(this.show(this.$refs.xn, {sound: this.$refs.audios[6], delay: 2000}), '+=2000')
        .add(this.show(this.$refs.mean2))
        .add(this.show(this.$refs.cha4, {sound: this.$refs.audios[7], delay: 2000}), '+=1000')
        .add(this.show(this.$refs.square4))
        .add(this.show(this.$refs.chaSum2))
        .add(this.show(this.$refs.chaSum3, {sound: this.$refs.audios[8], delay: 2000}), '+=1000')
        .add(this.show(this.$refs.var2, {sound: this.$refs.audios[9], delay: 2000}))

        this.timeline.restart();
    },

    methods: {
        show(targets, configs){
            
            let rtn = {
                targets,
                opacity: [0, 1],
                scale: [1.3, 1],
                easing: 'linear',
            }
            const that = this;
            if(configs!=undefined){
                if(configs.sound!=undefined){
                    let audio = configs.sound;
                    configs.sound = undefined;
                    rtn.begin = function (){
                        if(!that.isShowing){
                            return
                        }
                        console.log('play sound......'+that.isShowing)
                        audio.currentTime = 0;
                        audio.play()
                    }
                }
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
    },
}
</script>