d3.csv("GT_FLD_U87.csv").then(function (data){
    var size = d3.min([window.innerWidth*0.9, window.innerHeight*0.9])

    var dimensions = ({
            width: size, 
            height: size/2,
            margin: {
            top: 10,
            right: 10,
            bottom: 76,
            left: 40
        }
    })

    var svg = d3.select("#barchart")
                .style("width", dimensions.width)
                .style("height", dimensions.height)

    dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
    
    var xScale = d3.scaleBand()
            .domain(data.map(function(d){return d.position_x_t;}))
            .range([0,dimensions.boundedWidth]).padding(0.2)
    var yScale = d3.scaleBand()
            .domain(data.map(function(d){return d.position_y_t;}))
            .range([0,dimensions.boundedHeight])

    var bounds = svg.append("g")
        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

    var bars = bounds
                .selectAll("bar")
                .data(data) 
                .enter()
                .append('circle')
                .on('mouseover', function(d, i){
                    d3.select(this)
                    .attr("stroke", "black")
                    .attr("stroke-width", "1")
                })
                .on('mouseout', function(d, i){
                    d3.select(this)
                    .attr("stroke-width", "0")
                })
                .attr('cx', function(d) { return xScale(d.position_x_t); })
                .attr('cy', function(d) { return yScale(d.position_y_t); })
                .attr('r', 3)
                .attr("fill", "steelblue")

    var xAxis = d3.axisBottom(xScale)
            .tickValues(xScale.domain().filter(function(d,i){ return !(i%4)})).tickSizeOuter(0)

    svg.append("g")
        .attr("transform", "translate("+ dimensions.margin.left + "," + (dimensions.boundedHeight+dimensions.margin.bottom/4) + ")")
        .call(xAxis)
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    var yAxis = d3.axisLeft(yScale)

    var changing_axis = svg.append("g")
        .attr("transform", "translate("+dimensions.margin.left+","+ dimensions.margin.top +")")
        .call(yAxis)
})
