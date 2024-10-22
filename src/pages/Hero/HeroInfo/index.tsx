import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { IComicsHeroInfoProps, IHeroDetailProps } from "@/models/interfaces";
import { Button, Image, Name, Description, Container, Title } from "./styles";
import { comicInfoDetailService } from "@/services/comic-detail-info";
import { getHeroDetailInfo } from "@/services/hero-detail-info";

export function HeroInfo() {
  const [heroInformation, setHeroInformation] = useState<IHeroDetailProps[]>(
    []
  );
  const [heroComicInformation, setHeroComicInformation] = useState<
    IComicsHeroInfoProps[] | undefined
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const URL = String(window.location.pathname);
    const heroID = Number(URL.replace(/(\D)/g, ""));

    const callHeroApi = async () => {
      const fetchHeroDetailInfo = await getHeroDetailInfo(heroID);
      const { id, name, thumbnail, description } = fetchHeroDetailInfo[0];

      setHeroInformation([
        {
          id,
          name,
          thumbnail: { path: thumbnail.path + ".jpg" },
          description,
        },
      ]);
    };
    callHeroApi();

    const callComicApi = async () => {
      const fetchComicDetailsInfo = await comicInfoDetailService(heroID);
      setHeroComicInformation(fetchComicDetailsInfo);
    };
    callComicApi();
  }, []);

  return (
    <Container>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        <BsBoxArrowLeft color="#000" />
        {""}
      </Button>

      {heroInformation.map((info) => (
        <div key={info.id}>
          <Name>{info.name}</Name>
          <Image src={info.thumbnail.path} alt="" />
          {info.description ? (
            <Description>{info.description}</Description>
          ) : (
            <Description>
              We couldn&apos;t find any description on the database about this
              particular hero, villain, group or whatever that you&apos;re
              trying to search about.
            </Description>
          )}
        </div>
      ))}

      <Swiper
        modules={[Autoplay]}
        centeredSlides
        slidesPerView="auto"
        breakpoints={{
          768: {
            width: 668,
            slidesPerView: 3,
            spaceBetween: 200,
          },
        }}
      >
        {heroComicInformation?.map((comic) => (
          <SwiperSlide key={comic.id}>
            <Image src={comic.thumbnail.path + ".jpg"} />
            <Title>{comic.title}</Title>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
