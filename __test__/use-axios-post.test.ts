import { act, renderHook } from '@testing-library/react-hooks';
import { url200, data, url404, url500 } from '../src/constants';
import useAxiosPost from '../src';

import { server } from '../src/mocks/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe('useMediaQuery hook testing.', () => {
  it('should return status idle', () => {
    const { result } = renderHook(() => useAxiosPost());
    expect(result.current[0]).toBe('idle');
  });

  it('should return error undefined', () => {
    const { result } = renderHook(() => useAxiosPost());
    expect(result.current[2]).toBe(undefined);
  });

  it('should return response undefined', () => {
    const { result } = renderHook(() => useAxiosPost());
    expect(result.current[3]).toBe(undefined);
  });

  it('should return status pending', () => {
    const { result } = renderHook(() => useAxiosPost());
    act(() => {
      result.current[1]({ url: url200, data });
    });
    expect(result.current[0]).toBe('pending');
  });

  it('should return status success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxiosPost());
    act(() => {
      result.current[1]({ url: url200, data });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('success');
  });

  it('should return response 200', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxiosPost());
    act(() => {
      result.current[1]({ url: url200, data });
    });
    await waitForNextUpdate();
    expect(result.current[3]?.status).toBe(200);
  });

  it('should return response data to be the post data', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosPost<
        { name: string; job: string },
        { name: string; job: string }
      >()
    );
    act(() => {
      result.current[1]({ url: url200, data });
    });
    await waitForNextUpdate();
    expect(result.current[3]?.data.name).toBe(data.name);
  });

  it('should return status error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxiosPost());
    act(() => {
      result.current[1]({ url: url404, data });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('error');
  });

  it('should return error message 404 error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxiosPost());
    act(() => {
      result.current[1]({ url: url404, data });
    });
    await waitForNextUpdate();
    expect(result.current[2]?.message).toBe(
      'Request failed with status code 404'
    );
  });

  it('should return error message 500 error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxiosPost());
    act(() => {
      result.current[1]({ url: url500, data });
    });
    await waitForNextUpdate();
    expect(result.current[2]?.message).toBe(
      'Request failed with status code 500'
    );
  });
});
