function get_data(id) {

  d3.json("samples.json").then((data) => {
    var samplesData = data.samples;
    var sample = samplesData.filter(samp => samp.id == id)[0];

    var meta_Data = data.metadata;
    var meta = meta_Data.filter(samp => samp.id == id)[0];
    buildChart(sample);
    buildDemoChart(meta);
  });
}

function buildDemoChart(meta) {
  console.log(meta);
  var data_div = d3.select('#sample-metadata');
  data_div.html('');
  Object.entries(meta).forEach(([key, value]) => data_div.append('p').text(`${key}: ${value}`));
}


function buildChart(sample) {
  var trace1 = {
    x: sample.sample_values.slice(0, 10).reverse(),
    y: sample.otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse(),
    text: sample.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"

    // all data needed for the bubble chart comes in on sample
    // no slices/reverses
    // use pre-existing variables w/ the added "bubble"
    // call plotly.bubble
    // the 1st argument is the id that you want to attached to (get from the html)
    // color scale is "Earth" <-- call in from plotly
  };



  var data = [trace1];

  var layout = {
    title: "Biodiversity",
    xaxis: { title: "Counts" },
    yaxis: { title: "OTU" }
  };

  Plotly.newPlot("bar", data, layout);

};

function init() {
  var drop_down_ref = d3.select('#selDataset');
  d3.json("samples.json").then((data) => {
    data.names.forEach((name) => {
      drop_down_ref.append("option")
        .text(name)
        .property('value', name)

    });
  });

}

function createBubble(sample, name) {
  console.log(sample.otu_ids)
  var trace1 = {
      x: sample.otu_ids,
      y: sample.sample_values,
      text: sample.sample_values.map(samp_values =>`size:${samp_values}`),
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: [40, 60, 80, 100]
      }
  } 
    var data = [trace1];
    var layout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 600
    };
    Plotly.newPlot('#bubble', data, layout);
}

function optionChanged(sampleNumber) {
  get_data(sampleNumber);
}

get_data();
init();

