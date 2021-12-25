import handler, { withSession } from '../../../backend/handler';
import { convertImage } from '../../../backend/converters/convert_image';
import { UPLOAD_PATH } from '../../../backend/paths';

import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';

// 変換した画像の拡張子
const EXTENSION = 'jpg';

export default handler.post(async (req, res) => {
  await withSession(req, res);

  if (req.session.userId === undefined) {
    throw res.status(401).send({});
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw res.status(400).send({});
  }

  const imageId = uuidv4();

  const converted = await convertImage(req.body, {
    // 画像の拡張子を指定する
    extension: EXTENSION,
    // 画像の縦サイズを指定する (undefined は元画像に合わせる)
    height: undefined,
    // 画像の横サイズを指定する (undefined は元画像に合わせる)
    width: undefined,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).json({ id: imageId });
});
