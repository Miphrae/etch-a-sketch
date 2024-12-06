let sliderValue = document.querySelector("#myRange");
const grid = document.querySelector("#grid");

function createBlocks(n) {
    // let grid = document.createElement("div");
    grid.innerHTML = "";
    let colorInput = document.querySelector("#favcolor");
    let color = colorInput.getAttribute("value");

    let active = document.querySelector("#color-mode");

    colorInput.addEventListener('input', () => {
        color = colorInput.value;
    });

    let btn = document.querySelectorAll(".btn");
    btn.forEach((el) => {
        el.addEventListener('click', () => {
            active.classList.remove("active");
            active = el;
            active.classList.add("active");
        });
    });

    
    // console.log(color);
    for (let i = 0; i < n; i++) {
        let row = document.createElement("div");
        row.setAttribute("style", "display: flex; width: 100%; flex: 1 1 auto;")
        row.setAttribute("id", `row${i+1}`)
        for (let j = 0; j < n; j++) {
            let block = document.createElement("div");
            block.setAttribute("style", "flex: 1 1 auto;  border: 1px solid rgb(121, 121, 121); background-color: rgb(218, 218, 218); aspect-ratio: 1");
            block.setAttribute("class", "block");
            row.appendChild(block);
        }
        grid.appendChild(row);
    }

    let isMouseDown = false;

    const blocks = document.querySelectorAll(".block");
    blocks.forEach((el) => {
        el.addEventListener("mousedown", () => {
            // event.preventDefault(); --> potrzebowaloby argumentu event
            isMouseDown = true; // Start painting
            el.style.backgroundColor = color;
        });

        el.addEventListener("mouseover", () => {
            if (isMouseDown) {
                el.style.backgroundColor = color; 
            }
        });

        el.addEventListener("mouseup", () => {
            isMouseDown = false; 
        });
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    grid.addEventListener("mousedown", (event) => event.preventDefault());
}




createBlocks(16);
console.log("Created a 16x16 grid");    
createBlocks(24);

// let blocks = document.querySelectorAll(".block");

// blocks.forEach((el) => {
//     console.log("el");
//     el.addEventListener("mousedown", () => {
//         el.style.backgroundColor = "black";
//         console.log("clicked!");
//     });
// });