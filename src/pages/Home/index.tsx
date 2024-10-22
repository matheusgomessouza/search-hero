import { useEffect, useState } from "react";

import { IHeroProps } from "@/models/interfaces";
import { getHeroLabelService } from "@/services/search-hero";

import { SearchResultItemComponent } from "@/components/SearchResult/SearchResultItemComponent";

import { Background, Form, Heading, Search } from "./styles";

export default function Home() {
  const [hero, setHero] = useState<IHeroProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm && searchTerm.length > 4) {
      const callApi = async () => {
        const fetchHeroSearchInfo = await getHeroLabelService(searchTerm);
        setHero(fetchHeroSearchInfo);
      };
      callApi();
    }
  }, [searchTerm]);

  return (
    <Background>
      <Form>
        <Heading>Tell me more about...</Heading>
        <Search
          type="search"
          placeholder="Type your hero name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {hero.map(
          (result) =>
            searchTerm !== "" && (
              <SearchResultItemComponent
                key={result.id}
                id={result.id}
                thumbnail={result.thumbnail.path}
                name={result.name}
              />
            )
        )}
      </Form>
    </Background>
  );
}
