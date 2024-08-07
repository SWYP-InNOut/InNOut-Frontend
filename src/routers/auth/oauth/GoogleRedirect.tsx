import useAuthStore from '@stores/auth';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const GoogleRedirect = () => {
  const query = useQuery();
  const token = query.get('token');
  const memberId = query.get('memberId');
  const imageId = query.get('imageId');
  const isActive = query.get('isActive') === 'true'; // 문자열 'true'를 불리언 값으로 변환
  const { storeProfile, settingIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(memberId, 1, token);
    if (memberId && token && isActive) {
      storeProfile(Number(memberId), Number(imageId), token);
      settingIsLoggedIn(true);
      navigate('/');
      console.log(memberId, Number(imageId), token);
    } else {
      storeProfile(Number(memberId), Number(imageId), token || '');
      navigate('/setting');
      console.log(memberId, Number(imageId), token);
    }
  }, [token, memberId, isActive]);

  return <></>;
};

export default GoogleRedirect;
