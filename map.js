d3v5.json("smoking.json").then(function(datas) {

  all_countries = {}

  for(var i = 0; i < 2328; i++){
  country = {}
    if(datas["fact"][i]["dims"]["SEX"] == "Both sexes" && datas["fact"][i]["dims"]["GHO"] == "Daily tobacco smoking, age-standardised"
       && datas["fact"][i]["Value"] != "Not available"){
      value = datas["fact"][i]["Value"];

      var fillKey;

      if(value < 10){
        fillKey = "<10";
      }
      else if (value > 10 && value < 20){
        fillKey = "10-20";
      }
      else if(value > 20 && value < 30){
        fillKey = "20-30";
      }
      else if(value > 30){
        fillKey = ">30";
      }

      country["Value"] = datas["fact"][i]["Value"];
      country["fillKey"] = fillKey;
      country["Tax"] = "UNKNOWN";
      country_name = datas["fact"][i]["dims"]["COUNTRY"];
      code = toCountryCode(country_name);

      all_countries[code] = country;
    }
  }

// Make the world map.
make_map(all_countries);

// Load in the taxes data.
d3v5.json("tax.json").then(function(datas) {

  // Make an empty object for the taxes and the years for one country.
  country_taxes = {};

  // Loop over the values of the taxes and add the values to the all_countreis
  for(var i = 0; i < 4656; i++){
      var type = datas["fact"][i]["dims"]["GHO"]
      var value = datas["fact"][i]["Value"];
      var year = datas["fact"][i]["dims"]["YEAR"];
      country = toCountryCode(datas["fact"][i]["dims"]["COUNTRY"]);
      console.log(country)
      console.log(type)
      console.log(year)
      country_taxes[country][type][year] = value;

      // // The last year to add
      // if(datas["fact"][i]["dims"]["YEAR"] == 2008){
      //
      //   // Check if the country is already in the object, then add the tax value.
      //   if(all_countries.hasOwnProperty(country)){
      //     var country_object = all_countries[country];
      //     country_object["Tax"] = country_taxes;
      //   }
      //   country_taxes = {};
      // }
    }
});

// Make  an svg for the linechart
var margin = {top: 100, bottom: 10, left: 10, right: 10};
width = 1000;
height = 400;
var svg = d3v5.select("body").select("#box-two").select("#line").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id", "line")
  .attr("transform", "translate(" + (400) + "," + (0) + ")")
.append("g")
  .attr("transform", "translate(" + (300) + "," + (0) + ")");

// Scale the Axis
// Function to scale the Y values
// var yScale = d3.scaleLinear()
//      .domain([0, d3.max(??????????)])
//      .range([h, 0]);
//
// // Function to scale the X values
// var bandScale = d3.scaleBand()
//   	.domain(regions)
//   	.range([0, 200])
//   	.paddingInner(0.05);



// // Load in the advertising bans
// d3v5.json("advertising.json").then(function(datas){
//   console.log(datas)
//
//   // Make an empty object for the taxes and the years for one country.
//   country_bans = {};
//
//   // Loop over the values of the taxes and add the values to the all_countreis
//   for(var i = 0; i < 4656; i++){
//       var value = datas["fact"][i]["Value"];
//       var year = datas["fact"][i]["dims"]["YEAR"];
//       var type = datas["fact"][i]["dims"]["GHO"];
//       country = toCountryCode(datas["fact"][i]["dims"]["COUNTRY"]);
//       country_bans[year] = value;
//
//       // The last year to add
//       if(datas["fact"][i]["dims"]["YEAR"] == 2007){
//
//         // Check if the country is already in the object, then add the tax value.
//         if(all_countries.hasOwnProperty(country)){
//           var country_object = all_countries[country];
//           country_object["Tax"] = country_taxes;
//         }
//         country_taxes = {};
//
//     }
//   }
//
// });


});
