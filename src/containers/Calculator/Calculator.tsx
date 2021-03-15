import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import { getHistoryFromLs, push } from '../../rdx/history';
import { toggle } from '../../rdx/theme';
import {RootState} from "../../rdx/store";
import Button from "../../components/Button";
import classes from "./Calculator.module.css"

enum Operations {
    plus,
    minus,
    divide,
    multiply
}

const symbols = {
    [Operations.multiply]: '*',
    [Operations.minus]: '-',
    [Operations.plus]: '+',
    [Operations.divide]: '/',
}

const dbuttons = [7,8,9,4,5,6,1,2,3,0];

function Calculator() {
    const [num, setNum] = useState<string>('0');
    const [prev, setPrev] = useState<string>('0');
    const [operation, setOperation] = useState<Operations>()
    const [clearOnInput, setClearOnInput] = useState<boolean>(true);
    const [historyMode, setHistoryMode] = useState<boolean>(false);
    const dispatch = useDispatch();

    const { history } = useSelector((state: RootState)  => state.history);

    useEffect(() => {
        dispatch(getHistoryFromLs());
    }, [dispatch])

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
    }, [num, clearOnInput]);

    const handleAc = useCallback(() => {
        setNum('0');
        setPrev('0');
        setClearOnInput(true);
    }, []);

    const calculate = useCallback((op) => {
        if (operation === undefined || !prev) {
            return false;
        }

        let result;
        let nprev: number = Number(prev);
        let nnum: number = Number(num);
        switch (operation) {
            case undefined:
                break;
            case Operations.multiply:
                result = nprev * nnum;
                break;
            case Operations.divide:
                result = nprev / nnum;
                break;
            case Operations.plus:
                result = nprev + nnum;
                break;
            case Operations.minus:
                result = nprev - nnum;
                break;
            default:
                break;
        }
        const newNum = String(result);
        setNum(newNum);

        dispatch(push(`${nprev} ${symbols[operation]} ${nnum} = ${newNum}`));
    }, [operation, prev, num, dispatch, push]);

    const handleEquals = useCallback((op) => {
        calculate(op);
        setOperation(undefined);
    }, [calculate]);

    const handlePlusMinus = useCallback(() => {
        setNum(String(-Number(num)));
    }, [num]);

    const handleOperation = useCallback((op) => {
        if (operation !== undefined) {
            calculate(op);
        }
        setOperation(op);
        setPrev(num);
        setClearOnInput(true);
    }, [num, operation, calculate]);

    const toggleTheme = useCallback(() => {
        dispatch(toggle());
    }, [dispatch]);

    if (historyMode) {
        return (
            <div className="App">
                <div className={classes.root}>
                    <div>
                        {history.map(item => (
                            <div key={item}>
                                {item}
                            </div>
                        ))}
                        <Button onClick={() => setHistoryMode(false)}>{'<'}</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            <div className={classes.root}>
                <div className={classes.result}>{num}</div>
                <div className={classes.row}>
                    <div className={cn(classes.row, classes.flex3)}>
                        <Button
                            className={classes.grayButton}
                            onClick={handleAc}
                        >
                            Ac
                        </Button>
                        <Button
                            className={classes.grayButton}
                            onClick={handlePlusMinus}
                        >
                            +/-
                        </Button>
                        <Button className={classes.grayButton}>%</Button>
                        {
                            dbuttons.map((db) => (
                                <Button onClick={() => click(db)}>{db}</Button>
                            ))
                        }
                        <Button onClick={() => setHistoryMode(true)}>i</Button>
                        <Button onClick={() => click('.')}>.</Button>
                        <Button onClick={toggleTheme}>l/d</Button>
                    </div>
                    <div className={cn(classes.flex1, classes.row)}>
                        <Button
                            className={classes.yellowButton}
                            onClick={() => handleOperation(Operations.divide)}
                        >
                            ÷
                        </Button>
                        <Button
                            className={classes.yellowButton}
                            onClick={() => handleOperation(Operations.multiply)}
                        >
                            x
                        </Button>
                        <Button
                            className={classes.yellowButton}
                            onClick={() => handleOperation(Operations.minus)}
                        >
                            -
                        </Button>
                        <Button
                            className={classes.yellowButton}
                            onClick={() => handleOperation(Operations.plus)}
                        >
                            +
                        </Button>
                        <Button
                            className={classes.yellowButton}
                            onClick={handleEquals}
                        >
                            =
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Calculator;
