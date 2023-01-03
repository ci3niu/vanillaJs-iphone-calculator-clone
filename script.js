// TODO 0.1 + 0.2 problem
// . messes up with spacing
// pressing = twice sometimes adds -

let total = 0;
let memory = '0';
let prevOperator;
let currOperator;

const screen = document.querySelector('.screen');
const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleClick(e.target.innerText);
	});
});

const handleClick = (value) => {
	isNaN(parseInt(value)) ? handleSymbol(value) : handleNumber(value);
};

const handleNumber = (number) => {
	if (memory.length === 9) return;
	if (memory === '-0') memory = memory.slice(0, 1);
	memory === '0' ? (memory = number) : (memory += number);

	updateScreen();
};

const handleSymbol = (symbol) => {
	let operationMemory = parseFloat(memory);

	const calculation = (operationMemory) => {
		if (memory === '0') return;
		if (currOperator === '+') total += operationMemory;
		if (currOperator === '-') total -= operationMemory;
		if (currOperator === '×') total *= operationMemory;
		if (currOperator === '÷') total /= operationMemory;
	};

	const handleMath = (symbol) => {
		total === 0 ? (total = operationMemory) : calculation(operationMemory);

		currOperator = symbol;
		memory = '0';
	};

	switch (symbol) {
		case 'AC':
		case 'C':
			memory = '0';
			total = 0;
			currOperator = null;
			break;
		case '+/-':
			if (memory === '0') screen.textContent = '-0';
			memory.includes('-') ? (memory = memory.substring(1)) : (memory = `-${memory}`);
			memory.length === 9 ? (screen.textContent = `-${memory}`) : (screen.textContent = `${memory}`);
			break;
		case '%':
			memory = parseFloat(memory);
			memory = memory * 0.01;
			memory = memory.toString();
			break;
		case '÷':
		case '×':
		case '-':
		case '+':
			handleMath(symbol);
			break;
		case '=':
			if (currOperator === null) return;
			calculation(parseFloat(memory));
			prevOperator = null;
			memory = total;
			total = 0;
			memory = memory.toString();
			break;
		case ',':
			memory.includes('.') ? null : (memory = `${memory}.`);
			break;
		default:
			break;
	}

	updateScreen();
};

const updateScreen = () => {
	memory.length >= 9 ? null : (screen.textContent = memory);
	memory === '0' ? (btns[0].textContent = 'AC') : (btns[0].textContent = 'C');

	const handleFontSize = () => {
		if (memory.length === 7) screen.style.fontSize = '4.85rem';
		if (memory.length === 8) screen.style.fontSize = '4.7rem';
		if (memory.length === 9) screen.style.fontSize = '4.55em';
		if (memory.length === 10) screen.style.fontSize = '4.4rem';
	};

	const handleSpacing = () => {
		if (memory.length === 5 && memory.includes('-')) screen.textContent = memory;
		if (memory.length === 5 && !memory.includes('-'))
			screen.textContent = `${memory.slice(0, 2)} ${memory.slice(2, 5)}`;

		if (memory.length === 6) screen.textContent = `${memory.slice(0, 3)} ${memory.slice(3, 6)}`;

		if (memory.length === 7) screen.textContent = `${memory.slice(0, 1)} ${memory.slice(1, 4)} ${memory.slice(4, 7)}`;
		if (memory.length === 7 && memory.includes('-')) screen.textContent = `${memory.slice(0, 4)} ${memory.slice(4, 7)}`;

		if (memory.length === 8) screen.textContent = `${memory.slice(0, 2)} ${memory.slice(2, 5)} ${memory.slice(5, 8)}`;

		if (memory.length === 9) screen.textContent = `${memory.slice(0, 3)} ${memory.slice(3, 6)} ${memory.slice(6, 9)}`;

		if (memory.length === 10) screen.textContent = `${memory.slice(0, 4)} ${memory.slice(4, 7)} ${memory.slice(7, 10)}`;
	};

	handleFontSize();
	handleSpacing();
};
