<template lang='pug'>
<div class="eg-slideshow datasense" id="oneSampleTTest">
    slide(enter='zoomInUp' leave='hinge' steps=5)
        <h3>独立样本T检验</h3>
        eg-transition(enter="bounceInLeft" leave="bounceOutLeft")
            b-card(
                title="新产品"
                class="card-noback mb-2"
                img-alt="Image"
                :img-src="require('./assets/new-food.svg')"
                img-top
                style="max-width:250px;position:absolute;left:30%;"
                v-if="step>1")
        eg-transition(enter="bounceInRight" leave="bounceOutRight")
            b-card(
                title="食品标准"
                class="card-noback"
                img-alt="Image"
                :img-src="require('./assets/food.svg')"
                img-top
                style="max-width:250px;position:absolute;left:60%;"
                v-if="step>2")
        eg-transition(enter="bounceIn" leave="bounceOut")
            stamp( v-show="step>4" content=">20?", 
                :styles="{fontSize: '110px', left: '30%', width: '250px', height: '350px', paddingTop: '80px'}")
        eg-transition(enter="bounceIn" leave="bounceOut")
            stamp(v-show="step>3" content="20%", 
                :styles="{fontSize: '140px', left: '60%', width: '250px', height: '350px', paddingTop:'70px'}")

        
    slide(enter='fadeIn' leave='fadeOut' steps=4)
        eg-transition(enter="zoomIn" leave="zoomOut")
            .box(style="width:80%;height:50%;left:10%;top:10%;")
                img(src="./assets/new-food.svg" style="left:1%;top:10%;" class="food")
                img(src="./assets/new-food.svg" style="left:3%;top:15%;" class="food")
                img(src="./assets/new-food.svg" style="left:5%;top:20%;" class="food")
                img(src="./assets/new-food.svg" style="left:8%;top:25%;" class="food")
                img(src="./assets/new-food.svg" style="left:10%;top:30%;" class="food")
                img(src="./assets/new-food.svg" class="movingFood food" style="left:10%;top:30%;z-index:1000;")
                img(src="./assets/lab.quipment.gif" style="left:30%;top:34%;position:absolute;")
                .box(style="left:66%;width:34%;height:100%;")
                    b-table(style="position:absolute;font-size:20px;color:#d7ecff" :items="items")
                .box(ref="mdigit" style="width:5%;height:5px;border:none;left:50%;top:60%;z-index:1000;opacity:0;" class="movingDigit") 22.1
                <div class="box" :ref="'mdigit'">dddd</div>

    slide(enter='fadeIn' leave='fadeOut')
        <p>11111111</p>
</div>
</template>
<script>
import eagle from "eagle.js";
import Stamp from "../../components/stamp"

export default {
    mixins: [eagle.slideshow],
    data() {
        return {
                items: [
                    {样本: 1, 含量: 21.1},
                ],
                foodLeft: 10,
                sample: [20.70,27.46,22.15,19.85,21.29,24.75,
                        20.75,22.91,25.34,20.33,21.54,21.08,
                        22.14,19.56,21.10,18.04,24.12,19.95,
                        19.72,18.28,16.26,17.46,20.53,22.12,
                        25.06,22.44,19.08,19.88,21.39,22.33,25.79],
                currentDataId: 0,
        }
    },
    components: {
        Stamp,
    },
    
    infos: {
        title: "Themes Slideshows",
        description: "You can change everything !",
        path: "one-sample-t-test",
    },

    mounted: function(){
        
        
    },

    watch: {
        currentSlideIndex: function(slide){
            if(slide==2){
                let handler;
                this.currentDataId = 0;
                setTimeout(()=>{
                    handler = setInterval(()=>{
                        this.items.push({样本: 2, 含量: this.sample[this.currentDataId]})
                        this.currentDataId += 1
                        if(this.currentDataId==this.sample.length){
                            clearInterval(handler)
                            handler=undefined;
                        }
                    }, 1000)
                }, 100)
                
            }
        }
    }
};
</script>

<style lang='scss'>
$light-blue: #d7ecff;

.card-noback{
    background: #ffffff00!important;
    color: $light-blue;
    border-color: $light-blue!important;
    border-style: double!important;
    border-width: 2px!important;
    text-align: center;
    align-content: center;
    padding: 1px;
    img{
        max-width: 100%!important;
    }
}

.card-text{
    font-size:12px;
}

.box {
    border-color: $light-blue;
    border-style: double;
    border-width: 2px;
    position: absolute;
    padding: 1px;
}

#oneSampleTTest {
    @import '../theme.css';
}

.food{
    width: 10%;
    position:absolute;
    width:12%;
}

.movingFood{
    animation-name: to-center;
    animation-duration: 1s;
    animation-iteration-count: 31;
    animation-timing-function: ease-in-out;
}

.movingDigit{
    animation-name: to-table;
    animation-duration: 1s;
    animation-iteration-count: 2;
    animation-delay: 0.9s;
    animation-timing-function: ease-in-out;
}

@keyframes to-table {
    from{
        left:50%;
        opacity: 0.2;
    }
    to{
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
        width:12%;
    }
    to {
        opacity: 0.3;
        scale: 0.1;
        left: 52%;
        width: 4%;
        top: 67%
    }
}

</style>
