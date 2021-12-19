import React from 'react';

const LIMIT = 10;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */
export type ReturnValues<T> =
  | {
      data: null;
      error: null;
      isLoading: true;
      fetchMore: () => Promise<void>;
    }
  | {
      data: T[];
      error: null;
      isLoading: false;
      fetchMore: () => Promise<void>;
    }
  | {
      data: null;
      error: Error;
      isLoading: false;
      fetchMore: () => Promise<void>;
    };

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch<T>(apiPath: string, fetcher: (apiPath: string) => Promise<T[]>) {
  const internalRef = React.useRef({ isLoading: false, offset: 0 });

  const [result, setResult] = React.useState<Omit<ReturnValues<T>, 'fetchMore'>>({
    data: [],
    error: null,
    isLoading: true,
  });

  const fetchMore = React.useCallback(() => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    const promise = fetcher(apiPath);

    promise.then((allData) => {
      setResult((cur) => ({
        data: [...(cur.data ?? []), ...allData.slice(offset, offset + LIMIT)],
        error: null,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset: offset + LIMIT,
      };
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset,
      };
    });
  }, [apiPath, fetcher]);

  React.useEffect(() => {
    setResult(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: false,
      offset: 0,
    };

    fetchMore();
  }, [fetchMore]);

  return {
    ...result,
    fetchMore,
  };
}
