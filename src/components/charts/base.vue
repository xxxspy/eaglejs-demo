<template>
    <svg class="slide-ele" :style="{left:position.left, top: position.top}" :width="width" :height="height" ref="chart"></svg>
</template>

<script>

import * as d3 from 'd3'

export default {
    d3: d3,
    name: 'D3Chart',
    data() {
            return {
                chart: {},
            };
    },
    props: {
        config: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        datum: {
            type: Array,
            required: true,
            default: () => ([]),
        },
        margin: {
            type: Object,
            required: false,
            default: ()=>({ top: 10, right: 30, bottom: 20, left: 40 }),
        },
        position: {
            type: Object,
            required: false,
            default: ()=>({left: 10, top: 10})
        },
        source: {
            type: String,
            default: '',
        },
        height: {
            type: [Number, String],
            default: 300,
        },
        width: {
            type: [Number, String],
            default: 500,
        }
    },

    watch: {
        config: {
            handler(val) {
                this.updateConfig(val);
            },
            deep: true,
        },
        datum(vals) {
            this.updateData([ ...vals ]);
        }
    },

    beforeDestroy() {
        this.destroyChart();
    },

    mounted(){
        this.construct()
        this.initChart()
    },

    methods: {
        construct(){
            this.selection = d3.select(this.$refs.chart)
            this.initChartFrame()
        },

        initChartFrame(){
            // SVG element
            this.svg = d3.select(this.$refs.chart);
            this.svg.attr('class', this.svg.attr('class')+' '+this.name)
        },

        initChart(){

        },

        destroyChart(){
            this.svg.attr('class', 'animate__fadeOutDownBig')
            // this.svg.selectAll('*').remove()
        }
    },
};
</script>
