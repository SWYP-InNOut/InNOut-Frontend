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

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<div />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="pwdsearch" element={<PwdSearch />} />
        <Route path="setting" element={<NickNameSetting />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
