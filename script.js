const incomeSection = document.querySelector('.income-section');
const expensesSection = document.querySelector('.expenses-section');
const availableMoney = document.querySelector('.available-money');
const addTransPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addTrans = document.querySelector('.add-transaction');
const btnCancel = document.querySelector('.cancel');
const btnDelete = document.querySelector('.delete');
const btnDelAll = document.querySelector('.delete-all');
const btnSave = document.querySelector('.save');

const btnLight = document.querySelector('.light');
const btnDark = document.querySelector('.dark');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
