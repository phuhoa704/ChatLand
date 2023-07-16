import './App.css';
import { Routes, Route } from 'react-router-dom';
import { router } from './configs/router';
import Planning from './views/Planning';
import ToastMessage from './components/Toast';
import { getProfileMe } from './redux/apis/Auth';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { useEffect } from 'react';
import { LOCALSTORE } from './configs/constants';
import { saveToken } from './redux/slices/Auth';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";   
import 'primeicons/primeicons.css';
import Loading from './components/Loading';
import Payment from './views/Payment';
import Header from './components/Header';
import UserProfile from './views/UserProfile';
import UserInformation from './views/UserProfile/Information';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  useEffect(() => {
    if(localStorage.getItem(LOCALSTORE.TOKEN)) {
      dispatch(saveToken(localStorage.getItem(LOCALSTORE.TOKEN)));
    }
  },[])
  useEffect(() => {
    if(token) {
      dispatch(getProfileMe({}));
    }
  }, [token])
  return (
    <div className="App">
      <Loading />
      <ToastMessage />
      <Header />
      <Routes>
        <Route path={router.HOME} element={<Planning />} />
        <Route path={router.PAYMENT} element={<Payment />}/>
        <Route path={router.USER} element={<UserProfile />}/>
        <Route path={router.USER_INFORMATION} element={<UserInformation />}/>
      </Routes>
    </div>
  );
}

export default App;
