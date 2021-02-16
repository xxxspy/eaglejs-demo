<template>
    <div>
    <div class="mean absolute" style="left: 20%;">均值: <span ref="mean">169.7</span><br>方差: <span>49</span></div>
    <svg ref="chart" class="absolute" style="left:30%" :height="height" :width="width">
    </svg>
    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
    name: 'Hist',

    data(){
        return {
        height: 600,
        width: 900,
        numBins: 20,
        margin: {top: 20, right: 20, bottom: 20, left: 40},
    }
    },

    props: {
        data: {
            type: Array,
        },
    },

    mounted(){
        this.svg = d3.select(this.$refs.chart);
        this.construcChart(this.svg);
        this.timeline = this.$anime.timeline();
        const that = this;
        this.timeline.add({
            targets: '.y',
            duration: 1000,
            loop: true,
            easing: 'easeInCubic',
            translateY: [600, this.margin.top],
            translateX: [this.margin.left, this.margin.left],
        })
        .add({
            targets: '.mean',
            left: '-=10',
            top: '25%',
            opacity: 1,
        })
        
        .add({
            targets: '.x',
            translateY: [this.height, this.height-this.margin.top],
            translateX: this.margin.left,
        }, '+=2000')
        .add({
            targets: this.$refs.mean,
            innerHTML: 180,
            round: 1,
            duration: 2000,
            begin: ()=>{
                const m = that.margin;
                const h =  that.height - m.top - m.bottom
                that.bars.data(that.groupData)
                .transition()
                .duration(1000)
                .attr("height", function(d, i) { return h - that.yhist(d.length*that.meanBig(i))  })
                .attr("y", (d, i)=>{return that.yhist(d.length*that.meanBig(i))+ m.top})
            },
        }, )
        .add({
            targets: this.$refs.mean,
            innerHTML: 155,
            duration: 1000,
            round: 1,
            begin: ()=>{
                const m = that.margin;
                const h =  that.height - m.top - m.bottom
                that.bars.data(that.groupData)
                .transition()
                .duration(1500)
                .attr("height", function(d, i) { return h-that.yhist(that.meanSm(i, 7)); })
                .attr("y", (d, i)=>{return that.yhist(that.meanSm(i, 7))+m.top})
            },
        }, '+=1000')

        for(let i=0;i<12;i++){
            let center = i+8;
            this.timeline.add({
            targets: this.$refs.mean,
            innerHTML: i*2.5 + 155,
            round: 10,
            duration: 300,
            begin: ()=>{
                const m = that.margin;
                const h =  that.height - m.top - m.bottom
                that.bars.data(that.groupData)
                .transition()
                .duration(400)
                .attr("height", function(d, i) { return h-that.yhist(that.meanSm(i, center)); })
                .attr("y", (d, i)=>{return that.yhist(that.meanSm(i, center))+m.top})
            },
        }, )
        }

        this.timeline.add({
            targets: this.$refs.mean,
            innerHTML: 170,
            duration: 1000,
            round: 1,
            begin: ()=>{
                const m = that.margin;
                const h =  that.height - m.top - m.bottom
                that.bars.data(that.groupData)
                .transition()
                .duration(1500)
                .attr("height", function(d, i) { return h-that.yhist(that.meanSm(i, 13)); })
                .attr("y", (d, i)=>{return that.yhist(that.meanSm(i, 13))+m.top})
            },
        }, '+=1000')
        
        // .add({
        //     targets: '.bar',
        //     y: (e, i, l)=>{
        //         console.log(e.height.animVal.value)
        //     },
        // })

    },

    methods: {

        meanBig(i){
            let counts = []
            i = i/this.groupData.length;
            if(i<0.55){
                return 0.3
            }else if(i<0.6){
                return 0.5
            }else if(i<0.7){
                return 0.9
            }else if(i<0.8){
                return 1.6
            }
            return i*2.2
        },

        meanSm(i, center){
            let r = 73-Math.abs(i-center)*10;
            if(r<0)r=1;
            r = Math.floor(r)
            console.log({i, r})
            return Math.floor(r)
        },

        construcChart(svg){
            let height = this.height;
            let width = this.width;
            console.log({height, width})
            let numBins = this.numBins;
            let m = this.margin
            , h = height - m.top - m.bottom
            , w = width - m.left - m.right;

            var norm = this.data;
            let margin = 0.2*(d3.max(norm)-d3.min(norm))
            var x = d3.scaleLinear().domain([d3.min(norm)-margin, d3.max(norm)+margin]).range([0, w]);
            var data = d3.bin().thresholds(numBins)(norm)
            //Axes and scales
            var yhist = d3.scaleLinear()
                            .domain([ 0, d3.max(data, function(d) { return d.length; }),])
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
                .attr('class', 'datasense-shape bar')
                .attr('y', h+m.top)
            bars.data(data)
                .transition()
                .duration(1000)
                .attr("height", function(d) { return h - yhist(d.length) ; })
                .attr("y", d=>{return yhist(d.length)+ m.top})
                .delay((d, i)=>{console.log({i,});return i*100});
            this.bars = bars;
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
                .text("人数");

            this.groupData = data;
            this.yhist = yhist

        },
    },
}
</script>