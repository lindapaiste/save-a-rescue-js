import React from "react";
import { SpeciesLatest } from "./SpeciesLatest";
import { DogOrCat } from "../../services/species/species";
import { useSeoTitle } from "../../services/seo/useSeoTitle";

export const Home = () => {
  useSeoTitle("Search Adoptable Pets");
  return (
    <section id="home-adoptables">
      <SpeciesLatest species={DogOrCat.DOG} />
      <SpeciesLatest species={DogOrCat.CAT} />
    </section>
  );
};
