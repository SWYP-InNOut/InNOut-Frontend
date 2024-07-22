import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Signup from '@routers/auth/signup/Signup';
import Login from '@routers/login/Login';
import PwdSearch from '@routers/pwdSearch/PwdSearch';
import NickNameSetting from './nickname/NickNameSetting';
import MyHome from '@routers/home/MyHome';
import NickNameChange from './home/NickNameChange';
import PwdChange from './home/PwdChange';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<MyHome />} />
        <Route path="nickname" element={<NickNameChange />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="pwdsearch" element={<PwdSearch />} />
        <Route path="setting" element={<NickNameSetting />} />
        <Route path="pwd" element={<PwdChange />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
