<template>
    <table>
        <tbody ref="body"></tbody>
    </table>
</template>

<script>
import * as d3 from 'd3'
export default {
    name: 'MatrixTable',
    props: {
        data: Array,
    },

    mounted(){
        this.body = d3.select(this.$refs.body)

        console.log({data: this.data, body: this.$refs.body})
        let tr = this.body
            .selectAll('tr')
            .data(this.data)
            .enter()
            .append('tr')

        let td = tr
            .selectAll('td')
            .data(d=>d)
            .enter().append('td')
            .text( d=>d)
            
    },
}
</script>