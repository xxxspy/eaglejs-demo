<template>
    <div class="chart__wrapper">
        <div v-if="title" class="chart__title">{{title}}</div>
        <div ref="chart" :style="{ height: `${this.height}px` }"></div>
        <div v-if="source" class="chart__source">{{source}}</div>
    </div>
</template>

<script>
import D3Chart from './base'
import * as d3 from 'd3'
import scale from 'd3-scale'

export default {
    name: 'HistLineChart',
    mixins: [D3Chart],

    props: {
        numBins: {
            type: Number,
            require: false,
            default: 20,

        },

    },

    methods: {
        initChart(){
            let height = this.height;
            let width = this.width;
            console.log({height, width})
            let numBins = this.numBins;
            let m = {top: 50, right: 50, bottom: 50, left: 50}
            , h = height - m.top - m.bottom
            , w = width - m.left - m.right
            , n = 10000;

            var norm = this.datum;
            console.log({min: d3.min(norm), max: d3.max(norm)})
            var x = d3.scaleLinear().domain([d3.min(norm), d3.max(norm)]).range([0, w]);
            console.log(x.domain())
            console.log(x.range())
            console.log('----------------')
            var data = d3.bin().thresholds(numBins)(norm)
            console.log({norm})
            console.log(x.ticks(numBins))
            console.log({data})
            console.log(data.map(d=>d.length))
            //Axes and scales
            var yhist = d3.scaleLinear()
                            .domain([0, d3.max(data, function(d) { return d.length; })])
                            .range([h, 0]);

            // var ycum = d3.scaleLinear().domain([0, 1]).range([h, 0]);

            var xAxis = d3.axisBottom()
                        .scale(x)

            var yAxis = d3.axisLeft()
                        .scale(yhist)

            // var yAxis2 = d3.axisRight()
            //             .scale(ycum)

            //Draw svg
            var svg = this.svg;

            
            
            let bars = svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', 1)
                .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + yhist(d.length) + ")"; })
                .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
                .attr("height", function(d) { return height - yhist(d.length) - m.top - m.bottom; })
                // .attr('stroke', '#69b3a2')
                .attr('fill', '#00000000')
                .attr('class', 'datasense-shape')

            //Draw CDF line
            var guide = d3.line()
                        .x(function(d){ return x(d.x) })
                        .y(function(d){ return ycum(d.cum) })
                        // .interpolate('basis');

            // var line = svg.append('path')
            //             .datum(data)
            //             .attr('d', guide)
            //             .attr('class', 'line');

            //Draw axes
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Count (Histogram)");

            // svg.append("g")
            //     .attr("class", "y axis")
            //     .attr("transform", "translate(" + [w, 0] + ")")
            //     .call(yAxis2)
            //     .append("text")
            //     .attr("transform", "rotate(-90)")
            //     .attr("y", 4)
            //     .attr("dy", "-.71em")
            //     .style("text-anchor", "end")
            //     .text("CDF");
        }
    },
}
</script>

<style>
    .chart{

    }
</style>