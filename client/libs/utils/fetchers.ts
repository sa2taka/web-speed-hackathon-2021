import { gzip } from 'pako';

export type Either<T> =
  | {
      data: T;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: Error;
    };

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url: string): Promise<Either<ArrayBuffer>> {
  const result = await fetch(url);
  if (!result.ok) {
    return {
      error: new Error(await result.text()),
    };
  }
  return {
    data: await (await result.blob()).arrayBuffer(),
  };
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON<T>(url: string): Promise<Either<T>> {
  const result = await fetch(url);
  if (!result.ok) {
    return {
      error: new Error(await result.text()),
    };
  }
  return {
    data: await result.json(),
  };
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile<T>(url: string, file: File): Promise<Either<T>> {
  const formData = new FormData();
  formData.append('file', file);

  const result = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: formData,
  });
  if (!result.ok) {
    return {
      error: new Error(await result.text()),
    };
  }
  return {
    data: await result.json(),
  };
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON<T>(url: string, data: any): Promise<Either<T>> {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const result = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
    body: compressed,
  });

  if (!result.ok) {
    return {
      error: new Error(await result.text()),
    };
  }

  return {
    data: await result.json(),
  };
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
