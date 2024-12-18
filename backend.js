let sliderValue = document.querySelector("#myRange");
let scaleValue = document.querySelector("#scale-value");
const grid = document.querySelector("#grid");
let flagRainbow = 0;
let flagEraser = 0;
let toggleGrid = document.querySelector("#grid-line");
let activeGrid = 1;
let flagDarken = 0;
let flagLighten = 0;
let colorInput = document.querySelector("#favcolor");
let color = colorInput.getAttribute("value");
let active = document.querySelector("#color-mode");
let darkLight = 0;
let isMouseDown = false;

function RGBToHex(rgb) {
    // Ensure it's only the rgb part (strip "rgba" or any alpha channel)
    rgb = rgb.replace(/rgba?\(/, "").split(")")[0]; 
    let [r, g, b] = rgb.split(/,\s*/).map(Number);

    // Convert to hex and pad with 0s if needed
    r = r.toString(16).padStart(2, "0");
    g = g.toString(16).padStart(2, "0");
    b = b.toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
}

function LightenDarkenColor(col, amt) {
    let usePound = col.startsWith("#");

    if (usePound) {
        col = col.slice(1);
    }

    let num = parseInt(col, 16);
    let r = Math.max(0, Math.min(255, (num >> 16) + amt));
    let g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    let b = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));

    return (usePound ? "#" : "") + 
           [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

// Event handler for 'mousedown' on grid
function onMouseDown(event) {
    // console.log("mouseDown click");
    if (event.target.classList.contains("block")) {
        isMouseDown = true;
        event.target.style.backgroundColor = flagRainbow
            ? `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
            : flagEraser
            ? "rgb(218, 218, 218)"
            : flagDarken
            ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), -20)
            : flagLighten
            ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), +10)
            : color;
    };
}

// Event handler for 'mouseover' on grid
function onMouseOver(event) {
    if (isMouseDown && event.target.classList.contains("block")) {
        event.target.style.backgroundColor = flagRainbow
            ? `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
            : flagEraser
            ? "rgb(218, 218, 218)"
            : flagDarken
            ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), -20)
            : flagLighten
            ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), +10)
            : color;
    };
}

// Event handler for 'mouseup' document-wide
function onMouseUp() {
    isMouseDown = false;
}

// Event handler for 'mousedown' to prevent default on grid
function onGridMouseDown(event) {
    event.preventDefault();
}


function createBlocks(n) {

    grid.removeEventListener("mousedown", onMouseDown);
    grid.removeEventListener("mouseover", onMouseOver);
    document.removeEventListener("mouseup", onMouseUp);
    grid.removeEventListener("mousedown", onGridMouseDown);

    // let grid = document.createElement("div");
    grid.innerHTML = "";
    colorInput = document.querySelector("#favcolor");
    color = colorInput.getAttribute("value");

    active.classList.remove("active");
    active = document.querySelector("#color-mode");
    active.classList.add("active");
    color = colorInput.value;
    flagRainbow = 0;
    flagEraser = 0;
    flagDarken = 0;
    flagLighten = 0;

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
            block.setAttribute("style", "flex: 1 1 auto;  border-top: 1px solid rgb(156, 156, 156); border-left: 1px solid rgb(156, 156, 156); background-color: rgb(218, 218, 218); aspect-ratio: 1");
            block.setAttribute("class", "block");
            if (i == (n-1)) {
                block.style.borderBottom = "1px solid rgb(156, 156, 156)";
            };
            if (j == (n-1)) {
                block.style.borderRight = "1px solid rgb(156, 156, 156)";
            };
            //#dadada
            row.appendChild(block);
        }
        grid.appendChild(row);
    }

    grid.addEventListener("mousedown", onMouseDown);
    grid.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseup", onMouseUp);
    grid.addEventListener("mousedown", onGridMouseDown);

    

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

    // grid.addEventListener("mousedown", (event) => {
    //     // console.log("clicked");
    //     if (event.target.classList.contains("block")) {
    //         isMouseDown = true;
    //         // console.log(event.target.style.backgroundColor);
    //         event.target.style.backgroundColor = flagRainbow
    //             ? `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    //             : flagEraser
    //             ? "rgb(218, 218, 218)"
    //             : flagDarken
    //             ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), -10)
    //             // ? console.log("dark activated")
    //             : flagLighten
    //             ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), 10)
    //             : color;
    //     }
    // });
    
    // grid.addEventListener("mouseover", (event) => {
    //     if (isMouseDown && event.target.classList.contains("block")) {
    //         event.target.style.backgroundColor = flagRainbow
    //         ? `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    //         : flagEraser
    //         ? "rgb(218, 218, 218)"
    //         : flagDarken
    //         ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), -10)
    //         : flagLighten
    //         ? LightenDarkenColor(RGBToHex(event.target.style.backgroundColor), 10)
    //         // ? console.log("dark activated")
    //         : color;
    //     }
    // });
    
    // document.addEventListener("mouseup", () => {
    //     isMouseDown = false;
    // });

    // document.addEventListener("mouseup", () => {
    //     isMouseDown = false;
    // });

    // grid.addEventListener("mousedown", (event) => event.preventDefault());

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
                flagDarken = 0;
                flagLighten = 0;
            }
            else if (el.getAttribute("id") == "rainbow-mode") {
                flagEraser - 0;
                flagDarken = 0;
                flagLighten = 0;
                flagRainbow = 1;
            }
            else if (el.getAttribute("id") == "eraser") {
                flagRainbow = 0;
                flagDarken = 0;
                flagLighten = 0;
                flagEraser = 1;
            }
            else if  (el.getAttribute("id") == "clear") {
                const blocks = document.querySelectorAll(".block");
                blocks.forEach((block) => {
                    block.style.backgroundColor = "rgb(218, 218, 218)";
                });
                active.classList.remove("active");
            }
            else if (el.getAttribute("id") == "shading-mode") {
                flagRainbow = 0;
                flagDarken = 1;
                flagLighten = 0;
                flagEraser = 0;
            }
            else if (el.getAttribute("id") == "lighting-mode") {
                flagRainbow = 0;
                flagDarken = 0;
                flagLighten = 1;
                flagEraser = 0;
            };



        });
    });

createBlocks(16);
sliderValue.addEventListener('change', () => {
    // console.log(sliderValue.value);
    createBlocks(parseInt(sliderValue.value));
    console.log(`Created a ${sliderValue.value}x${sliderValue.value} grid`);  
    scaleValue.textContent = `${sliderValue.value} x ${sliderValue.value}`;
    // console.log(scaleValue.textContent);
});







// createBlocks(1);
// createBlocks(16);
// console.log("Created a 16x16 grid");    
// createBlocks(24);
// createBlocks(60);

// let blocks = document.querySelectorAll(".block");

// blocks.forEach((el) => {
//     console.log("el");
//     el.addEventListener("mousedown", () => {
//         el.style.backgroundColor = "black";
//         console.log("clicked!");
//     });
// });
