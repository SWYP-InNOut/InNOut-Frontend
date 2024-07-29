import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Signup from '@routers/auth/signup/Signup';
import Login from '@routers/auth/login/Login';
import PwdSearch from '@routers/auth/pwdsearch/PwdSearch';
import NickNameSetting from '@routers/auth/nickname/NickNameSetting';
import MyHome from '@routers/home/MyHome';
import NickNameChange from '@routers/home/homemenu/NickNameChange';
import PwdChange from '@routers/home/homemenu/PwdChange';
import Post from '@routers/home/post/Post';
import useAuthStore from '@stores/auth';
import Detail from '@routers/home/detail/Detail';
import Error from '@routers/error/Error';
import KakaoRedirect from '@components/auth/KakaoRedirect';
import Introduce from '@routers/home/introduce/Introduce';
import OthersHomeList from '@routers/home/homemenu/OthersHomeList';

const ProtectedRoute = () => {
  const isLoggedin = useAuthStore((store) => store.isLoggedIn);

  if (!isLoggedin) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
};

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<MyHome />} />
        <Route path="*" element={<ProtectedRoute />}>
          <Route path="pwdsearch" element={<PwdSearch />} />
          <Route path="setting" element={<NickNameSetting />} />
          <Route path="pwd" element={<PwdChange />} />
          <Route path="post" element={<Post />} />
          <Route path="nickname" element={<NickNameChange />} />
          <Route path="others-home" element={<OthersHomeList />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="detail/:postId" element={<Detail />} />
        <Route path="error" element={<Error />} />
        <Route path="kakaologin/callback" element={<KakaoRedirect />} />
        <Route path="introduce" element={<Introduce />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
