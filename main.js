const DOM = {
    "problems": document.getElementById("problems"),
    "submit": document.getElementById("calc"),
    "inst": document.getElementById("instructions"),
    "toggle": document.getElementById("showinst")
};

DOM.toggle.onclick = () => {
    if (DOM.inst.style.display == "none") {
        DOM.inst.style.display = "";
        DOM.toggle.innerText = "Hide instructions";
    } else {
        DOM.inst.style.display = "none";
        DOM.toggle.innerText = "Show instructions";
    }
};

DOM.submit.onclick = () => {
    DOM.submit.disabled = true;
    let problems = DOM.problems.value.toLowerCase().trim().split(", "); // [ "5-61 eoo", "62", "67" ]
    let totalProblems = 0;
    let probStr = "";
    let addProblem = (num) => {
        ++totalProblems;
        if (probStr.length == 0) probStr += num; else probStr += ", " + num;
    };
    for (let i of problems) {
        if (i.indexOf("-") == -1) addProblem(i); else {
            let start = parseInt(i.split("-")[0]);
            let end = parseInt(i.split("-")[1].split(" ")[0]);
            if (isNaN(start) || isNaN(end)) {
                window.alert("Unknown number: " + (isNaN(start) ? start : end));
                window.location.reload();
                return;
            }
            let operator = i.split(" ")[1] ?? "all";
            switch (operator) {
                case "eoo": {
                    let add = true;
                    for (let i = start; i <= end; ++i) {
                        if (i % 2 != 0) {
                            if (add) addProblem(i);
                            add = !add;
                        }
                    }
                    break;
                }
                case "odds":
                case "(pick": {
                    for (let i = start; i <= end; ++i) {
                        if (i % 2 != 0) addProblem(i);
                    }
                    break;
                }
                case "evens": {
                    for (let i = start; i <= end; ++i) {
                        if (i % 2 == 0) addProblem(i);
                    }
                    break;
                }
                case "all": {
                    for (let i = start; i <= end; ++i) addProblem(i);
                    break;
                }
                default: {
                    window.alert("Unknown operator: " + operator);
                    window.location.reload();
                    return;
                }
            }
        }
    }
    document.getElementById("card-body").innerHTML = `<b>Total: ${totalProblems}</b><br /><br />Problems: ${probStr}`;
};
window.onload = () => {
    DOM.submit.disabled = false;
};
