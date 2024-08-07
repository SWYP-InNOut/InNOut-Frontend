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
import NickNameChange from '@routers/home/homemenu/NickNameChange';
import PwdChange from '@routers/home/homemenu/PwdChange';
import useAuthStore from '@stores/auth';
import Error from '@routers/error/Error';
import KakaoRedirect from '@routers/auth/oauth/KakaoRedirect';
import Introduce from '@routers/home/introduce/Introduce';
import OthersStuffList from '@routers/home/homemenu/OthersStuffList';
import GoogleRedirect from './auth/oauth/GoogleRedirect';
import { lazy, Suspense } from 'react';
import LoadingBall from '@components/common/loading/LoadingBall';

const Post = lazy(() => import('@routers/home/post/Post'));
const MyHome = lazy(() => import('@routers/home/MyHome'));
const Detail = lazy(() => import('@routers/home/detail/Detail'));

const ProtectedRoute = () => {
  const isLoggedin = useAuthStore((store) => store.isLoggedIn);
  const isAnonymous = localStorage.getItem('anonymousToken');

  if (window.location.search.includes('anonymousToken') || isAnonymous) {
    console.log('익명 로그인');
    return <Outlet />;
  }

  if (!isLoggedin) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
};

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ProtectedRoute />}>
          <Route path="pwd" element={<PwdChange />} />
          <Route
            path="post"
            element={
              <Suspense fallback={<LoadingBall />}>
                <Post />
              </Suspense>
            }
          />
          <Route path="nickname" element={<NickNameChange />} />
          <Route
            path="others-home"
            element={
              <Suspense fallback={<LoadingBall />}>
                <OthersStuffList />
              </Suspense>
            }
          />
          <Route
            path="detail/:postId"
            element={
              <Suspense fallback={<LoadingBall />}>
                <Detail />
              </Suspense>
            }
          />
          <Route
            index
            element={
              <Suspense fallback={<LoadingBall />}>
                <MyHome />
              </Suspense>
            }
          />
          <Route
            path="other/:ownerId"
            element={
              <Suspense fallback={<LoadingBall />}>
                <MyHome />
              </Suspense>
            }
          />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="setting" element={<NickNameSetting />} />
        <Route path="login" element={<Login />} />
        <Route path="pwdsearch" element={<PwdSearch />} />
        <Route path="error" element={<Error />} />
        <Route path="kakaologin/callback" element={<KakaoRedirect />} />
        <Route path="/oauth-callback" element={<GoogleRedirect />} />
        <Route
          path="introduce"
          element={
            <Suspense fallback={<LoadingBall />}>
              <Introduce />
            </Suspense>
          }
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
