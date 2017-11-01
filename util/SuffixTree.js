class SuffixTreeNode {

    constructor() {
        this.value = '';
        this.index = 0;

        /**
         * @type {string[]}
         */
        this.leaves = [];

        /**
         * @type {SuffixTreeNode[]}
         */
        this.nodes = [];
    }

    /**     
     * @param {string} suffix 
     */
    addSuffix(suffix, index) {
        if (suffix.length === 0) {
            return;
        }

        let addedToExistingNode = this.checkNodes(suffix, index);

        if (!addedToExistingNode) {
            this.checkLeaves(suffix, index);
        }

    }

    /**     
     * @param {string} suffix
     * @param {number} index
     */
    checkNodes(suffix, index) {
        let node;
        for (let i = 0; i < this.nodes.length; i++) {
            node = this.nodes[i];
            if (node.value == suffix[0]) {
                node.addSuffix(suffix.slice(1), index + 1);
                return true;
            }
        }
        return false;
    }

    /**     
     * @param {string} suffix
     * @param {number} index
     */
    checkLeaves(suffix, index) {
        
        for (let i = 0; i < this.leaves.length; i++) {
            let leaf = this.leaves[i];
            if (leaf[0] === suffix[0]) {

                let node = new SuffixTreeNode();
                node.value = leaf[0];
                node.index = index;

                node.addSuffix(suffix.slice(1), index + 1);
                node.addSuffix(leaf.slice(1), index + 1);
                
                this.nodes.push(node);
                this.leaves.splice(i,1);
                return;
            }
        }

        this.leaves.push(suffix);
    }

    getLongestRepeatedSubString() {
        let str = '';
        
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].index; /*?*/

            let temp = this.nodes[i].getLongestRepeatedSubString();
            console.log(temp);
            if (temp.length > str.length) {
               str = temp;
            }
        }
        return this.value + str;
    }


    getLongestCycle() {
        
    }




    toHTML() {
        var html = "<div class=node>";
        
        if (this.value.length) {
            html += "<h3>"+this.value+"</h3>";
        }
        
        if (this.nodes.length) {
            html += "<h4>nodes</h4><ul>";
            for (var i = 0; i < this.nodes.length; i++) {
                html += "<li>" + this.nodes[i].toHTML() + "</li>";
            }
            html += "</ul>";
        }

        if (this.leaves.length) {
            html += "<h4>leaves</h4><ul>";
            for (var i = 0; i < this.leaves.length; i++) {
                html += "<li>" + this.leaves[i] + "</li>";
            }
           html += "</ul>";
        }

        return html;
    }

}

class SuffixTree {

    /**     
     * @param {string} str 
     */
    constructor(str) {
        this.node = new SuffixTreeNode();
        
        for (var i = 0; i < str.length; i++) {
            this.node.addSuffix(str.slice(i), i);
        }
    }
}


let suffixTree = new SuffixTree('mississippi');

console.log(JSON.stringify(suffixTree, null, 2));

console.log(suffixTree.node.getLongestRepeatedSubString());

// JSON.stringify(suffixTree, null, 2); /*?*/

// suffixTree.node.toHTML(); /*?*/

function unitFractionForDenominator(n) {
    return (1/n)
        .toString()
        .split('.')[1];
        // .split('')
        // .map(c => parseInt(c));
}

// let s = unitFractionForDenominator(7) + '$'; /*?*/
// let sTree = new SuffixTree(s);

// console.log(sTree.node.getLongestRepeatedSubString());

// console.log(JSON.stringify(sTree, null, 2));

let s6 = unitFractionForDenominator(6);
console.log(s6);

console.log('16 666 666 666 666 666');

let sTree6 = new SuffixTree(s6);
console.log(sTree6.node.getLongestRepeatedSubString());
console.log(JSON.stringify(sTree6, null, 2));
