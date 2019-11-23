/** Class implementing the tree view. */
class Tree {
    /**
     * Creates a Tree Object
     */
    constructor() {
        
    }

    /**
     * Creates a node/edge structure and renders a tree layout based on the input data
     *
     * @param treeData an array of objects that contain parent/child information.
     */
    createTree(treeData) {

        // ******* TODO: PART VI *******


        //Create a tree and give it a size() of 800 by 300. 
		let tree = d3.tree()

            .size([800, 300]);


        //Create a root for the tree using d3.stratify(); 
let root = d3.stratify()

            .id(d => d.id)

            .parentId(d => d.ParentGame ? treeData[d.ParentGame].id : '')

            (treeData);
			tree(root);
			console.log("root",root);
        
        //Add nodes and links to the tree. 
		let addtree = d3.select("#tree").attr("transform", "translate(80,0)");
		 let creatinglink = addtree.selectAll(".link").data(root.descendants().slice(1)).enter().append("path")

            .classed("link",true)

            .attr("d", d => `M ${d.y}, ${d.x} C ${d.parent.y+18} ${d.x}, ${d.parent.y+18} ${d.parent.x},${d.parent.y}  ${d.parent.x}`);
    
	
	let addnode = addtree.selectAll(".node")

            .data(root.descendants())

            .enter().append("g")

            .attr("class", function (d) {

                return "node" + (d.data.Wins === "1" ? " winner" : " loser");

            })

            .attr("transform", function (d) {

                return "translate(" + d.y + "," + d.x + ")";

            });
	addnode.append("circle").attr("r", 5);
	addnode.append("text")

            .attr("dy", 4)

            .attr("x", (d) => d.children ? -4 : 4)
            .style("text-anchor", d => d.children ? "end" : "start")

            
            .text((d) => d.data.Team);
	
	
	
	};
    /**
     * Updates the highlighting in the tree based on the selected team.
     * Highlights the appropriate team nodes and labels.
     *
     * @param row a string specifying which team was selected in the table.
     */
    updateTree(row) {
        // ******* TODO: PART VII *******
		console.log("row",row);
		   let rownumber = row.key;

        let opponent = row.value.Opponent;
		console.log("opponent",opponent);



        let linkselected;
         let nodeselected;


        if (row.value.type === 'aggregate') {

            linkselected = d3.selectAll('.link').filter(function (d) {return d.data.Team === rownumber && d.data.Wins === "1"});

            nodeselected = d3.selectAll('.node text').filter(function (d) {return d.data.Team === rownumber});

        }

        else {

            linkselected = d3.selectAll('.link').filter(function (d) {return (d.data.Team === rownumber && d.data.Opponent === opponent) | (d.data.Team === opponent && d.data.Opponent === rownumber)});

            nodeselected = d3.selectAll('.node text')

                .filter(function (d) {

                    return (d.data.Team === rownumber && d.data.Opponent === opponent) | (d.data.Team === opponent && d.data.Opponent === rownumber)

                });

        }
		
		    linkselected.classed('selected', true);

        nodeselected.classed('selectedLabel', true);

    
    
    }

    /**
     * Removes all highlighting from the tree.
     */
    clearTree() {
        // ******* TODO: PART VII *******

        // You only need two lines of code for this! No loops! 
		       d3.selectAll('.link').classed('selected', false);

        d3.selectAll('.node text').classed('selectedLabel', false);
    }
}
