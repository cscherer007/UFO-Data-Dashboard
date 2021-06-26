// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select('tbody');
var button = d3.select('#filter-btn');
var input1 = d3.select('#datetime');
var input2 = d3.select("#city");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var populate = (dataInput) => {

	dataInput.forEach(ufo_sightings => {
		var row = tbody.append("tr");
		columns.forEach(column => row.append("td").text(ufo_sightings[column])
		)
	});
}

populate(data);

button.on("click", () => {
	d3.event.preventDefault();
	var inputDate = input1.property("value").trim();
    var inputCity = input2.property("value").toLowerCase().trim();
	// Filter by field matching input value
	var filterDate = data.filter(data => data.datetime === inputDate);
	console.log(filterDate)
	var filterCity = data.filter(data => data.city === inputCity);
	console.log(filterCity)
    var filterData = data.filter(data => data.datetime === inputDate);
	console.log(filterData)

	// Add filtered sighting to table
	tbody.html("");

	let response = {
		filterData, filterCity, filterDate
	}

	if (response.filterData.length !== 0) {
		populate(filterData);
	}
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
        populate(filterCity) || populate(filterDate);
	
		}
		else {
			tbody.append("tr").append("td").text("No results found!"); 
		}
})

resetbtn.on("click", () => {
	tbody.html("");
	populate(data)
	console.log("Table reset")
})