export function getPromptGenerateMenu(
  dailyNutritionalPlan: string,
  petObjectString: string,
) {
  const prompt = `You are a veterinary dietitian.  
Using the Daily Nutritional Plan and Pet Info below, generate a homemade menu for a single day (today) that promotes healthy weight gain in a low-weight pet.

- The menu should meet the recommended calories and macronutrient distribution.
- Include real, homemade food ingredients only.
- Ensure portions are precise and safe for the pet’s species, breed, and weight.
- Avoid repeating meals across the day.
- Keep it simple and practical for a pet owner to prepare.

Return the result strictly in the following JSON format:
json
{
  "title": "Homemade Diet (1 day)",
  "meals": [
    "meal item 1",
    "meal item 2",
    "...more items"
  ]
}


Daily Nutritional Plan:
${dailyNutritionalPlan}


Pet Info:
json
${petObjectString}
`;

  return prompt;
}
