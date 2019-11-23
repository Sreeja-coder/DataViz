/** Data structure for the data associated with an individual country. */
class PlotData {
    /**
     *
     * @param country country name from the x data object
     * @param xVal value from the data object chosen for x at the active year
     * @param yVal value from the data object chosen for y at the active year
     * @param id country id
     * @param region country region
     * @param circleSize value for r from data object chosen for circleSizeIndicator
     */
    constructor(country, xVal, yVal, id, region, circleSize) {
        this.country = country;
        this.xVal = xVal;
        this.yVal = yVal;
        this.id = id;
        this.region = region;
        this.circleSize = circleSize;
    }
}

/** Class representing the scatter plot view. */
class GapPlot {

    /**
     * Creates an new GapPlot Object
     *
     * For part 2 of the homework, you only need to worry about the first parameter.
     * You will be updating the plot with the data in updatePlot,
     * but first you need to draw the plot structure that you will be updating.
     *
     * Set the data as a variable that will be accessible to you in updatePlot()
     * Call the drawplot() function after you set it up to draw the plot structure on GapPlot load
     *
     * We have provided the dimensions for you!
     *
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     * @param updateYear a callback function used to notify other parts of the program when a year was updated
     * @param activeYear the year for which the data should be drawn initially
     */
    constructor(data, updateCountry, updateYear, activeYear) {

        // ******* TODO: PART 2 *******

        this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 810 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.activeYear = activeYear;
        
        this.data = data;

        //YOUR CODE HERE  
		this.drawPlot();
		console.log(this.data);
		console.log("values",this.data.population[0][this.activeYear]);
		//this.updatePlot(this.activeYear,xIndicator,yIndicator,0);
	//	this.updatePlot(this.activeYear,this.data.population,this.data.gdp,0);
		this.drawDropDown(this.data.population,this.data.gdp,0);
		this.drawYearBar();


        // ******* TODO: PART 3 *******
        /**
         For part 4 of the homework, you will be using the other 3 parameters.
         * assign the highlightUpdate function as a variable that will be accessible to you in updatePlot()
         * assign the dragUpdate function as a variable that will be accessible to you in updatePlot()
         */

        //YOUR CODE HERE  


    }

    /**
     * Sets up the plot, axes, and slider,
     */

    drawPlot() {
        // ******* TODO: PART 2 *******
        /**
         You will be setting up the plot for the scatterplot.
         Here you will create axes for the x and y data that you will be selecting and calling in updatePlot
         (hint): class them.

         Main things you should set up here:
         1). Create the x and y axes
         2). Create the activeYear background text


         The dropdown menus have been created for you!

         */

        d3.select('#scatter-plot')
            .append('div').attr('id', 'chart-view');

        d3.select('#scatter-plot')
            .append('div').attr('id', 'activeYear-bar');

        d3.select('#chart-view')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);

        d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        let svgGroup = d3.select('#chart-view').select('.plot-svg').append('g').classed('wrapper-group', true);

        //YOUR CODE HERE  
		
		  var plotyear = d3.select('#chart-view').select('.plot-svg').select('.wrapper-group').append('g').classed('plotyear', true)
		     plotyear.append('text').text(this.activeYear).attr("x", "200").attr("y","100")
			 .attr("fill","grey").attr("font-size","4em");
		const plot = d3.select('.wrapper-group');
		var xScale = d3.scaleLinear()
                        .domain([0,9])
                         .range([0,this.width]); 
		var xAxis = plot.append('g').classed('x-axis', true).attr('transform', `translate(${15},${this.height+5})`);
		xAxis.call(d3.axisBottom(xScale));
		//console.log((this.data));
		
		var xScale = d3.scaleLinear()
		var yScale = d3.scaleLinear()
                        .domain([9,0])
                         .range([0,this.height]); 
		var yAxis = plot.append('g').classed('y-axis', true).attr('transform', `translate(${15},${5})`);
		yAxis.call(d3.axisLeft(yScale));
		
		  

        /* This is the setup for the dropdown menu- no need to change this */

        let dropdownWrap = d3.select('#chart-view').append('div').classed('dropdown-wrapper', true);

        let cWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        cWrap.append('div').classed('c-label', true)
            .append('text')
            .text('Circle Size');

        cWrap.append('div').attr('id', 'dropdown_c').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let xWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        xWrap.append('div').classed('x-label', true)
            .append('text')
            .text('X Axis Data');

        xWrap.append('div').attr('id', 'dropdown_x').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let yWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        yWrap.append('div').classed('y-label', true)
            .append('text')
            .text('Y Axis Data');

        yWrap.append('div').attr('id', 'dropdown_y').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        d3.select('#chart-view')
            .append('div')
            .classed('circle-legend', true)
            .append('svg')
            .append('g')
            .attr('transform', 'translate(10, 0)');


    }

    /**
     * Renders the plot for the parameters specified
     *
     * @param activeYear the year for which to render
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    updatePlot(activeYear, xIndicator, yIndicator, circleSizeIndicator) {

        // ******* TODO: PART 2 *******

        /*
        You will be updating the scatterplot from the data. hint: use the #chart-view div

        *** Structuring your PlotData objects ***
        You need to start by mapping the data specified by the parameters to the PlotData Object
        Your PlotData object is specified at the top of the file
        You will need get the data specified by the x, y and circle size parameters from the data passed
        to the GapPlot constructor

        *** Setting the scales for your x, y, and circle data ***
        For x and y data, you should get the overall max of the whole data set for that data category,
        not just for the activeYear.

        ***draw circles***
        draw the circles with a scaled area from the circle data, with cx from your x data and cy from y data
        You need to size the circles from your circleSize data, we have provided a function for you to do this
        called circleSizer. Use this when you assign the 'r' attribute.

        ***Tooltip for the bubbles***
        You need to assign a tooltip to appear on mouse-over of a country bubble to show the name of the country.
        We have provided the mouse-over for you, but you have to set it up
        Hint: you will need to call the tooltipRender function for this.

        *** call the drawLegend() and drawDropDown()
        These will draw the legend and the drop down menus in your data
        Pay attention to the parameters needed in each of the functions
        
        */

        /**
         *  Function to determine the circle radius by circle size
         *  This is the function to size your circles, you don't need to do anything to this
         *  but you will call it and pass the circle data as the parameter.
         * 
         * @param d the data value to encode
         * @returns {number} the radius
         */
		 var plotyear = d3.select('#chart-view').select('.plot-svg').select('.wrapper-group').select('.plotyear');
		 plotyear.remove();
		 
		 console.log("active year",activeYear);
		 var plotyear1 = d3.select('#chart-view').select('.plot-svg').select('.wrapper-group').append('g').classed('plotyear', true)
		     plotyear1.append('text').text(activeYear).attr("x", "200").attr("y","100")
			 .attr("fill","grey").attr("font-size","4em");
		  var circleCountry = [];
		  var maxS = circleSizeIndicator[0][activeYear];
		  var minS = circleSizeIndicator[0][activeYear];
		  let k;
		    for(k=0;k<circleSizeIndicator.length;k++)
		 {
		    if(maxS<circleSizeIndicator[k][activeYear])
				maxS=circleSizeIndicator[k][activeYear];
		   
		   if (minS>circleSizeIndicator[k][activeYear])
				minS=circleSizeIndicator[k][activeYear];
			
			circleCountry.push(circleSizeIndicator[k][activeYear]);
		 }
		   console.log("min",minS,"max",maxS);
        let circleSizer = function(d) {
            let cScale = d3.scaleSqrt().range([3, 20]).domain([minS, maxS]);
            return d.circleSize ? cScale(d.circleSize) : 3;
        };
        ///////////////////////////////////////////////////////////////////

        //YOUR CODE HERE  
		//storing values in array to create plot objects
		
		 var xValues =[];
		var yValues =[];
		var countriesA = [];
		var countryID = [];
		var regionA = [];
		var MaxofallX = [];
		var MaxofallY = [];
		var MinofallX = [];
		var MinofallY = [];
		let count =0;
		let tempY;
		
		var maximum = (Math.max(xIndicator.length,yIndicator.length));
		var minimum = (Math.min(xIndicator.length,yIndicator.length));
		//console.log("Xindicator lenght after selecting dropdown", xIndicator.length);
		//console.log("this active year",this.activeYear);
		 if(xIndicator.length<yIndicator.length)
{
    var temp;
    for (let i = 0; i < yIndicator.length; i++) {
        
        temp = yIndicator[i]['country']
        var check=0;
        for (let j = 0; j < xIndicator.length; j++) {
            if (temp == xIndicator[j]['country']) {
                //console.log("x", xIndicator[j]['country'])
                xValues.push(xIndicator[j][activeYear]);
                check = 1;
                break;
            }
        }
            if(check==0){
               
                xValues.push(0);
            }
           yValues.push(yIndicator[i][activeYear]);
        countriesA.push(yIndicator[i]['country']);
        countryID.push(yIndicator[i].id);
    }
   
}
		 if(xIndicator.length>yIndicator.length)
{
    var temp;
    for (let i = 0; i < xIndicator.length; i++) {
        //console.log("y",xIndicator[i]['country'])
        temp = xIndicator[i]['country']
        var check=0;
        for (let j = 0; j < yIndicator.length; j++) {
            if (temp == yIndicator[j]['country']) {
               
                yValues.push(yIndicator[j][activeYear]);
                check = 1;
                break;
            }
        }
        if(check==0){
            
            yValues.push(0);
        }
        xValues.push(xIndicator[i][activeYear]);
        countriesA.push(xIndicator[i]['country']);
        countryID.push(xIndicator[i]['id'])
    }

}
		 
		
		 if(xIndicator.length==minimum){
		for(let j=0;j<xIndicator.length;j++){
			{
			regionA.push(xIndicator[j]['region']);
			}
		 }
		 }
		 if(yIndicator.length==minimum){
		for(let j=0;j<xIndicator.length;j++){
			{
			regionA.push(yIndicator[j]['region']);
			}
		 }
		 }
		 
		 
		
		 
		 if(xIndicator.length==yIndicator.length)
	{
    var temp;
    for (let i = 0; i < xIndicator.length; i++) {
        //console.log("y",xIndicator[i]['country'])
        temp = xIndicator[i]['country']
        var check=0;
        for (let j = 0; j < yIndicator.length; j++) {
            if (temp == yIndicator[j]['country']) {
               
                yValues.push(yIndicator[j][activeYear]);
                check = 1;
                break;
            }
        }
        if(check==0){
            
            yValues.push(0);
        }
        xValues.push(xIndicator[i][activeYear]);
        countriesA.push(xIndicator[i]['country']);
        countryID.push(xIndicator[i]['id'])
    }

}
		 
		 
		 
		 //console.log(regionA);
		 //console.log("name",xIndicator[0]['indicator_name']);
		 //
		  //for(j=0;j<maximum;j++){
			  //check =1;
			  
		 //for (i=0; i <yIndicator.length ; i++)
		 //{
			 //if(countriesA[j]==yIndicator[i].country ){
			 //yValues.push((yIndicator[i][this.activeYear])); 
			 //check =0;
			 
			 //}
			 
		// }if (check==1)
			// yValues.push(0);
		 
		 //}
		 
		 for(let i=0;i<xIndicator.length;i++)
		 {
		 var temp = [];
		 for (let j=1800;j<2020;j++){
		 temp.push((xIndicator[i][j]));		 
		 }
		 MaxofallX.push(d3.max(temp));
		 
		 }
		
		 
		 for(let i=0;i<yIndicator.length;i++)
		 {
		 var temp = [];
		 for (let j=1800;j<2020;j++){
		 temp.push((yIndicator[i][j]));		 
		 }
		 MaxofallY.push(d3.max(temp));
		 
		 }
		 let maxX= d3.max(MaxofallX);
		   
		   let maxY = d3.max(MaxofallY);
		 
		 //console.log("maxY",Math.round(maxY));
		 
		
		
		//console.log("MAX data for yvalues",d3.max(yValues));
		// console.log("MAX data for xvalues",d3.max(xValues));
		 //creating plots
		 var plotdata = d3.select('#chart-view').select('.plot-svg').select('.wrapper-group').selectAll('circle');
		 plotdata.remove();
		 let ytranslate = (this.height + 5);
		 for(let i=0; i <maximum ; i++){
			 
			 let plotObj = new PlotData(countriesA[i], xValues[i], yValues[i], countryID[i], regionA[i],circleCountry[i]);
			 //console.log("for every",i,"cx",plotObj.xVal,"cy",plotObj.yVal);
			 //console.log(this.circleSizer());
			 let CX =d3.scaleLinear()
                        .domain([0,maxX])
                         .range([0,this.width]); 
			let CY =d3.scaleLinear()
                        .domain([maxY,0])
                         .range([0,this.height]); 
			 d3.select('#chart-view').select('.plot-svg').select('.wrapper-group').append('circle')
					 .attr("cx",d => CX(plotObj.xVal))
			        .attr("cy",d => CY(plotObj.yVal))
					.attr("r",d => circleSizer(plotObj))
					.attr("class",plotObj.region)
					.attr('transform', `translate(${55},${0})`);
					//.attr("r",d => circleSizer(circleCountry[i]))
			
		 }
		 
		 //recreating the text and axes to the changing values.
		   
		const plot1 = d3.select('.wrapper-group');
		console.log("heigth",this.height);
		plot1.select('.x-axis').remove();
		plot1.select('.y-axis').remove();
		var xScale = d3.scaleLinear()
                        .domain([0,Math.ceil(maxX)])
                         .range([0,this.width]); 
		var xAxis = plot1.append('g').classed('x-axis', true).attr('transform', `translate(${55},${this.height+20})`);
		xAxis.call(d3.axisBottom(xScale));
		//console.log((this.data));
		
		
		var yScale = d3.scaleLinear()
                        .domain([Math.ceil(maxY),0])
                         .range([0,this.height]); 
		var yAxis = plot1.append('g').classed('y-axis', true).attr('transform', `translate(${55},${20})`);
		yAxis.call(d3.axisLeft(yScale));
		 //console.log("Xvalue arrays",xValues);
		 //console.log("x indicator lenght",xIndicator.length);
		 
		 //console.log("array of x" ,xIndicator[0][this.activeYear]);
		
		

    }

    /**
     * Setting up the drop-downs
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    drawDropDown(xIndicator, yIndicator, circleSizeIndicator) {
         
        let that = this;
        let dropDownWrapper = d3.select('.dropdown-wrapper');
        let dropData = [];

        for (let key in this.data) {
            dropData.push({
                indicator: key,
                indicator_name: this.data[key][0].indicator_name
            });
        }

        /* CIRCLE DROPDOWN */
        let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');

        let optionsC = dropC.selectAll('option')
            .data(dropData);


        optionsC.exit().remove();

        let optionsCEnter = optionsC.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsCEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsC = optionsCEnter.merge(optionsC);

        let selectedC = optionsC.filter(d => d.indicator === circleSizeIndicator)
            .attr('selected', true);

        dropC.on('change', function(d, i) {
            let cValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let yValue = dropY.node().value;
            that.updatePlot(that.activeYear, that.data[xValue], that.data[yValue], that.data[cValue]);
        });

        /* X DROPDOWN */
        let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');

        let optionsX = dropX.selectAll('option')
            .data(dropData);

        optionsX.exit().remove();

        let optionsXEnter = optionsX.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsXEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsX = optionsXEnter.merge(optionsX);

        let selectedX = optionsX.filter(d => d.indicator === xIndicator)
            .attr('selected', true);

        dropX.on('change', function(d, i) {
            let xValue = this.options[this.selectedIndex].value;
            let yValue = dropY.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, that.data[xValue], that.data[yValue], that.data[cValue]);
        });

        /* Y DROPDOWN */
        let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');

        let optionsY = dropY.selectAll('option')
            .data(dropData);

        optionsY.exit().remove();

        let optionsYEnter = optionsY.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsY = optionsYEnter.merge(optionsY);

        optionsYEnter.append('text')
            .text((d, i) => d.indicator_name);

        let selectedY = optionsY.filter(d => d.indicator === yIndicator)
            .attr('selected', true);

        dropY.on('change', function(d, i) {
            let yValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, that.data[xValue], that.data[yValue], that.data[cValue]);
        });

    }

    /**
     * Draws the year bar and hooks up the events of a year change
     */
    drawYearBar() {

        // ******* TODO: PART 2 *******
        //The drop-down boxes are set up for you, but you have to set the slider to updatePlot() on activeYear change

        // Create the x scale for the activeYear;
        // hint: the domain should be max and min of the years (1800 - 2020); it's OK to set it as numbers
        // the plot needs to update on move of the slider

        /* ******* TODO: PART 3 *******
        You will need to call the updateYear() function passed from script.js in your activeYear slider
        */
        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 730]);

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1800)
            .attr('max', 2020)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.activeYear);

        sliderText.attr('x', yearScale(this.activeYear));
        sliderText.attr('y', 25);
        //console.log("yearslider vaue",document.getElementById("slider-wrap").value);
        yearSlider.on('input', function() {
			
            //YOUR CODE HERE  
			sliderText.text(this.value);
            sliderText.attr('x', yearScale(this.value));
            let xValue = d3.select('#dropdown_x').select('select').node().value;
            let yValue = d3.select('#dropdown_y').select('select').node().value;
            let cValue = d3.select('#dropdown_c').select('select').node().value;
            that.updatePlot(String(this.value), that.data[xValue], that.data[yValue], that.data[cValue]);
            that.updateYear(String(this.value));
			
        });
    }

    /**
     * Draws the legend for the circle sizes
     *
     * @param min minimum value for the sizeData
     * @param max maximum value for the sizeData
     */
    drawLegend(min, max) {
        // ******* TODO: PART 2*******
        //This has been done for you but you need to call it in updatePlot()!
        //Draws the circle legend to show size based on health data
        let scale = d3.scaleSqrt().range([3, 20]).domain([min, max]);

        let circleData = [min, max];

        let svg = d3.select('.circle-legend').select('svg').select('g');

        let circleGroup = svg.selectAll('g').data(circleData);
        circleGroup.exit().remove();

        let circleEnter = circleGroup.enter().append('g');
        circleEnter.append('circle').classed('neutral', true);
        circleEnter.append('text').classed('circle-size-text', true);

        circleGroup = circleEnter.merge(circleGroup);

        circleGroup.attr('transform', (d, i) => 'translate(' + ((i * (5 * scale(d))) + 20) + ', 25)');

        circleGroup.select('circle').attr('r', (d) => scale(d));
        circleGroup.select('circle').attr('cx', '0');
        circleGroup.select('circle').attr('cy', '0');
        let numText = circleGroup.select('text').text(d => new Intl.NumberFormat().format(d));

        numText.attr('transform', (d) => 'translate(' + ((scale(d)) + 10) + ', 0)');
    }

    /**
     * Reacts to a highlight/click event for a country; draws that country darker
     * and fades countries on other continents out
     * @param activeCountry
     */
    updateHighlightClick(activeCountry) {
        /* ******* TODO: PART 3*******
        //You need to assign selected class to the target country and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        // You will not be calling this directly in the gapPlot class,
        // you will need to call it from the updateHighlight function in script.js
        */
        //YOUR CODE HERE  
    }

    /**
     * Clears any highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //YOUR CODE HERE  
    }

    /**
     * Returns html that can be used to render the tooltip.
     * @param data 
     * @returns {string}
     */
    tooltipRender(data) {
        let text = "<h2>" + data['country'] + "</h2>";
        return text;
    }

}