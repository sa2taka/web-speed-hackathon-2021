import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);
const PUBLIC_PATH = path.resolve(dirname, '../../public');
const UPLOAD_PATH = path.resolve(dirname, '../../upload');
const CLIENT_DIST_PATH = path.resolve(dirname, '../../dist');
const DATABASE_PATH = path.resolve(dirname, '../database.sqlite');

export { PUBLIC_PATH, CLIENT_DIST_PATH, DATABASE_PATH, UPLOAD_PATH };
