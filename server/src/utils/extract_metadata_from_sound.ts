import * as MusicMetadata from 'music-metadata';

/**
 *
 * @typedef {object} SoundMetadata
 * @property {string} [artist]
 * @property {string} [title]
 */

type SoundMetadata = {
  artist: string | undefined;
  title: string | undefined;
};
/**
 * @param {Buffer} data
 * @returns {Promise<SoundMetadata>}
 */
async function extractMetadataFromSound(data: Buffer): Promise<SoundMetadata> {
  try {
    const metadata = await MusicMetadata.parseBuffer(data);
    return {
      artist: metadata.common.artist,
      title: metadata.common.title,
    };
  } catch (_err) {
    return {
      artist: undefined,
      title: undefined,
    };
  }
}

export { extractMetadataFromSound };
