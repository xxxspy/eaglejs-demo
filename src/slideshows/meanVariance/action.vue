<template>
    <span></span>
</template>

<script>
export default {
    name: 'Action',
    props: {
        call: {
            type: Function,
        },
        delay: {
            type: Number,
            default: 1,
        },
    },

    mounted: function(){
        setTimeout(()=>{
            if(this.call){
                this.call()
            }
        }, this.delay)
    },
}
</script>