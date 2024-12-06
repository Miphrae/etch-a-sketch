let sliderValue = document.querySelector("#myRange");
const grid = document.querySelector("#grid");
let flagRainbow = 0;
let flagEraser = 0;
let toggleGrid = document.querySelector("#grid-line");
let activeGrid = 1;
let colorInput = document.querySelector("#favcolor");
let color = colorInput.getAttribute("value");
let active = document.querySelector("#color-mode");


function createBlocks(n) {
    // let grid = document.createElement("div");
    grid.innerHTML = "";
    colorInput = document.querySelector("#favcolor");
    color = colorInput.getAttribute("value");
    active = document.querySelector("#color-mode");

    colorInput.addEventListener('input', () => {
        if (active == document.querySelector("#color-mode")) {
            color = colorInput.value;
        };
    });
    
    // console.log(color);
    for (let i = 0; i < n; i++) {
        let row = document.createElement("div");
        row.setAttribute("style", "display: flex; width: 100%; flex: 1 1 auto;")
        row.setAttribute("id", `row${i+1}`)
        for (let j = 0; j < n; j++) {
            let block = document.createElement("div");
            block.setAttribute("style", "flex: 1 1 auto;  border: 1px solid rgb(156, 156, 156); background-color: rgb(218, 218, 218); aspect-ratio: 1");
            block.setAttribute("class", "block");
            row.appendChild(block);
        }
        grid.appendChild(row);
    }

    let isMouseDown = false;

    // blocks.forEach((el) => {
    //     // console.log("Click event triggered!");
    //     el.addEventListener("mousedown", () => {
    //         // event.preventDefault(); --> potrzebowaloby argumentu event
    //         isMouseDown = true; // Start painting
    //         if (flagRainbow) {
    //             let randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    //             color = `#${randomColor}`;
    //         }
    //         else if (flagEraser) {
    //             color = "rgb(218, 218, 218)";
    //         };
    //         el.style.backgroundColor = color;
    //     });

    //     el.addEventListener("mouseover", () => {
    //         if (isMouseDown) {
    //             if (flagRainbow) {
    //                 let randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    //                 color = `#${randomColor}`;
    //             }
    //             else if (flagEraser) {
    //                 color = "rgb(218, 218, 218)";
    //             };
    //             el.style.backgroundColor = color; 
    //         }
    //     });

    //     el.addEventListener("mouseup", () => {
    //         isMouseDown = false; 
    //     });
    // });

    grid.addEventListener("mousedown", (event) => {
        if (event.target.classList.contains("block")) {
            isMouseDown = true;
            event.target.style.backgroundColor = flagRainbow
                ? `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
                : flagEraser
                ? "rgb(218, 218, 218)"
                : color;
        }
    });
    
    grid.addEventListener("mouseover", (event) => {
        if (isMouseDown && event.target.classList.contains("block")) {
            event.target.style.backgroundColor = flagRainbow
                ? `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
                : flagEraser
                ? "rgb(218, 218, 218)"
                : color;
        }
    });
    
    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    grid.addEventListener("mousedown", (event) => event.preventDefault());

}

let btn = document.querySelectorAll(".btn");
    btn.forEach((el) => {
        el.addEventListener('click', () => {
            if (el.getAttribute("id") == "grid-line") {
                const blocks = document.querySelectorAll(".block");
                if (activeGrid) {
                    toggleGrid.classList.remove("active");
                    // console.log("removed active");
                }
                else {
                    toggleGrid.classList.add("active");
                    // console.log("added active");
                };

                blocks.forEach((block) => {
                    if (activeGrid) {
                        block.style.border = "none";
                        // console.log("grid off");
                    }
                    else {
                        block.style.border = "0.5px solid rgb(121, 121, 121)";
                        // console.log("grid on");
                    };
                });
                activeGrid = !activeGrid;
            }
            else {
                active.classList.remove("active");
                active = el;
                active.classList.add("active");
            };


            if (el.getAttribute("id") == "color-mode") {
                active = document.querySelector("#color-mode");
                color = colorInput.value;
                flagRainbow = 0;
                flagEraser = 0;
            }
            else if (el.getAttribute("id") == "rainbow-mode") {
                flagEraser - 0;
                flagRainbow = 1;
            }
            else if (el.getAttribute("id") == "eraser") {
                flagRainbow = 0;
                flagEraser = 1;
            }
            else if  (el.getAttribute("id") == "clear") {
                const blocks = document.querySelectorAll(".block");
                blocks.forEach((block) => {
                    block.style.backgroundColor = "rgb(218, 218, 218)";
                });
                active.classList.remove("active");
            };



        });
    });




createBlocks(16);
console.log("Created a 16x16 grid");    
createBlocks(24);
createBlocks(60);

// let blocks = document.querySelectorAll(".block");

// blocks.forEach((el) => {
//     console.log("el");
//     el.addEventListener("mousedown", () => {
//         el.style.backgroundColor = "black";
//         console.log("clicked!");
//     });
// });