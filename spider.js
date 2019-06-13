
// Load the data
function makeAddata(datas) {
  console.log(datas);
  var all_countries_ads = {}
  types = []

  // Loop over the values of the taxes and add the values to the all_countreis
  for(var i = 0; i < 5432; i++){
    ban = {}

    if(datas["fact"][i]["dims"]["YEAR"] == 2012){
      var value = datas["fact"][i]["Value"];

      if(value == "No"){
        value = 0;
      }
      else {
        value = 50;
      }
      var type = datas["fact"][i]["dims"]["GHO"];
      type.replace()
      ban["area"] = type;
      ban["value"] = value;
      types.push(ban);

      // If its the last one to add
      if(type == "Ban on advertising: Internet"){
      code = toCountryCode(datas["fact"][i]["dims"]["COUNTRY"]);
      all_countries_ads[code] = types;
      types = [];
      }
    }
  }
  return all_countries_ads;
};

function makeSpider(data){
  console.log(data)
  var width = 300,
      height = 300;

  // Config for the Radar chart
  var config = {
      w: width,
      h: height,
      maxValue: 100,
      levels: 5,
      ExtraWidthX: 300
  }

  RadarChart.draw("#spider", data, config);

  var svg =   d3v5.select("body").select("#box-two").select("#spider")
  	.selectAll('svg')
  	.append('svg')
  	.attr("width", width)
  	.attr("height", height);
};
// TO DO: make this render function workk.

function render(data){
  var cfg = {
   radius: 5,
   w: 600,
   h: 600,
   factor: 1,
   factorLegend: .85,
   levels: 3,
   maxValue: 0,
   radians: 2 * Math.PI,
   opacityArea: 1,
   ToRight: 5,
   TranslateX: 80,
   TranslateY: 30,
   ExtraWidthX: 100,
   ExtraWidthY: 100,
   color: d3v5.scaleOrdinal().range(["#6F257F", "#CA0D59"])
  };

  var svg =   d3v5.select("body").select("#box-two").select("#spider")

  var newArea = svg.select("g").selectAll(".area")
      .data(data)

  newArea.enter().append("polygon")
      .attr("class", "radar-chart-serie"+series)
      .style("stroke-width", "2px")
      .style("stroke", cfg.color(series))
      .attr("points",function(d) {
        var str="";
        for(var pti=0;pti<d.length;pti++){
          str=str+d[pti][0]+","+d[pti][1]+" ";
        }
        return str;
       })
      .style("fill", function(j, i){return cfg.color(series)})
      .style("fill-opacity", cfg.opacityArea)
      .on('mouseover', function (d){
               z = "polygon."+d3v3.select(this).attr("class");
               g.selectAll("polygon")
                .transition(200)
                .style("fill-opacity", 0.1);
               g.selectAll(z)
                .transition(200)
                .style("fill-opacity", .7);
               })
      .on('mouseout', function(){
               g.selectAll("polygon")
                .transition(200)
                .style("fill-opacity", cfg.opacityArea);
      });

  svg.select("g").selectAll(".area").remove();
}
