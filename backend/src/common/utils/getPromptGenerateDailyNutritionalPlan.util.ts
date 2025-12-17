export function getPromptGenerateDailyNutritionalPlan(petObjectString: string) {
  const prompt = `You are a veterinarian nutritionist. Based on the following pet information, generate a customized Daily Nutritional Plan with calories and macronutrient percentages (protein, fat, carbohydrates). The plan must be appropriate for a pet with *low weight* and intended for healthy weight gain.

Return the result in JSON format like below, but with the values calculated for you. Protein, fat and carbohydrates are a percentage of recommendedCalories:
{
  "recommendedCalories": "600 kcal/day",
  "protein": "33%",
  "fat": "33%",
  "carbohydrates": "34%"
}

Pet info:
${petObjectString}
`;

  return prompt;
}
