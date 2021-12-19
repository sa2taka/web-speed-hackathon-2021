import React from 'react';
import { Either } from '../../libs/utils/fetchers';

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {T | null} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 */

export type ReturnValues<T> =
  | {
      data: null;
      error: null;
      isLoading: true;
    }
  | {
      data: T;
      error: null;
      isLoading: false;
    }
  | {
      data: null;
      error: Error;
      isLoading: false;
    };

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useFetch<T>(apiPath: string, fetcher: (apiPath: string) => Promise<Either<T>>): ReturnValues<T> {
  const [result, setResult] = React.useState<ReturnValues<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    setResult(() => ({
      data: null,
      error: null,
      isLoading: true,
    }));

    const promise = fetcher(apiPath);

    promise.then(({ data, error }) => {
      if (data) {
        setResult({
          data,
          error: null,
          isLoading: false,
        });
      } else if (error) {
        setResult({
          data: null,
          error,
          isLoading: false,
        });
      }
    });

    promise.catch((error) => {
      setResult({
        data: null,
        error,
        isLoading: false,
      });
    });
  }, [apiPath, fetcher]);

  return result;
}
