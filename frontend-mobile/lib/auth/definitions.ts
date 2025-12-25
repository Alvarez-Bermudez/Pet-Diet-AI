export type Species = "DOG" | "CAT";
export type ActivityLevel = "LOW" | "MEDIUM" | "HIGH";

export type PetHome = {
  id: string;
  name: string;
  species: Species;
  breed: string;
};

export type CreatePetDto = {
  name: string;
  species: Species;
  breed: string;
  birthDate: string;
  currentWeight: number;
  activityLevel: ActivityLevel;
};

export type PetByIdEntity = {
  id: string;
  name: string;
  species: Species;
  breed: string;
  birthDate: Date;
  currentWeight: number;
  activityLevel: ActivityLevel;
  dailyNutritionalPlan?: string | null;
  menu?: string | null;
  menuAccepted?: boolean | null;
};

export type UserEntity = {
  name: string;
  email: string;
  phone?: string | null;
};

export type DailyNutritionalPlan = {
  recommendedCalories: string;
  protein: string;
  fat: string;
  carbohydrates: string;
};

export type Menu = {
  title: string;
  meals: string[];
};
