/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(teamData, treeObject) {
             console.log("team data",teamData);
			 console.log("tree object",treeObject);
			 console.log("size",teamData.length);
			 console.log("1st val", teamData[0].key);
			 
        // Maintain reference to the tree object
        this.tree = treeObject;

        /**List of all elements that will populate the table.*/
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = teamData;

        ///** Store all match data for the 2018 Fifa cup */
        this.teamData = teamData;

        this.tableHeaders = ["Team","Delta Goals","Result", "Wins", "Losses", "TotalGames"];
		this.tableHeaders1=["Delta Goals","Result", "Wins", "Losses", "TotalGames"];

        /** letiables to be used when sizing the svgs in the table cells.*/
        this.cell = {
            "width": 70,
            "height": 20,
            "buffer": 15
        };

        this.bar = {
            "height": 20
        };

        /** Set variables for commonly accessed data columns*/
        this.goalsMadeHeader = 'Goals Made';
        this.goalsConcededHeader = 'Goals Conceded';

        /** Setup the scales*/
       this.goalScale = d3.scaleLinear()
            .range([15, 125]);


        /** Used for games/wins/losses*/
        this.gameScale = d3.scaleLinear()
            .range([0, 60]);

        /**Color scales*/
        /**For aggregate columns*/
        /** Use colors '#feebe2' and '#690000' for the range*/
        this.aggregate_color_scale = d3.scaleLinear()
            .range(["#feebe2","#690000"]);


        /**For goal Column*/
        /** Use colors '#cb181d' and '#034e7b' for the range */
        this.goalColorScale = d3.scaleLinear()
            .domain([-1, 1])
            .range(['#cb181d', '#034e7b']);
    }


    /**
     * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
     *
     */
    createTable() {

        // ******* TODO: PART II *******

        //Update Scale Domains
        
        // Create the axes
        
        //add GoalAxis to header of col 1.
		//console.log(d3.max(this.teamData, d => d3.max([d.value[this.goalsConcededHeader], d.value[this.goalsMadeHeader]])))--value 16;
		//console.log(d3.max(this.teamData, d => d.value.TotalGames)) --- value 7;
		
		  this.goalScale.domain([0, d3.max(this.teamData, d => d3.max([d.value[this.goalsConcededHeader], d.value[this.goalsMadeHeader]]))]);

        this.gameScale.domain([0, d3.max(this.teamData, d => d.value.TotalGames)]);
        
        this.aggregate_color_scale.domain(this.gameScale.domain());
        // Create the axes
        let xAxis = d3.axisTop()
            .scale(this.goalScale);
			  d3.select('#goalHeader')
            .append('svg')
            .attr('width', 150)
            .attr('height', 30)
            .append('g')
            .attr("transform", "translate(0,20)")
            .call(xAxis);
			
	  
	  

        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers
		// Set sorting callback for clicking on headers
       let sortedTH = this.tableHeaders1.map(() => false);
        d3.selectAll("thead td").data(this.tableHeaders1).on("click", (k, i) => {

            let invert;

            console.log(sortedTH);

            if (sortedTH[i] === true) {

                sortedTH[i] = false;

                invert = true;

            } else {

                sortedTH = this.tableHeaders1.map(function () {

                    return false

                });

                sortedTH[i] = true;

                invert = false;

            }



            this.tableElements = this.tableElements.sort(function (a, b) {

                if (invert) {

                    let temp = b;

                    b = a;

                    a = temp;
					console.log("a",a,"b",b);

                }
                 


                if (k === 'Result') {
					console.log("result",k);

                    if (b.value[k].ranking === a.value[k].ranking) {

                        return a.key < b.key ? -1 : 1

                    } else {

                        return b.value[k].ranking - a.value[k].ranking;

                    }

                }

                else {

                    //Sort alphabetically in the case of a tie or Team Name

                    if (b.value[k] === a.value[k]) {

                        return a.key < b.key ? -1 : 1

                    } else

                        return b.value[k] - a.value[k];

                }

            });

            this.collapseList();

            this.updateTable();

        });



        //Set sorting callback for clicking on Team header

        d3.selectAll("thead th").data('Team').on("click", () => {

            this.tableElements = this.tableElements.sort(function (a, b) {

                return a.key < b.key ? -1 : 1

            });

            this.collapseList();

            this.updateTable();

        });

        

        //Set sorting callback for clicking on Team header
        //Clicking on headers should also trigger collapseList() and updateTable().

    };


    /**
     * Updates the table contents with a row for each element in the global variable tableElements.
     */
    updateTable() {
        // ******* TODO: PART III *******
        //Create table rows

        //Append th elements for the Team Names

        //Append td elements for the remaining columns. 
        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'vis' :<'bar', 'goals', or 'text'>, 'value':<[array of 1 or two elements]>}
        
        //Add scores as title property to appear on hover

        //Populate cells (do one type of cell at a time )

        //Create diagrams in the goals column

        //Set the color of all games that tied to light gray
		console.log("inside update");
		//creating table rows for each data value
			var table1 = d3.select('#matchTable').select('tbody');
			 let tablerow = d3.select("tbody").selectAll("tr").data(this.tableElements);
			 tablerow.exit().remove();
		var rows = table1.selectAll('tr')
	  .data(this.tableElements).join('tr');
	  
	  //let trEnter = tr.enter().append("tr");
	  
	  
		 //rows.append("th");
		 rows = rows.enter().append("tr").merge(rows)

            .attr('class', d => d.value.type)

            .on("mouseover", (d, i) => this.tree.updateTree(d))

            .on("mouseout", (d, i) => this.tree.clearTree())

            .on("click", (d, i) => this.updateList(i));

        rows.select("th")

            .text(d => d.value.type === 'aggregate' ? d.key : 'x' + d.key);
	  
	  
	  
	  
	  
	  //adding values to each column
	  //var cells = rows.selectAll("td").data((d) => { var listv =[{"type":d.value.type,"viz":}]  ;console.log(listv); return listv }).enter().append('td');
	  //var cells = rows.selectAll("td").data((d) => { var arrayv =  [d.key,d.value.type,d.value.Result.label,d.value.Wins,d.value.Losses,d.value.TotalGames]; return arrayv }).join('td');
	    //var cells = rows.selectAll("td").data((d) => { var arrayv =  [{"type":d.value.type,"viz":"text","value":d.key},{"type":d.value.type,"viz":"bar","value":d.key},{"type":d.value.type,"viz":"text","value":d.value.Result.label},{"type":"game","viz":"goals","value":d.value.Wins},{"type":"game","viz":"goals","value":d.value.Losses},{"type":"game","viz":"goals","value":d.value.TotalGames}]; return arrayv }).join('td');
	    
		//cells.html(function(d) {console.log(d); return d.value});  
		//cells.html(d => d[0],d[1],d[2],cells.append('svg').attr('width',150).attr('height',30).append('rect').attr('x',0).attr('y',0).attr('width',60).attr('height',10).);  
		
		
        let cells1 = rows.selectAll("td");
		cells1.remove();
		let cells = rows.selectAll("td")
		.data(d => {

                return this.tableHeaders.map((header, i) => {

                    if (i === 1) { //for the first column, you need a 2 element array

					return {'type': d.value.type,'vis': 'goals','value': [d.value[this.goalsMadeHeader], d.value[this.goalsConcededHeader]]}}
					else if (header === 'Result') {return {'type': d.value.type, 'vis': 'text', 'value': d.value.Result.label}}
					else if (header === 'Team') {return {'type': d.value.type, 'vis': 'text', 'value': d.key}}
					else {return {'type': d.value.type, 'vis': 'bars', 'value': d.value[header]}}

                });}).join("td");
				
				
				
				//cells.html(function(d) {console.log(d); return d.value}); 
				
		//adding svg to each cells
		
		 
		let addsvg = cells.filter(function (d) {

            return d.vis !== 'text'

        }).append("svg").attr("width", d => d.vis === 'bars' ? this.cell.width : 2 * this.cell.width)

            .attr("height", this.cell.height);
		//add rects to wins/losses/games played
		
		
		 let barcolumns = addsvg.filter(function (d) {

            return d.vis === 'bars';

        });



        barcolumns.append("rect");

        barcolumns.select("rect")

            .attr("height", this.bar.height)

            .attr("width", d => {

                return d.value ? this.gameScale(d.value) : 0;

            })

            .attr("fill", d => {

                return this.aggregate_color_scale(d.value);

            });
			barcolumns.append("text");
			
		barcolumns.select("text")
		      .classed('label', true)

            .attr("x", d => d.value ? this.gameScale(d.value) : 0)

            .attr("y", this.cell.height / 2)

            .attr("dy", ".35em")
			.attr("dx", function (d) {

                return d.value > 1 ? -3 : 8

            })

            .attr("text-anchor", function (d) {

                return d.value > 0 ? 'end' : 'start'

            }).text(function (d) {

                return d.value;

            });	
		
		
  //putting text in its place
        let textColumns = cells.filter(function (d) {

            return d.vis === 'text';

        });



        textColumns.text(function (d) {return (d.value)});
		
	//filling goals column
	let goalColumns = addsvg.filter(function (d) {

            return d.vis === 'goals';

        });
		goalColumns.append("rect");
		goalColumns.select("rect")

            .attr("height", function (d) {

                return d.type === 'aggregate' ? 13 : 5

            })
		.attr("width", d => Math.abs(this.goalScale(d.value[0]) - this.goalScale(d.value[1])))

            .attr('x', d => this.goalScale(d3.min(d.value)))

            .attr('y', d => d.type === 'aggregate' ? this.cell.height / 2 - 13 / 2 : this.cell.height / 2 - 5 / 2)

            .attr('fill', d => this.goalColorScale(d.value[0] - d.value[1]));



        goalColumns.select("rect")

            .classed('goalBar', true);
			
		//adding first circles
		goalColumns.append("circle")

            .classed('first goalCircle', true);

        goalColumns.select("circle.first")

            .attr("cx", d => {

                return this.goalScale(d.value[0]);

            })

            .attr('cy', this.cell.height / 2)

            .attr("stroke", this.goalColorScale.range()[1])

            .attr('fill', d => {

                return d.type === 'game' ? 'white' : this.goalColorScale.range()[1]

            });
			
		//adding second circle
			
		 goalColumns.append("circle")

            .classed('second goalCircle', true);

        goalColumns.select("circle.second")

            .attr("cx", d => {

                return this.goalScale(d.value[1]);

            })

            .attr('cy', this.cell.height / 2)

            .attr("stroke", this.goalColorScale.range()[0])

            .attr('fill', d => {

                return d.type === 'game' ? 'white' : this.goalColorScale.range()[0]

            });
		
       	//adding gray color for goals 0
		goalColumns.filter(function (d) {

            return d.value[0] === d.value[1]

        })

            .selectAll('circle')

            .attr('stroke', 'gray')

            .attr('fill', function (d) {

                return d.type === 'game' ? 'white' : 'gray'

            });

   	
	  
		
		 
    };

    /**
     * Updates the global tableElements variable, with a row for each row to be rendered in the table.
     *
     */
    updateList(i) {
        // ******* TODO: PART IV *******
       
        //Only update list for aggregate clicks, not game clicks
		console.log("i",i);
		let rows2;

        //Only update list for aggregate clicks, not game clicks

        if (this.tableElements[i].value.type === 'aggregate') {

            if (i === this.tableElements.length - 1) {

                rows2 = i;

            }

            else {

                rows2 = i + 1;

            }



            if (this.tableElements[rows2].value.type === 'game') {

                this.tableElements.splice(i + 1, this.tableElements[i].value.games.length);

            }

            else {

                this.tableElements[i].value.games.forEach((game, j) => {

                    this.tableElements.splice(i + 1 + j, 0, game);

                });

            }

            this.updateTable();
			this.tree.updateTree(i);

        }

        
    }

    /**
     * Collapses all expanded countries, leaving only rows for aggregate values per country.
     *
     */
    collapseList() {
        
        // ******* TODO: PART IV *******
		let len = this.tableElements.length;

        while (len--) {

            //check if game line, remove

            if (this.tableElements[len].value.type === 'game')

                this.tableElements.splice(len, 1);

        }


    }


}
