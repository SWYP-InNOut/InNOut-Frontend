import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GoogleRedirect = () => {
  const { code } = useParams<{ code: string }>();

  useEffect(() => {}, [code]);

  return <></>;
};

export default GoogleRedirect;
