// window.addEventListener('load',init);

// function init(){
// 	$.ajax({
// 	    url: 'data/data.json',
// 	    type: 'GET',
// 	    failure: function(err){
// 	    	console.log ("Could not get the data");
// 	    	return alert("Something went wrong");
// 	    },
// 	    success: function(data) {
// 	    	console.log(data);
	    	
// 	    	// buildDoughnutChart(data);
// 	    	// buildBarChart(data);
// 	    	// buildLineChart(data);
// 	    }
// 	});
// }

// set default options for ALL charts
// see 
function setChartDefaults(){
	// make it responsive
	Chart.defaults.global.responsive = true;
	// set the font color
	Chart.defaults.global.defaultFontColor = '#222';
	// set the font family
	Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
}
setChartDefaults();


var myBarChart;

// see http://www.chartjs.org/docs/#bar-chart-introduction
function buildBarChart(_hist){

	
	var labelsArray = [];
	var frequency = [];
	hist.keys.forEach(function(key){
		labelsArray.push(_hist.bins[key[0]].name)
		frequency.push(_hist.bins[key[0]].frequencyGlobal);
	});

	
	var data = {
	    // chart labels
	    labels: labelsArray,
	    // array of datasets to plot
	    // could be only 1 if there's just 1 dataset
	    datasets: [
	        {
	            label: "Frequency",
	            backgroundColor: "#179ee0",
	            data: frequency
	        }
	    ]
	};

	
	var options = {
		legend: {
			position: 'bottom',
			labels: {
				fontColor: '#222',
				boxWidth: 12.5,
				padding: 20
			},
		},
    tooltips: {
        backgroundColor: '#222',
    },
	} 

	
	var ctx = document.getElementById("barChart").getContext("2d");
	
	// now, create the bar chart, passing in:
	// 1. the type (required)
	// 2. the data (required)
	// 3. chart options (optional)
	myBarChart = new Chart(ctx, {
	    type: 'bar',
	    // type: 'horizontalBar', // horizontal bards
	    data: data,
	    options: options
	});
}
// function updateBarChart(_hist){

	
// 	var labelsArray = [];
// 	var frequency = [];
// 	hist.keys.forEach(function(key){
// 		labelsArray.push(_hist.bins[key[0]].name)
// 		frequency.push(_hist.bins[key[0]].frequencyGlobal);
// 	});

	
// 	var data = {
// 	    // chart labels
// 	    labels: labelsArray,
// 	    // array of datasets to plot
// 	    // could be only 1 if there's just 1 dataset
// 	    datasets: [
// 	        {
// 	            label: "Frequency",
// 	            backgroundColor: "#179ee0",
// 	            data: frequency
// 	        }
// 	    ]
// 	};

// 	// now, create the bar chart, passing in:
// 	// 1. the type (required)
// 	// 2. the data (required)
// 	// 3. chart options (optional)
// 	myBarChart.data=data;
// }

// see http://www.chartjs.org/docs/#line-chart-introduction
