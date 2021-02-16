<script>
export default {
    name: 'SlideElement',
    props: {
        position: {
            type: Object,
            required: false,
            default: ()=>{return {left: '50%', top: '50%'}}
        },

        size: {
            type: Object,
            required: false,
            default: ()=>{return {width: 'auto', height: 'auto'}}
        }
    }
}
</script>