<template lang="pug">
    div(class="slide-ele" :style="{width: size.width, height: size.height, left: position.left, top: position.top}")
        p(styles="text-align:center;") {{num}}
        img(src="./statics/standing-human-body-silhouette.svg" 
            class="animated bounceIn"
            :style="{marginTop: marginTop, objectFit: 'cover'}"
            width="100%" 
            :height="percent")
</template>

<script>
import SlideElement from '../../components/slideEle'
export default {
    name: 'HeightImg',
    mixins: [SlideElement],
    props: {
        num: {
            type: Number,
        },
        maxNum: {
            type: Number,
        }
    },

    computed: {
        percent: function(){
            return `${(this.num/this.maxNum*100).toFixed()}%`
        },

        marginTop: function(){
            return `${(100-this.num/this.maxNum*100).toFixed()}%`
        },
    },
}
</script>