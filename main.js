// Make a list of promsises
var loadData = [d3v5.json("smoking.json"), d3v5.json("tax.json"), d3v5.json("advertising.json")];

Promise.all(loadData).then(function(data1){

  // Load the mapdata in mapdata is list with all_countries, all_countries_males,
  // all_countries_fem
  var mapData = makeMapdata(data1[0]);
  var map = make_map(mapData[0]);

  // allTaxes is a list with all different kinds of tax
  var allTaxes = makeTaxdata(data1[1]);

  // console.log(taxData);
  makeLine(allTaxes[0]["USA"]);
  console.log(allTaxes[0]["ARG"]);
  var countryTax = "ARG";

  // Load advertisement data
  var adData = makeAddata(data1[2]);
  makeSpider([adData["AFG"]]);
  render([adData["ALB"]]);

  // Update map by onclick
  d3v5.select("body").select("#box-one").select(".both")
    .on('click', function(){ update_map(map, mapData[0]); });

  d3v5.select("body").select("#box-one").select(".men")
    .on('click', function(){ update_map(map, mapData[1]); });

  d3v5.select("body").select("#box-one").select(".women")
    .on('click', function(){ update_map(map, mapData[2]); });

  d3v5.select("body").select("#box-two").select("#line").select(".Total")
    .on('click', function(){updateLine(allTaxes[0][countryTax])});

  d3v5.select("body").select("#box-two").select("#line").select(".Specific")
    .on('click', function(){updateLine(allTaxes[1][countryTax])});

  d3v5.select("body").select("#box-two").select("#line").select(".Ad")
    .on('click', function(){updateLine(allTaxes[2][countryTax])});

  d3v5.select("body").select("#box-two").select("#line").select(".Import")
    .on('click', function(){updateLine(allTaxes[3][countryTax])});

  d3v5.select("body").select("#box-two").select("#line").select(".Value")
    .on('click', function(){updateLine(allTaxes[4][countryTax])});

  d3v5.select("body").select("#box-two").select("#line").select(".Other")
    .on('click', function(){updateLine(allTaxes[5][countryTax])});

});
