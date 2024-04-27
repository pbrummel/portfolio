var materialSelection;
var current;

// Several functions to display the current material selection on page
function selectBrick(clicked) {
    materialSelection = "Brick";
    current = document.getElementById("currentOutput");
    current.innerHTML = "Current selection:";
    current.innerHTML += "  " + clicked;
}

function selectStucco(clicked) {
    materialSelection = "Stucco";
    current = document.getElementById("currentOutput");
    current.innerHTML = "Current selection:";
    current.innerHTML += "  " + clicked;
}

function selectStone(clicked) {
    materialSelection = "Stone";
    current = document.getElementById("currentOutput");
    current.innerHTML = "Current selection:";
    current.innerHTML += "  " + clicked;
}

function selectVinyl(clicked) {
    materialSelection = "Vinyl";
    current = document.getElementById("currentOutput");
    current.innerHTML = "Current selection:";
    current.innerHTML += "  " + clicked;
}

function selectWood(clicked) {
    materialSelection = "Wood";
    current = document.getElementById("currentOutput");
    current.innerHTML = "Current selection:";
    current.innerHTML += "  " + clicked;
}

// Function to factor in selections and determine estimate cost
const getEstimate = () => {
    let storySelection = document.getElementsByTagName("input");
    let squareFeet = document.getElementById("sqft");
    let colorChoice = document.getElementById("colorSelection");
    let garageNumber = document.getElementById("garage");
    let garageSelection = garageNumber.options[garageNumber.selectedIndex].value;
    var storedValue;
    var garageTotal;
    var storyOutput;
    var materialOutput;
    let totalCost = 0;

    // Determine story selection
    for (i = 0 ; i < storySelection.length; i++) {
        if (storySelection[i].type="radio") {
            if (storySelection[i].checked) {
                storedValue = storySelection[i].value;
            }
        }
    }

    // Determine cost of story selection
    if (storedValue === "Single") {
        totalCost = totalCost + (175 * squareFeet.value);
        storyOutput = "  @ $175/square foot<br />";
    } else {
          totalCost = totalCost + (135 * squareFeet.value);
          storyOutput = "  @ $135/square foot<br />";
    }

    // Determine cost of material selection
    if (materialSelection === "Brick") {
        totalCost = totalCost + 8000 + (10 * squareFeet.value);
        materialOutput = "  @ $8000 + $10/square foot";
    }

    if (materialSelection === "Stucco") {
        totalCost = totalCost + 6000;
        materialOutput = "  @ $6000";
    }

    if (materialSelection === "Stone") {
        totalCost = totalCost + 16000;
        materialOutput = "  @ $16000";
    }

    if (materialSelection === "Vinyl") {
        totalCost = totalCost;
        materialOutput = "  @ (no fee)";
    }

    if (materialSelection === "Wood") {
        totalCost = totalCost + 5000 + (10 * squareFeet.value);
        materialOutput = "  @ $5000 + $10/square foot";
    }

    // Determine cost of material selection
    garageTotal = garageSelection * 15000;

    // Factor in updated cost
    totalCost = totalCost + garageTotal

    // Output the results to the webpage
    document.body.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerHTML = "Here's Your Estimate Summary:";
    let hr = document.createElement("hr");
    let br = document.createElement("br");
    hr.setAttribute("id", "printHR")
    let ul = document.createElement("ul");
    let li1 = document.createElement("li");
    let li4 = document.createElement("li");
    li4.innerHTML = "Square Footage: " + squareFeet.value + "ft";
    li1.innerHTML = "Story Selection: " + storedValue + storyOutput;
    let li2 = document.createElement("li");
    li2.innerHTML = "Color Selection: " + colorChoice.value +  "  @ (no fee)";
    let li3 = document.createElement("li");
    li3.innerHTML = "Material Selection: " + materialSelection + materialOutput;
    let li5 = document.createElement("li");
    li5.innerHTML = "Garage Size (# of vehicles): " + garageSelection + "  @ $15,000/car";
    let li6 = document.createElement("li");
    li6.innerHTML = "------------------------------------------------------------"

    let li7 = document.createElement("li");
    li7.innerHTML = "Total Estimated Cost:  $" + totalCost;

    h1.appendChild(hr);
    h1.appendChild(br);
    ul.appendChild(li4);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li5);
    ul.appendChild(li6);
    ul.appendChild(li7);
    h1.appendChild(ul)
    document.body.appendChild(h1);
}
