<template>
    <div
        class="absolute"
        style="width:80%;left:10%;height:90%;top:5%"
    >
        <h4 ref="meann" style="position:absolute;">均值的代表性</h4>

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
        <div
            ref="box"
            class="box"
        >   <div
                ref="focusBox"
                class="absolute"
                style="height:200%;width:100%;left:0%;top:0%;border-style:solid;"
            ></div>
            <div
                class="num"
                v-for="num in nums"
                :key="num.key"
                ref="num"
                :style="{left: num.left, top: num.top, width: num.width, height: num.height}"
            >{{num.value}}</div>
            <div class="line absolute" style="left: 0%; top:180%;width:100%">
                <div class="line absolute"
                    v-for="tick in ticks"
                    :style="{width:'2%', transform:' rotate(90deg)', left: `${tick.left}%`}"
                    :key="tick.key"
                >
                    <span class="absolute" style="font-size:18px;left:50%;top:-50%">{{tick.range[0]}}</span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import MeanCalculater from './meanstep'
import * as d3 from 'd3'

export default {
    name: 'HistGenStep',
    mixins: [MeanCalculater],

    props: {
        sampleData: {
            type: Array,
        },
    },

    width: 6,
    height: 13,

    data(){
        const width = 6
        const height = 13
        const that = this;
        function genData(v, i){
            v = Math.floor(v)
            if(v<151)v=151;
            if(v>199)v=199;
            let left = that.left(i, width)
            let top = that.top(i, height)
            return {
                key: i, 
                value: v, 
                left: `${left}%`, 
                top: `${top}%`, 
                width: `${width}%`, 
                height: `${height}%`
            }
        }
        let jsonData = require('./hist-data.json')
        let nums = jsonData.nums.map(genData)
        let numsBg = jsonData.numsBg.map(genData)
        let numsSm = jsonData.numsSm.map(genData)

        window.data = {nums: Array.from({length: 8*16}, d3.randomNormal(169.7, 6)), numsBg: Array.from({length: 8*16}, d3.randomNormal(169.7, 12)), numsSm:Array.from({length: 8*16}, d3.randomNormal(169.7, 3))}
        return {
            nums,
            numsBg,
            numsSm,
            width,
            height,
            audios: [
                require("./audios/我们模拟了1000个中国男性的身高数据.mp3"),
                require("./audios/于是我们将数据进行分组计数.mp3"),
            ],
            
        }
    },

    computed: {
        ticks(){
            let ticks = []
            for(let i=0;i<10;i++){
                ticks.push({
                    range: [150+i*5, 155+i*5],
                    key: i,
                    left: 4+i*10,
                    numLeft: i*10+6,
                })
            }
            return ticks
        },

        // nums(){
        //     let nums = []
        //     const n = 8 * 16;
        //     for(let i=0;i<n;i++){
        //         let left = this.left(i)
        //         let top = this.top(i)
        //         let value = this.sampleData[i]
        //         if (value<151)value=151;
        //         if(value>195)value=195;
        //         nums.push({key: i, value: this.sampleData[i], left: `${left}%`, top: `${top}%`, width: `${this.width}%`, height: `${this.height}%`})
        //     }
        //     return nums
        // },
        

        sortedNums(){
            let sorted = this.nums.slice(0, this.nums.length)
            sorted.sort((a, b)=>{return a.value-b.value})
            return sorted
        },

        sortedPosition(){
            let usedi = [];
            this.nums.forEach((val, ind)=>{
                for(let i=0;i<this.sortedNums.length;i++){
                    if(val.value==this.sortedNums[i].value && usedi.indexOf(i)<0){
                        usedi.push(i)
                        break
                    }
                }
            })
            return usedi
        },
    },

    mounted(){
        const that = this;
        this.timeline = this.$anime.timeline({
            autoplay: false,
            duration: 1000,
        })
        console.log('boxwidth:'+this.$refs.box.getBoundingClientRect().width)

        this.POS=[];
        this.timeline
        .add(this.show(this.$refs.meann))
        .add({
            targets: this.$refs.meann,
            left: '-20%',
            top: '20%',
            rotateZ: '90deg',
        })
        .add(this.show(this.$refs.num, {
            delay: this.$anime.stagger(100, {grid: [16, 8], from: 'center'}),
            scale: [0.3, 1],
            opacity: [0, 1],
        }), '+=1000')
        .add({
            targets: this.$refs.num,
            left: (e, i, l)=>{return `${that.left(that.sortedPosition[i], that.width)}%`},
            top: (e, i, l)=>{return `${that.top(that.sortedPosition[i], that.height)}%`},
            duration: 4000,
            delay: this.$anime.stagger(100, {grid: [16, 8], from: 'center'}),
        }, '+=1000')
        .add(this.show('.line'))
        console.log({nums: this.nums})
        this.stackNums(this.timeline, this.nums, this.$anime.stagger(100))

        // this.ticks.forEach(tick=>{
        //     let targets = []
        //     for(let i=0;i<this.nums.length;i++){
        //         if((this.nums[i].value>tick.range[0]) && (this.nums[i].value<=tick.range[1])){
        //             targets.push(this.$refs.num[i])
        //         }
        //     }
        //     console.log({targets})
        //     this.timeline.add({
        //         targets,
        //         left: tick.left+3,
        //         top: (e, j, len)=>{return 166-j*4},
        //         delay: this.$anime.stagger(50),
        //     })
        // })
        this.timeline.add({
            targets: this.$refs.focusBox,
            opacity: [0, 1],
            height: '170%',
            width: '20%',
            left: '35%',
            top: '10%',
        })

        // 如果大部分数据集中在均值附近
        // 均值的代表性就高
        this.stackNums(this.timeline, this.numsSm, this.$anime.stagger(100))

        // // 恢复正常位置
        // this.stackNums(this.timeline, this.nums, this.$anime.stagger(100))
        

        // 如果大部分数据离均值较远
        // 均值的代表性就差
        this.stackNums(this.timeline, this.numsBg, this.$anime.stagger(100))
        // this.nums.forEach((num, i)=>{
        //     if(num.value>165 && num.value<=175){
        //         targets.push(this.$refs.num[i])
        //     }
        // })
        // this.timeline.add({
        //     targets,
        //     delay: this.$anime.stagger(10),
        //     left: ()=>{
        //         let i = Math.floor(Math.random() * 10)
        //         return this.ticks[i].left + 3
        //     },
        // })
        this.timeline.restart()
    },

    methods: {
        left: function(i, width){return (i % 16) * width},
        top: function(i, height){return Math.floor(i/16) * height},

        stackNums(timeline, nums, delay){
            let pos = []
            let binTop = {};
            nums.forEach((val, ind)=>{
                let theTick=undefined;
                this.ticks.forEach(tick=>{
                    if((val.value>tick.range[0]) && (val.value<=tick.range[1])){
                        theTick=tick
                    }
                })
                let top = binTop[theTick.key]
                if(top==undefined){
                    top = 166
                }else{
                    top -= 4
                }
                binTop[theTick.key] = top
                pos.push({
                    top,
                    left: theTick.left+3,
                })
            })
            timeline.add({
                targets: this.$refs.num,
                left: (e,i)=>pos[i].left,
                top: (e, i)=>pos[i].top,
                delay: this.$anime.stagger(50),
                innerHTML: (e, i)=>nums[i].value,
                round: 10,
                duration: 4000,
            })
        },
    },
}
</script>

<style scoped>
.box{
    left:0px;
    top:0px;
    height:50%;
    width:100%;
    border:none;
}
.num{
    border-style: solid;
    border-width: 1px;
    font-size: 70%;
    text-align: center;
    vertical-align: middle;
    vertical-align: -webkit-baseline-middle;
    padding-top: 0.8%;
    position: absolute;
    width: 6%;
    height: 13%;
}
</style>