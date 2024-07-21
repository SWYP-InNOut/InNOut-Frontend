import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Signup from '@routers/auth/signup/Signup';
import Login from '@routers/Login/Login';
import PwdSearch from '@routers/PwdSearch/PwdSearch';
import MyHome from '@routers/home/MyHome';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<MyHome />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="pwdsearch" element={<PwdSearch />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
