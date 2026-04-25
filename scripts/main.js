const themeToggleButton = document.getElementById("themeToggle");
const calculateButton = document.getElementById("calculateBtn");

function getValue(id) {
    return parseFloat(document.getElementById(id).value) || 0;
}

function updateThemeButtonText() {
    const isDarkTheme = document.body.classList.contains("dark-theme");
    themeToggleButton.textContent = isDarkTheme ? "Светлая тема" : "Тёмная тема";
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem("budgetTheme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
    updateThemeButtonText();
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDarkTheme = document.body.classList.contains("dark-theme");
    localStorage.setItem("budgetTheme", isDarkTheme ? "dark" : "light");
    updateThemeButtonText();
}

function calculateBudget() {
    const income = getValue("incomeMain") + getValue("incomeExtra");

    const expenses =
        getValue("expenseHousing") +
        getValue("expenseFood") +
        getValue("expenseTransport") +
        getValue("expenseUtilities") +
        getValue("expenseFun") +
        getValue("expenseOther");

    const courtExpenses =
        getValue("courtFee") +
        getValue("lawyerFee") +
        getValue("courtOther");

    const totalExpenses = expenses + courtExpenses;
    const balance = income - totalExpenses;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <strong>Общий доход:</strong> ${income.toLocaleString()} руб.<br>
        <strong>Общие расходы:</strong> ${totalExpenses.toLocaleString()} руб.<br>
        <strong>В том числе судебные:</strong> ${courtExpenses.toLocaleString()} руб.<br>
        <hr>
        <strong>Баланс:</strong> ${balance.toLocaleString()} руб.
    `;

    if (balance < 0) {
        resultDiv.classList.add("negative");
    } else {
        resultDiv.classList.remove("negative");
    }
}

themeToggleButton.addEventListener("click", toggleTheme);
calculateButton.addEventListener("click", calculateBudget);
applySavedTheme();
