import handler from '../../../backend/handler';
import { User } from '../../../backend/models';

import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import { convertMovie } from '../../../backend/converters/convert_movie';
import { UPLOAD_PATH } from '../../../backend/paths';

// 変換した動画の拡張子
const EXTENSION = 'gif';

export default handler.post(async (req, res) => {
  if (req.session.userId === undefined) {
    throw res.status(401).send({});
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw res.status(400).send({});
  }

  const movieId = uuidv4();

  const converted = await convertMovie(req.body, {
    // 動画の拡張子を指定する
    extension: EXTENSION,
    // 動画の縦横サイズを指定する (undefined は元動画に合わせる)
    size: undefined,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./movies/${movieId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).json({ id: movieId });
});
