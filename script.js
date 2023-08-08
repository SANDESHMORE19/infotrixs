// Get references to elements and buttons
let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";

// Convert NodeList to an array
let arr = Array.from(buttons);

// Add event listeners to buttons
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML === '=') {
            try {
                let originalExpression = string; // Store the original input expression
                string = eval(string);
                input.value = string;
                saveToHistory(originalExpression); // Pass the original expression to the history
            } catch (error) {
                input.value = "Error";
            }
        } else if (e.target.innerHTML === 'AC') {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML === 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});

function saveToHistory(originalExpression) {
    try {
        let calculatorHistory = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
        calculatorHistory.push({ input: originalExpression, string: eval(string) });
        localStorage.setItem("calculatorHistory", JSON.stringify(calculatorHistory));
        displayHistory();
    } catch (error) {
        input.value = "Error";
    }
}

function displayHistory() {
    try {
        let calculatorHistory = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
        const historyList = document.getElementById("historyList");
        historyList.innerHTML = "";

        calculatorHistory.forEach((calculation, index) => {
            const li = document.createElement("li");
            li.textContent = `${calculation.input} = ${calculation.string}`;
            historyList.appendChild(li);
        });
    } catch (error) {
        input.value = "Error";
    }
}

// Display initial history
displayHistory();
