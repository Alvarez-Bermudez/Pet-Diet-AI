import axios from "axios";

const baseUrl = "http://localhost:3000";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YzMyNmY3Zi1mMTNjLTRjZDItYTgwYS1mOTRiZmU5ZjE5ZGQiLCJlbWFpbCI6Impob25AZ21haWwuY29tIiwiaWF0IjoxNzY1NzcyMjcyLCJleHAiOjE3NjYzNzcwNzJ9.uiGnhcl1xcEmAXYxHgJ9MhNYr-ahuPts2fvuWxGsK50";
const token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YzMyNmY3Zi1mMTNjLTRjZDItYTgwYS1mOTRiZmU5ZjE5ZGQiLCJlbWFpbCI6Impob25AZ21haWwuY29tIiwiaWF0IjoxNzY1ODM5NjAzLCJleHAiOjE3NjY0NDQ0MDN9.18GsPp5q0_Tn9t_9J-izEgylpglhAWBKHJoSevw0pvU";
const brunoId = "61ce5cef-5156-4058-8009-b434afaddcdd",
  bethovenId = "bfb6ec1d-22d8-4f80-9956-00d531686203";

async function main() {
  try {
    const response = await axios.get(`${baseUrl}/pets/a123`, {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    });

    console.log(response.data);
  } catch (e) {
    console.error("Error:", e.response?.data || e.message);
  }
}

main().catch((e) => console.error(e));

/*
{
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YzMyNmY3Zi1mMTNjLTRjZDItYTgwYS1mOTRiZmU5ZjE5ZGQiLCJlbWFpbCI6Impob25AZ21haWwuY29tIiwiaWF0IjoxNzY1NzcyMjcyLCJleHAiOjE3NjYzNzcwNzJ9.uiGnhcl1xcEmAXYxHgJ9MhNYr-ahuPts2fvuWxGsK50'
}
*/

/*
Crear user:
const response = await axios.post("http://localhost:3000/auth/signup", {
      name: "Jhon",
      email: "jhon@gmail.com",
      password: "a12345678",
    });
*/

/**
 First dog
 {
        name: "Bruno",
        species: "DOG",
        breed: "bulldog",
        birthDate: new Date("2023-03-15"),
        currentWeight: 7.43,
        activityLevel: "MEDIUM",
      }

  2nd Dog
  {
        id: "123",
        name: "Bethoven",
        species: "DOG",
        breed: "bulldog",
        birthDate: new Date("2022-02-13"),
        currentWeight: 8.62,
        activityLevel: "MEDIUM",
      },
 */
