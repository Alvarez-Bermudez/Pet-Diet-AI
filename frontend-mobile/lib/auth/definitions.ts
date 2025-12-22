export type Species = "DOG" | "CAT";
export type ActivityLevel = "LOW" | "MEDIUM" | "HIGH";

export type PetHome = {
  id: string;
  name: string;
  species: Species;
  breed: string;
};
