let sliderValue = document.querySelector("#myRange");
const grid = document.querySelector("#grid");

function createBlocks(n) {
    // let grid = document.createElement("div");
    for (let i = 0; i < n; i++) {
        let row = document.createElement("div");
        row.setAttribute("style", "display: flex; width: 100%; flex: 1 1 auto;")
        row.setAttribute("id", `row${i+1}`)
        for (let j = 0; j < n; j++) {
            let block = document.createElement("div");
            block.setAttribute("style", "flex: 1 1 auto;  border: 1px solid black; background-color: white; aspect-ratio: 1");
            row.appendChild(block);
        }
        grid.appendChild(row);
    }
}

createBlocks(16);
console.log("Created a 16x16 grid");    