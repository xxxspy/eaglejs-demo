<template>
    <div class="slide-ele" style="width:100%;height:100%;left:0;top:0">
        <div 
            v-for="item in renderItems" 
            :key="item.key"
            :style="{left: item.left, top: item.top}"
            :class="item.animate ? 'slide-ele animated '+item.animate : klass"
        >
            {{item.text}}
        </div>
    </div >
</template>

<script>
export default {
    name: 'ListAni',
    data(){
        return {
            currentIndex: 0,
        }
    },
    props: {
        items: {
            type: Array,
        },
        renderItems: {
            type: Array,
            required: false,
            default: ()=>[],
        },
        duration: {
            type: Number,
            default: 1000,
        },
        delay: {
            type: Number,
            default: 1,
        },
        animation: {
            type: String,
            default: 'bounceIn',
        },
    },

    computed:{
        klass: function(){
            return 'slide-ele animated ' + this.animation
        },
    },

    mounted(){
        setTimeout(()=>{
            this.handle = setInterval(()=>{
            if(this.currentIndex==this.items.length){
                return clearInterval(this.handle)
            }
            if(this.items[this.currentIndex].key==undefined){
                this.items[this.currentIndex].key = this.currentIndex
            }
            this.renderItems.push(this.items[this.currentIndex])
            this.currentIndex += 1
        }, this.duration)

        }, this.delay)
        
    },
}
</script>