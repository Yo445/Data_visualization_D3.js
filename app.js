const DUMMY_DATA = [
    { id: "d1", value: 10, region: "USA" },
    { id: "d2", value: 11, region: "India" },
    { id: "d3", value: 12, region: "China" },
    { id: "d5", value: 3, region: "Germany" },
    { id: "d6", value: 13, region: "Egypt" },
    { id: "d7", value: 8, region: "Libya" },
    { id: "d8", value: 2, region: "Alex" },
    { id: "d9", value: 10, region: "Moly" },
    { id: "d10", value: 14, region: "Dubai" },
    { id: "d11", value: 5, region: "Zamalek" },
  ];
  
  const width = 500, height = 300, margin = { top: 20, right: 20, bottom: 50, left: 50 };
  
  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
  
  const xScale = d3.scaleBand()
    .domain(DUMMY_DATA.map(d => d.region))
    .range([margin.left, width - margin.right])
    .padding(0.2);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(DUMMY_DATA, d => d.value)])
    .range([height - margin.bottom, margin.top]);
  
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale).ticks(5);
  
  // Add X Axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-20)")
    .style("text-anchor", "end");
  
  // Add Y Axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);
  
  // Add Bars
  svg.selectAll(".bar")
    .data(DUMMY_DATA)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.region))
    .attr("y", height - margin.bottom) // Start from bottom
    .attr("width", xScale.bandwidth())
    .attr("height", 0) // Start with height 0
    .transition()
    .duration(800)
    .attr("y", d => yScale(d.value))
    .attr("height", d => height - margin.bottom - yScale(d.value));
  
  // Add Labels
  svg.selectAll(".label")
    .data(DUMMY_DATA)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.region) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.value) - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .style("font-size", "12px")
    .text(d => d.value);
  