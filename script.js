const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (type.value === "") {
        alert("Please select Credit or Debit");
        return;
    }

    const finalAmount =
        type.value === "credit"
            ? Number(amount.value)
            : -Number(amount.value);

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: finalAmount
    };

    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    form.reset();
});

// Render Transactions
function renderTransactions() {
    list.innerHTML = "";

    let total = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(function (t) {
        total += t.amount;

        if (t.amount > 0) {
            incomeTotal += t.amount;
        } else {
            expenseTotal += t.amount;
        }

        const li = document.createElement("li");

        li.classList.add(t.amount > 0 ? "plus" : "minus");

        const sign = t.amount > 0 ? "+" : "-";

        li.innerHTML = `
            ${t.text} 
            <span>${sign}$${Math.abs(t.amount)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button>
        `;

        list.appendChild(li);
    });

    balance.innerText = `$${total}`;
    income.innerText = `$${incomeTotal}`;
    expense.innerText = `$${Math.abs(expenseTotal)}`;
}

// Delete Transaction
function deleteTransaction(id) {
    transactions = transactions.filter(function (t) {
        return t.id !== id;
    });

    updateLocalStorage();
    renderTransactions();
}

// Save to LocalStorage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial Load
renderTransactions();
