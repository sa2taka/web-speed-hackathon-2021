import handler, { withSession } from '../../../backend/handler';
import { convertImage } from '../../../backend/converters/convert_image';
import { UPLOAD_PATH } from '../../../backend/paths';

import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';
import { extractMetadataFromSound } from '../../../backend/utils/extract_metadata_from_sound';
import { convertSound } from '../../../backend/converters/convert_sound';

// 変換した画像の拡張子
const EXTENSION = 'mp3';

export default handler.post(async (req, res) => {
  await withSession(req, res);

  if (req.session.userId === undefined) {
    throw res.status(401).send({});
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw res.status(400).send({});
  }

  const soundId = uuidv4();

  const { artist, title } = await extractMetadataFromSound(req.body);

  const converted = await convertSound(req.body, {
    // 音声の拡張子を指定する
    extension: EXTENSION,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).json({ artist, id: soundId, title });
});
