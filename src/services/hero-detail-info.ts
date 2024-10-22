import { api } from "@/services/marvel-api";
import { hash, publicKey, ts } from "@/models/create-encryption";
import { IHeroDetailProps } from "@/models/interfaces";

export async function getHeroDetailInfo(
  heroID: number
): Promise<IHeroDetailProps[]> {
  try {
    const { data } = await api.get(
      `/v1/public/characters/${heroID}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    const heroDetailResponse = data.data.results;
    return heroDetailResponse;
  } catch (error) {
    throw new Error(String(error));
  }
}
