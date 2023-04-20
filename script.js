document.addEventListener("DOMContentLoaded", function () {
    // Sample data for visualization
    const data = [
        { category: "A", value: 10 },
        { category: "B", value: 20 },
        { category: "C", value: 30 },
        { category: "D", value: 40 },
        { category: "E", value: 50 }
    ];

    // Set chart dimensions
    const width = 600;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 40, left: 60 };

    // Create SVG container
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create x-scale
    const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width])
        .padding(0.2);

    // Create y-scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.category))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "#333");
});
