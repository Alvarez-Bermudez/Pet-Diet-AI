import axios from "axios";

const baseUrl = "http://localhost:3000";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YzMyNmY3Zi1mMTNjLTRjZDItYTgwYS1mOTRiZmU5ZjE5ZGQiLCJlbWFpbCI6Impob25AZ21haWwuY29tIiwiaWF0IjoxNzY2NjIzNjE1LCJleHAiOjE3NjcyMjg0MTV9.feevERlcLoit1MrDtfVrDjUcTUZPr8SDWHHmMi7P7S8";
const brunoId = "61ce5cef-5156-4058-8009-b434afaddcdd";

async function main() {
  try {
    const response = await axios.patch(
      `${baseUrl}/users/me`,
      { name: "Jhony", phone: "+1 523 123 1234" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(JSON.stringify(response.data, null, 2));
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
      //password: "a12345678",
      password: "a12345679"
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
