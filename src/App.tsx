import './App.css';
import Header from './components/features/Header';
import { Outlet } from 'react-router';

function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;
