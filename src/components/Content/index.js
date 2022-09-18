import {Routes, Route, Navigate} from 'react-router-dom';
import {HomePage} from '../../pages/HomePage';
import {LoginPage} from '../../pages/LoginPage';
import './index.scss'

export function Content() {
    const username = localStorage.getItem('username');
    return (
        <>
            {
                username ?
                    <Routes>
                        <Route path='/home' element={<HomePage/>}/>
                        <Route path='*' element={<Navigate to='/home' replace/>}/>
                    </Routes> :
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path='*' element={<Navigate to='/login' replace/>}/>
                    </Routes>
            }
        </>
    )
}
