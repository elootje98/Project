// Load in the taxes data.
function makeTaxdata(datas){
  allTaxes = [];
  var types = ["Average - taxes as a % of cigarette price - specific excise",
                "Average - taxes as a % of cigarette price - ad valorem excise",
                "Average - taxes as a % of cigarette price - import duties",
                "Average - taxes as a % of cigarette price - value added tax",
                "Average - taxes as a % of cigarette price - other taxes",
                "Average - taxes as a % of cigarette price - total tax"];

  // Make for every type an object
  for(var i = 0; i < types.length; i++){
    var type = types[i];
    var object = typeTaxes(type, datas);
    allTaxes.push(object);
  }
  return allTaxes;
}

function typeTaxes(type, datas){

  // First do it for the taxes specific excise
  taxes = {}
  country = []
  item = {}

  // Loop over the values of the taxes and add the values to the all_countreis
  // TO DO : ALL THE VALUES ARE NOT CORRECT
  for(var i = 0; i < 4656; i++){
    if(datas["fact"][i]["dims"]["GHO"] == type){
      var year = datas["fact"][i]["dims"]["YEAR"];
      var value = datas["fact"][i]["Value"];
      if(value != "Not applicable"){
        item["y"] = value;
        item["x"] = year;
        // console.log(value);
        country.push(item);
        item = {}
      }

      if(year == 2008){
        country_name = datas["fact"][i]["dims"]["COUNTRY"];
        code = toCountryCode(country_name);
        taxes[code] = country;
        country = [];
      }
    }
  }
  return taxes;
}

function makeLine(dataset){

  // 2. Use the margin convention practice
  var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 300 // Use the window's width
  , height = 200; // Use the window's height

  var years = [2008, 2010, 2012, 2014];

  // 5. X scale will use the index of our data
  var xScale = d3v5.scaleBand()
    .domain(years) // input
    .range([0, width]); // output

  // 6. Y scale will use the randomly generate number
  var yScale = d3v5.scaleLinear()
    .domain([0, 100]) // input
    .range([height, 0]); // output

  // 7. d3's line generator
  var line = d3v5.line()
    .x(function(d, i) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3v5.curveMonotoneX) // apply smoothing to the line

  // 1. Add the SVG to the page and employ #2
  var svg = d3v5.select("body").select("#box-two").select("#line").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // 3. Call the x axis in a group tag
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3v5.axisBottom(xScale)); // Create an axis component with d3.axisBottom

  // 4. Call the y axis in a group tag
  svg.append("g")
    .attr("class", "y axis")
    .call(d3v5.axisLeft(yScale)); // Create an axis component with d3.axisLeft

  // Give labels to the axis
  svg.append("text")
    .text("Years")
    .attr("x", 70)
    .attr("y", 240);

  // 9. Append the path, bind the data, and call the line generator
  svg.append("path")
    .datum(dataset) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator

  // 12. Appends a circle for each datapoint
  svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    //   .on("mouseover", function(a, b, c) {
    //     console.log(a)
    //     this.attr('class', 'focus')
    // })
    //   .on("mouseout", function() {  })
    //     .on("mousemove", mousemove);
    //
    // var focus = svg.append("g")
    //     .attr("class", "focus")
    //     .style("display", "none");
    //
    // focus.append("circle")
    //     .attr("r", 4.5);
    //
    // focus.append("text")
    //     .attr("x", 9)
    //     .attr("dy", ".35em");
    //
    // svg.append("rect")
    //     .attr("class", "overlay")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .on("mouseover", function() { focus.style("display", null); })
    //     .on("mouseout", function() { focus.style("display", "none"); })
    //     .on("mousemove", mousemove);
    //
    // function mousemove() {
    //   var x0 = x.invert(d3.mouse(this)[0]),
    //       i = bisectDate(data, x0, 1),
    //       d0 = data[i - 1],
    //       d1 = data[i],
    //       d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    //   focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
    //   focus.select("text").text(d);
    // }

}

function updateLine(data){

  var width = 300 // Use the window's width
  var height = 200;

  var line = d3v5.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
    .curve(d3v5.curveMonotoneX) // apply smoothing to the line

  // 5. X scale will use the index of our data
  var xScale = d3v5.scaleLinear()
    .domain([0, 4-1]) // input
    .range([0, width]); // output

  // 6. Y scale will use the randomly generate number
  var yScale = d3v5.scaleLinear()
    .domain([0, 20]) // input
    .range([height, 0]); // output

  // join
  var dots = d3v5.select("body").select("#box-two").select("#line").select("svg").selectAll(".dot")
      .data(data);

  // enter
  dots.enter().append("circle")
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d) { return xScale(d.x) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5);

  dots.attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })

  var lines = d3v5.select("body").select("#box-two").select("#line").select("svg").select(".line")
    .attr("id","line1")
    .attr("d", line(data))
    .attr("class", "line"); // Assign a class for styling



  // lines.exit().remove();
  dots.exit().remove();
}
