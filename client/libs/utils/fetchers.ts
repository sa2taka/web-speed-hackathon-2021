import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url: string): Promise<ArrayBuffer> {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(await result.text());
  }
  return await (await result.blob()).arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON<T>(url: string): Promise<T> {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(await result.text());
  }
  return result.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const result = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: formData,
  });
  if (!result.ok) {
    throw new Error(await result.text());
  }
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON<T>(url: string, data: any): Promise<T> {
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
    throw new Error(await result.text());
  }

  return result.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
