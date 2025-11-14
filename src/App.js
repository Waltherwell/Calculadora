import React, { useState } from 'react';
import './App.css';

function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecond) {
      setDisplay(String(digit));
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecond(false);
  };
  const apagarUltimo = () => {
  if (display.length === 1) {
    setDisplay('0');
  } else {
    setDisplay(display.slice(0, -1));
  }
};


  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstValue == null) {
      setFirstValue(inputValue);
    } else if (operator) {
      let result = 0;
      switch (operator) {
        case '+':
          result = firstValue + inputValue;
          break;
        case '-':
          result = firstValue - inputValue;
          break;
        case '*':
          result = firstValue * inputValue;
          break;
        case '/':
          result = inputValue === 0 ? 'Erro' : firstValue / inputValue;
          break;
        default:
          break;
      }
      setDisplay(String(result));
      setFirstValue(result === 'Erro' ? null : result);
    }

    setWaitingForSecond(true);
    setOperator(nextOperator === '=' ? null : nextOperator);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="button button-clear" onClick={clearDisplay}>C</button>
        <button className="button" onClick={apagarUltimo}>⌫</button>
        <button className="button" onClick={() => performOperation('/')}>÷</button>
        <button className="button" onClick={() => performOperation('*')}>×</button>
	      <button className="button" onClick={() => inputDigit(7)}>7</button>
        <button className="button" onClick={() => inputDigit(8)}>8</button>
        <button className="button" onClick={() => inputDigit(9)}>9</button>
        <button className="button" onClick={() => performOperation('-')}>−</button>
        <button className="button" onClick={() => inputDigit(4)}>4</button>
        <button className="button" onClick={() => inputDigit(5)}>5</button>
        <button className="button" onClick={() => inputDigit(6)}>6</button>
        <button className="button" onClick={() => performOperation('+')}>+</button>
        <button className="button" onClick={() => inputDigit(1)}>1</button>
        <button className="button" onClick={() => inputDigit(2)}>2</button>
        <button className="button" onClick={() => inputDigit(3)}>3</button>
        <button className="button button-equal" onClick={() => performOperation('=')}>=</button>
        <button className="button" onClick={() => inputDigit(0)}>0</button>
        <button className="button" onClick={() => inputDigit('.')}>.</button>
         <button className="button" onClick={() => inputDigit(',')}>,</button>
      </div>
    </div>
  );
}

export default Calculadora;
