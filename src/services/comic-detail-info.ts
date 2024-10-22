import { api } from "@/services/marvel-api";
import { hash, publicKey, ts } from "@/models/create-encryption";
import { IComicsHeroInfoProps } from "@/models/interfaces";

export async function comicInfoDetailService(
  heroID: number
): Promise<IComicsHeroInfoProps[]> {
  try {
    const { data } = await api.get(
      `v1/public/characters/${heroID}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    const comicsInfo = data.data.results;
    return comicsInfo;
  } catch (error) {
    throw new Error(String(error));
  }
}
