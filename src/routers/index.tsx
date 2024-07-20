import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Signup from '@routers/auth/signup/Signup';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<div />} />
        <Route path="signup" element={<Signup />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
