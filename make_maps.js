
function make_map(datas){
  var map = new Datamap({element: document.getElementById('container'),
    // setProjection: function(element) {
    //    var projection = d3v3.geo.equirectangular()
    //      .center([10, 30])
    //      .rotate([4.4, 0])
    //      .scale(150)
    //      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    //    var path = d3v3.geo.path()
    //      .projection(projection);
    //
    //    return {path: path, projection: projection};
    //   },
    fills: {
      "<10": '#fecc5c',
      "10-20": '#fd8d3c',
      "20-30": '#f03b20',
      ">30": '#bd0026',
      "UNKNOWN": '#ffffb2',
      defaultFill: '#ffffb2',
  },
  data:
    datas,
  geographyConfig: {
      highlightBorderColor: '#bada55',
      popupTemplate: function(geography, data) {
        if(datas[(geography.id)] == undefined){
          return '<div class="hoverinfo">' + geography.properties.name + ":" + " " + "No value"
        }
        else{
        return '<div class="hoverinfo">' + geography.properties.name +
        ":" + " " + datas[(geography.id)]["Value"] + ' '}
      },
      highlightBorderWidth: 3
    },
  // done: function(datamap) {
  //     datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
  //         if(allTaxes[(geography.id)] == undefined){
  //           console.log('no data TO DO');
  //           // d3v5.select("body").select("line")
  //           //   .style("visibility", "hidden");
  //         }
  //         else{
  //           // d3v5.select("#spider")
  //           //   .style("visibility", "visible");
  //         updateLine(allTaxes[0][(geography.id)]);
  //     });
  //   },
  });
  map.legend({
      legendTitle: "% of population that smokes tobacco daily",
      });

  return map;
}

function update_map(map, datasx){
  console.log(datasx)
  map.updateChoropleth(datasx);
}
