d3.json("samples.json").then((data)=>{
    console.log(data);

    var id = '940';
    var samplesData = data.samples;
    var sample = samplesData.filter(samp => samp.id == id)[0]; 
    console.log(sample);
    buildChart(sample);
});

function buildChart(sample){
    var trace1 = {
        x: sample.sample_values.slice(0, 10),
        y: sample.otu_ids.slice(0, 10).map(otu => `OTU ${otu}`),
        type: "bar"
      };
      
      // Create the data array for the plot
      var data = [trace1];
    
      var layout = {
        title: "Eye Color vs Flicker",
        xaxis: { title: "Eye Color" },
        yaxis: { title: "Flicker Frequency" }
      };
      
      Plotly.newPlot("bar", data, layout);
      
    
// Notes
// add more keys to trace1
// add orientation elements
// set text propertiies/labels
// ^ all this goes into trace1

//do dropdown next
};