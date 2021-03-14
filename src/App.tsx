import React, {useCallback, useState} from 'react';
// @ts-ignore
import cn from 'classnames';
import './App.css';
import classes from "./App.module.css"

enum operations {
    plus,
    minus,
    divide,
    multiply
}


function App() {
    const [operation, setOperation] = useState(undefined)
    const [prev, setPrev] = useState('0');
    const [clearOnInput, setClearOnInput] = useState(true);
    const [num, setNum] = useState('0');

    const click = useCallback((n) => {
        if (clearOnInput) {
            if (num !== '0') {
                setPrev(num);
            }
            setNum(n);
            setClearOnInput(false);
        } else {
            setNum(`${num}${n}`);
        }
    }, [num]);

    const handleAc = useCallback(() => {
        setNum('0');
        setClearOnInput(true);
    }, []);

    const handleOperation = useCallback((op) => {
        setOperation(op);
        setPrev(num);
        setClearOnInput(true);
    }, []);

    const handleEquals = useCallback(() => {
        if (!operation || !prev) {
            return false;
        }
        switch (operation) {
            case operations.multiply:
                 setNum(prev) *
                break;
        }
    }, [operation, prev]);

    return (
        <div className="App">
            <div className={classes.root}>
                <div className={classes.result}>{num}</div>
                <div className={classes.row}>
                    <div className={cn(classes.row, classes.flex3)}>
                        <div className={cn(classes.button, classes.grayButton)} onClick={handleAc}>AC</div>
                        <div className={cn(classes.button, classes.grayButton)}>+/-</div>
                        <div className={cn(classes.button, classes.grayButton)}>%</div>
                        <div className={classes.button} onClick={() => click(7)}>7</div>
                        <div className={classes.button} onClick={() => click(8)}>8</div>
                        <div className={classes.button} onClick={() => click(9)}>9</div>
                        <div className={classes.button} onClick={() => click(4)}>4</div>
                        <div className={classes.button} onClick={() => click(5)}>5</div>
                        <div className={classes.button} onClick={() => click(6)}>6</div>
                        <div className={classes.button} onClick={() => click(1)}>1</div>
                        <div className={classes.button} onClick={() => click(2)}>2</div>
                        <div className={classes.button} onClick={() => click(3)}>3</div>
                        <div className={classes.button} onClick={() => click(0)}>0</div>
                        <div className={classes.button} onClick={() => click('i')}>i</div>
                        <div className={classes.button} onClick={() => click('.')}>.</div>
                    </div>
                    <div className={cn(classes.flex1, classes.row)}>
                        <div className={cn(classes.button, classes.yellowButton)}
                             onClick={() => handleOperation(operations.divide)}>÷</div>
                        <div className={cn(classes.button, classes.yellowButton)}
                             onClick={() => handleOperation(operations.multiply)}>×</div>
                        <div className={cn(classes.button, classes.yellowButton)}
                             onClick={() => handleOperation(operations.minus)}>‒</div>
                        <div className={cn(classes.button, classes.yellowButton)}
                             onClick={() => handleOperation(operations.plus)}>+</div>
                        <div className={cn(classes.button, classes.yellowButton)}
                             onClick={handleEquals}>=</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
