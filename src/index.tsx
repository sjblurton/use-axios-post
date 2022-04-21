import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

type Status = 'idle' | 'pending' | 'success' | 'error';

function useAxiosPost<D>(): [
  Status,
  React.Dispatch<React.SetStateAction<AxiosRequestConfig<D> | undefined>>,
  AxiosError | undefined,
  AxiosResponse<any, any> | undefined
] {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [axiosReq, setAxiosReq] = useState<AxiosRequestConfig<D> | undefined>(
    undefined
  );
  const [axiosRes, setAxiosRes] = useState<AxiosResponse<D, any> | undefined>(
    undefined
  );

  useEffect(() => {
    const call = async () => {
      if (axiosReq?.url) {
        try {
          setStatus('pending');
          const res: AxiosResponse<D, any> = await axios.post(
            axiosReq.url,
            axiosReq
          );
          setAxiosRes(res);
          setStatus('success');
        } catch (error) {
          setStatus('error');
          setError(error as AxiosError);
        }
      }
    };

    call();
  }, [axiosReq]);

  return [status, setAxiosReq, error, axiosRes];
}

export default useAxiosPost;
