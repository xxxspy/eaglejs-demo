<template>
<audio class="audio" ref="audio" controls="controls">
    <source ref="mp3Source" type="audio/mp3">
    你的浏览器不支持播放声音
</audio>
</template>

<script>
export default {
    name: 'SlideAudio',
    props: {
        sources: {
            type: Object,
            required: false,
            default: ()=>({}),
        },
        step: {
            type: Number,
        },
        slide: {
            type: Number,
        },
    },

    watch: {
        step: function(step){
            console.log({step, sources: this.sources})
            let audios = this.sources[this.slide] || [];
            
            audios.forEach(s=>{
                if(s.step==step){
                    this.$refs.mp3Source.src = s.source;
                    this.$refs.audio.load()
                    this.$refs.audio.play()
                }
            })
        }
    },
}
</script>
<style>
.audio{
    position: absolute;
    top: 90vh;
    left: 40vw;
}
</style>