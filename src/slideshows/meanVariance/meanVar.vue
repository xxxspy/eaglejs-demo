<template lang='pug'>
    div(class="eg-slideshow datasense" id="meanVar")
        slide
            h3 平均值和方差/标准差
        slide(leave="hinge")
          p {{currentSlideIndex}}  
          MeanCalculater(:isShowing="currentSlideIndex==2")
        slide
          p {{currentSlideIndex}}  
          HistGenStep(:sampleData="data")

        slide 
          Variance(:isShowing="currentSlideIndex==4")

        slide(enter="zoomInUp" leave="hinge")
            Hist(:data="data")
        slide
            h3 再见
</template>

<script>
import eagle from "eagle.js";
import HistLineChart from '../../components/charts/histline'
import MatrixTable from '../../components/table/table'
import HistGenStep from './hist-gen-step'
import * as d3 from 'd3'
import HeightImg from './heightImg'
import SlideAudio from '../../components/audio'
import ListAni from './listAni'
import Action from './action'
import MeanCalculater from './meanstep'
import Variance from './variance-step'
import Hist from './conclusion-hist'

function genData(){
    let d = d3.randomNormal(169.7, 7)()
    return parseInt(d.toFixed())
}

let testData = Array.from({length: 2000}, genData) 

let DATA = [
    [testData]
];



// Configuration
let config = {
    key: "name",
    value: "total",
    color: "steelblue",
};

export default {
    mixins: [eagle.slideshow],

    data() {
        return {
            data: testData,
            config: config,
            audios: {
                2: [
                    {step: 1, source:require('./audios/两个人的身高是167厘米和187厘米.mp3')},
                    {step: 2, source:require('./audios/我们可以很容易的计算两个数的平均值.mp3')},
                    {step: 3, source:require('./audios/如果再增加一个人.mp3')},
                ],
            },
            items1: [
                {text: '', left: '39%', top: '1%'},
                {text: '+', left: '39%', top: '1%'},
                {text:'________________', left: '33%', top:'2%'},
                {text:'2', left: '39%', top:'7%'},
                {text: '=', left: '50%', top: '4%'},
                {text: '177', left: '55%', top: '4%'},
            ],
            items2: [
                {text: '____________', left: '24%', top: '2%', animate: 'fadeInRight'},
                {text: '+', left: '30%', top: '1%', animate: ''},
            ],
        };
    },

    infos: {
        title: "Mean&Variance",
        description: "Mean and Variance visualization!",
        path: "mean-variance",
    },
    components: {
        HistLineChart,
        MatrixTable,
        HeightImg,
        SlideAudio,
        ListAni,
        Action,
        MeanCalculater,
        HistGenStep,
        Variance,
        Hist,
    },

    methods: {
    },
};
</script>

<style lang='scss'>
$light-blue: #d7ecff;


.card-noback {
  background: #ffffff00 !important;
  color: $light-blue;
  border-color: $light-blue !important;
  border-style: double !important;
  border-width: 2px !important;
  text-align: center;
  align-content: center;
  padding: 1px;
  img {
    max-width: 100% !important;
  }
}

.card-text {
  font-size: 12px;
}

.box {
  border-color: $light-blue;
  border-style: double;
  border-width: 2px;
  position: absolute;
  padding: 1px;
}

#oneSampleTTest {
  @import "../theme.css";
}

.food {
  width: 10%;
  position: absolute;
  width: 12%;
}

.movingFood {
  animation-name: to-center;
  animation-duration: 1s;
  animation-iteration-count: 31;
  animation-timing-function: ease-in-out;
}

.movingDigit {
  animation-name: to-table;
  animation-duration: 1s;
  animation-iteration-count: 2;
  animation-delay: 0.9s;
  animation-timing-function: ease-in-out;
}

@keyframes to-table {
  from {
    left: 50%;
    opacity: 0.2;
  }
  to {
    left: 84%;
    top: 15%;
    opacity: 1;
  }
}

@keyframes to-center {
  from {
    opacity: 1;
    scale: 1;
    left: 10%;
    width: 12%;
  }
  to {
    opacity: 0.3;
    scale: 0.1;
    left: 52%;
    width: 4%;
    top: 67%;
  }
}

.slide-ele{
    position: absolute;
    text-align: center;
}
</style>
