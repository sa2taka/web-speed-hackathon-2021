import sharp from 'sharp';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(
  buffer: Buffer,
  options: {
    extension?: keyof sharp.FormatEnum | sharp.AvailableFormatInfo;
    height?: number;
    width?: number;
  },
): Promise<Uint8Array> {
  return sharp(buffer)
    .resize({
      fit: 'cover',
      height: options.height,
      width: options.width,
    })
    .toFormat(options.extension ?? 'jpeg')
    .toBuffer();
}

export { convertImage };
