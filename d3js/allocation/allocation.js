

/*****Setup D3js *******/
var width = 960,
    height = 500;

var projection = d3.geoMercator()
    .center([113, -3])
    .scale(1275)
    .translate([width / 2, height / 2])
    .clipExtent([[0, 0], [width, height]])
    .precision(.1);

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule()
    .step([5, 5]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


var data = [{x:-8,y:100},{x:-10,y:110},{x: -12,y:120}];



svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class","dot")
    .attr("transform",translateCircle)
    .attr("r",8);
          
// index is the index of 
function translateCircle(datum, index){
    return "translate(" +  projection([datum.y, datum.x]) + ")";
};

setInterval(function(){
    svg
    .selectAll("ring")
    .data(data)
    .enter()
    .append("circle")
        .attr("class", "ring")
        .attr("transform", translateCircle)
        .attr("r", 6)
        .style("stroke-width", 3)
        .style("stroke", "red")
    .transition()
        .ease(d3.easeLinear)
        .duration(6000)
        .style("stroke-opacity", 1e-6)
        .style("stroke-width", 1)
        .style("stroke", "brown")
        .attr("r", 160)
        .remove();
}, 750)
    
  
d3.select(self.frameElement).style("height", height + "px");	