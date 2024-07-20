import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Signup from '@routers/Auth/signup/Signup';
import Login from './Login/Login';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<div />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
