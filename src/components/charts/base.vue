<template>
  <div class="chart__wrapper">
    <div v-if="title" class="chart__title">{{title}}</div>
    <div ref="chart" :style="{ height: `${this.height}px` }"></div>
    <div v-if="source" class="chart__source">{{source}}</div>
  </div>
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
        title: {
            type: String,
            default: '',
        },
        source: {
            type: String,
            default: '',
        },
        height: {
            type: [Number, String],
            default: 500,
        },
        width: {
            type: [Number, String],
            default: 960,
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
            let classname = this.name;
            // Wrapper div
            this.wrap = this.selection.append('div') 
                .attr("class", "chart__wrap chart__wrap--"+classname);

            // SVG element
            this.svg = this.wrap.append('svg')
                .attr("class", "chart chart--"+classname)
                .style('width', this.width)
                .style('height', this.height)

            // General group for margin convention
            this.g = this.svg.append("g")
                .attr("class", "chart__margin-wrap chart__margin-wrap--"+classname)
                .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

            // Tooltip
            this.selection.selectAll('.chart__tooltip').remove()
            this.tooltip = this.wrap
                .append('div')
                .attr('class', "chart__tooltip chart__tooltip--"+classname);
        },

        initChart(){

        }
    },
};
</script>

<style lang="scss">
@import './styles';
</style>