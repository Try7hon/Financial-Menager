const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addTransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteAllBtn = document.querySelector('.delete-all');

const lightStyleBtn = document.querySelector('.light');
const darkStyleBtn = document.querySelector('.dark');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
let moneyArrIn = [0];
let moneyArrOuts = [0];

let incomeBalance;
let outsBalance;

const showPanel = () => {
	addTransactionPanel.style.display = 'flex';
};

const closePanel = () => {
	addTransactionPanel.style.display = 'none';
	clearInputs();
};

const checkForm = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
		createNewTransaction();
	} else {
		alert('Uzupełnij wszystkie pola!');
	}
};

const clearInputs = () => {
	nameInput.value = '';
	amountInput.value = '';
	categorySelect.selectedIndex = 0;
};

const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);
	checkCategory(selectedCategory);

	categorySelect.value === 'income'
		? moneyArrIn.push(Number(amountInput.value)) &&
		  incomeSection.appendChild(newTransaction) &&
		  newTransaction.classList.add('income')
		: moneyArrOuts.push(Math.abs(Number(amountInput.value))) &&
		  expensesSection.appendChild(newTransaction) &&
		  newTransaction.classList.add('expense');

	const amount =
		categorySelect.value === 'income'
			? `${amountInput.value}`
			: `${Math.abs(amountInput.value)}` && `${amountInput.value}`;

	newTransaction.innerHTML = `
        <p class="transaction-name">
        ${categoryIcon} ${nameInput.value}
        </p>
        <p class="transaction-amount">
        ${amount} zł 
        <button class="delete" onclick="deleteTransatcion(${ID})"><i class="fas fa-times"></i></button>
        </p>
    `;

	moneyArr = moneyArrIn.concat(moneyArrOuts);
	countMoney(moneyArr);
	closePanel();
	ID++;
	clearInputs();
};

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const checkCategory = transaction => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>';
			break;
		case '[ - ] Kino':
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
	}
};

const countMoney = () => {
	incomeBalance = moneyArrIn.reduce((acc, move) => acc + move, 0);
	outsBalance = moneyArrOuts.reduce((acc, move) => acc - move, 0);

	const newMoney = incomeBalance + outsBalance;
	availableMoney.textContent = `${newMoney} zł`;
};

const deleteTransatcion = id => {
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);
	const indexOfTransactionIns = moneyArrIn.indexOf(transactionAmount);
	const indexOfTransactionOuts = moneyArrOuts.indexOf(transactionAmount);

	moneyArr.splice(indexOfTransaction, 1);

	transactionToDelete.classList.contains('income')
		? incomeSection.removeChild(transactionToDelete) && moneyArrIn.splice(indexOfTransactionIns, 1)
		: expensesSection.removeChild(transactionToDelete) && moneyArrOuts.splice(indexOfTransactionOuts, 1);

	countMoney();
};

const deleteAllTransaction = () => {
	incomeSection.innerHTML = '<h3>Przychód:</h3>';
	expensesSection.innerHTML = '<h3>Wydatki</h3>';
	availableMoney.textContent = '0 zł';
	moneyArr = [0];
};

const changeStyleToLight = () => {
	root.style.setProperty('--first-color', '#f9f9f9');
	root.style.setProperty('--second-color', '#14161F');
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2)');
};
const changeStyleToDark = () => {
	root.style.setProperty('--first-color', '#14161F');
	root.style.setProperty('--second-color', '#f9f9f9');
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.4)');
};

lightStyleBtn.addEventListener('click', changeStyleToLight);
darkStyleBtn.addEventListener('click', changeStyleToDark);
addTransactionBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransaction);
