import Calculator from "./containers/Calculator/Calculator";
import {useSelector} from "react-redux";
import {RootState} from "./rdx/store";
import cn from 'classnames';
import './App.css';
import {THEME} from "./rdx/theme";

const App = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <div className={cn({
            'theme-dark': theme === THEME.DARK,
            'theme-light': theme === THEME.LIGHT,
        })}>
            <Calculator />
        </div>
    )
};

export default App;
