// Load existing data from localStorage if available
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;

const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to update localStorage with current expenses array
function updateLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses from localStorage
function renderExpenses() {
  expenseTableBody.innerHTML = ''; // Clear previous content
  totalAmount = 0;

  expenses.forEach((expense) => {
    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
      // Remove expense from local array
      expenses = expenses.filter((e) => e !== expense);
      // Update localStorage
      updateLocalStorage();
      // Update total amount
      if (expense.category === 'Income') {
        totalAmount -= expense.amount;
      } else if (expense.category === 'Expense') {
        totalAmount += expense.amount;
      }
      totalAmountCell.textContent = totalAmount;
      // Update UI
      renderExpenses();
    });

    deleteCell.appendChild(deleteBtn);

    // Update total amount
    if (expense.category === 'Income') {
      totalAmount += expense.amount;
    } else if (expense.category === 'Expense') {
      totalAmount -= expense.amount;
    }
  });

  totalAmountCell.textContent = totalAmount;
}

// Event listener for Add button
addBtn.addEventListener('click', function () {
  const category = categorySelect.value;
  const info = infoInput.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!category || isNaN(amount) || amount <= 0 || !info || !date) {
    alert('Please fill out all fields correctly.');
    return;
  }

  // Add new expense to local array
  expenses.push({
    category,
    amount,
    info,
    date,
  });

  // Update localStorage
  updateLocalStorage();

  // Update total amount
  if (category === 'Income') {
    totalAmount += amount;
  } else if (category === 'Expense') {
    totalAmount -= amount;
  }

  // Update UI
  renderExpenses();

  // Clear input fields
});

// Initial rendering on page load
renderExpenses();
