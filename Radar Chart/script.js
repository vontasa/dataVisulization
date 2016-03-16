var w = 500,h = 600;
var colorscale = d3.scale.category10();
//Legend titles
var LegendOptions = [];
var d=[];
var raw=[];
var MMH= document.getElementById("selectOpt").value;
var topN= document.getElementById("topOpt").value;
var attrN=66;

d3.json("test.json", 
    function(json){
      var k=0;
      raw = json;
      var data = raw.filter(function(x) { return (x.MMH == MMH && x.rank<=topN); });
      for(i=0;i<topN;i++){
        LegendOptions[i]=data[k].hospital;
        if (!d[i]) {
            d[i] = [];
        }
          for(j=0;j<attrN;j++){ // 65 is the number of attributes
              d[i][j] = {axis:data[k].variable, value:data[k].value};
              k++;
          }
      }
      drawSpiderChart(d);
    }
);

function drawSpiderChart(d){
    var mycfg = {
        w: w,
        h: h,
        maxValue: 1,
        levels: 3,
        TranslateX: 200,
        TranslateY: 100,
        ExtraWidthX: 1600, // Extra x size for the whole chart
        ExtraWidthY: 1600, // Extra y size for the whole chart
        color: d3.scale.category10()
      };
//Call function to draw the Radar chart
    RadarChart.draw("#chart", d, mycfg);

    ////////////////////////////////////////////
    /////////// Initiate legend ////////////////
    ////////////////////////////////////////////
    var svg = d3.select('#body')
        .selectAll('svg')
        .append('svg')
        .attr("width", w+600) // extra size of the whole graph
        .attr("height", h+600);

    //Create the title for the legend
    var text = svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(420,30)')  // location of title
        .attr("x", w - 70)
        .attr("y", 50)
        .attr("font-size", "12px")
        .attr("fill", "#404040")
        .text("Benchmark for MMH hospital");

    //Initiate Legend	
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', 'translate(420,90)'); // location of factor
        
        //Create colour squares
        legend.selectAll('rect')
        .data(LegendOptions)
        .enter()
        .append("rect")
        .attr("x", w - 70)
        .attr("y", function(d, i){ return i * 20;})
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d, i){ return colorscale(i);});

        //Create text next to squares
        legend.selectAll('text')
        .data(LegendOptions)
        .enter()
        .append("text")
        .attr("x", w - 52)
        .attr("y", function(d, i){ return i * 20 + 9;})
        .attr("font-size", "11px")
        .attr("fill", "#737373")
        .text(function(d) { return d; });



////////////////////////////////////////////////////////////// 
		///////////////////// Data &  Scales ///////////////////////// 
		////////////////////////////////////////////////////////////// 
        var screenWidth = window.innerWidth;

		var width = 950,height = 950;
		//Some random data
		var donutData = [
			{name: "Quality", 	value: 20},
			{name: "Finance", 	value: 20},
			{name: "Process", 	value: 20},
			{name: "Program", 	value: 20},
			{name: "Service",	value: 20}
		];
			
		//Create a color scale
		var colorScale = d3.scale.linear()
		   .domain([0,1,2.3,4,5,6])
		   .range(["#2c7bb6", "#CCCCCC", "#d7191c","#ecceb8","#CCCCCC"])
		   .interpolate(d3.interpolateHcl);

		//Create an arc function   
		var arc = d3.svg.arc()
			.innerRadius(width*0.75/2) 
			.outerRadius(width*0.75/2 + 30);

		//Turn the pie chart 90 degrees counter clockwise, so it starts at the left	
		var pie = d3.layout.pie()
			.startAngle(-90 * Math.PI/180)
			.endAngle(-90 * Math.PI/180 + 2*Math.PI)
			.value(function(d) { return d.value; })
			.padAngle(.01)
			.sort(null);
		 
		////////////////////////////////////////////////////////////// 
		//////////////////// Create Donut Chart ////////////////////// 
		////////////////////////////////////////////////////////////// 

		//Create the donut slices
		svg.selectAll(".donutArcSlices")
			.data(pie(donutData))
		  .enter().append("path")
			.attr("class", "donutArcSlices")
			.attr("id", function(d,i) { return "donutArc"+i; })
			.attr("d", arc)
            .attr("transform", "translate(" +450 + "," + 405 + ")") // location of pie
			.style("fill", function(d,i) {
				if(i === 7) return "#CCCCCC"; //Other
				else return colorScale(i); 
			});
			
		//Append the label names on the outside
		svg.selectAll(".donutText")
			.data(donutData)
		   .enter().append("text")
			.attr("class", "donutText")
			.attr("dy", 20)
            .attr("dx",50)
		   .append("textPath")
			.attr("xlink:href",function(d,i){return "#donutArc"+i;})
			.text(function(d){return d.name;});

}

function valueChangeHandler(){
  MMH = document.getElementById("selectOpt").value;
 
  var data = raw.filter(function(x) { return (x.MMH == MMH && x.rank<=topN); });
  var k=0;
  d=[];
  for(i=0;i<topN;i++){
    LegendOptions[i]=data[k].hospital;
    if (!d[i]) {
        d[i] = [];
    }
    
    for(j=0;j<attrN;j++){
        d[i][j] = {axis:data[k].variable, value:data[k].value};
        k++;
    }
  }
    drawSpiderChart(d);
}


function valueTopHandler(){
  topN = document.getElementById("topOpt").value;
  var data = raw.filter(function(x) { return (x.MMH == MMH && x.rank<=topN); });
  var k=0;
  d=[];
  LegendOptions=[];
  for(i=0;i<topN;i++){
    LegendOptions[i]=data[k].hospital;
    if (!d[i]) {
        d[i] = [];
    }
    
    for(j=0;j<attrN;j++){
        d[i][j] = {axis:data[k].variable, value:data[k].value};
        k++;
    }
  }
    drawSpiderChart(d);
}

