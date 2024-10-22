import { api } from "@/services/marvel-api";
import { IHeroProps } from "@/models/interfaces";
import { hash, publicKey, ts } from "@/models/create-encryption";

export async function getHeroLabelService(
  typedWord: string
): Promise<IHeroProps[]> {
  try {
    const responseHeroData = await api.get(
      `/v1/public/characters?name=${typedWord}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );

    const heroReturned = responseHeroData?.data?.data?.results;
    const result: IHeroProps[] = heroReturned.map((element: IHeroProps) => ({
      id: element.id,
      name: element.name,
      description: element.description,
      thumbnail: { path: element?.thumbnail?.path + ".webp" },
    }));

    return result;
  } catch (error) {
    throw new Error(String(error));
  }
}
