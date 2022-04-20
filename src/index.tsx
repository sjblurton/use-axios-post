import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

type Status = 'idle' | 'pending' | 'success' | 'error';
type Req<PostBody> = {
  url: string;
  post: PostBody;
};

const useAxiosPost = <PostBody,>(
  req?: Req<PostBody>
): [
  Status,
  React.Dispatch<React.SetStateAction<Req<PostBody> | undefined>>,
  AxiosError | undefined,
  AxiosResponse<PostBody, any> | undefined
] => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [axiosReq, setAxiosReq] = useState(req);
  const [axiosRes, setAxiosRes] = useState<
    AxiosResponse<PostBody, any> | undefined
  >(undefined);

  useEffect(() => {
    const call = async () => {
      if (axiosReq) {
        try {
          setStatus('pending');
          const res: AxiosResponse<PostBody, any> = await axios.post(
            axiosReq.url,
            axiosReq.post
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
};

export default useAxiosPost;
