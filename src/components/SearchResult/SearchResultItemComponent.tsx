import { Link } from "react-router-dom";
import { Card, Image, Title } from "./styles";
import { ICardProps } from "@/models/interfaces";

export function SearchResultItemComponent({ thumbnail, name, id }: ICardProps) {
  return (
    <Card>
      <Image
        src={thumbnail ? thumbnail.path : ""}
        alt={name ? name : "???"}
      />

      <Title>{name ? name : "???"}</Title>
      <Link to={`/hero/${id}`}>{id ? "SEE INFO" : "NOT FOUND"}</Link>
    </Card>
  );
}
