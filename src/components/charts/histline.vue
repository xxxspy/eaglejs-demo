

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
            let m = {top: 20, right: 20, bottom: 20, left: 20}
            , h = height - m.top - m.bottom
            , w = width - m.left - m.right;

            var norm = this.datum;
            let margin = 0.2*(d3.max(norm)-d3.min(norm))
            var x = d3.scaleLinear().domain([d3.min(norm)-margin, d3.max(norm)+margin]).range([0, w]);
            var data = d3.bin().thresholds(numBins)(norm)
            //Axes and scales
            var yhist = d3.scaleLinear()
                            .domain([0, d3.max(data, function(d) { return d.length; })])
                            .range([h, 0]);

            // var ycum = d3.scaleLinear().domain([0, 1]).range([h, 0]);

            var xAxis = d3.axisBottom()
                        .scale(x)
                        .ticks(numBins+1)

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
                .attr("x", d=>{return x(d.x0)+m.left})
                // .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + yhist(d.length) + ")"; })
                .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
                // .attr("height", function(d) { return height - yhist(d.length) - m.top - m.bottom; })
                .attr('fill', '#00000000')
                .attr('class', 'datasense-shape')
                .attr('y', height-m.top-m.bottom)
            bars.data(data)
                .transition()
                .duration(1000)
                .attr("height", function(d) { return h - yhist(d.length); })
                .attr("y", d=>{return yhist(d.length)+m.top})
                .delay((d, i)=>{console.log({i,});return i*100})

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
                .attr("transform", `translate(${m.left}, ${h+m.top})`)
                .call(xAxis);

            svg.append("g")
                .attr('transform', `translate(${m.left}, ${m.top})`)
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Count (Histogram)");

        }
    },
}
</script>

<style>
    .chart{

    }
</style>