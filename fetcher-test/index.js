import axios from "axios";

const baseUrl = "http://localhost:3000";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YzMyNmY3Zi1mMTNjLTRjZDItYTgwYS1mOTRiZmU5ZjE5ZGQiLCJlbWFpbCI6Impob25AZ21haWwuY29tIiwiaWF0IjoxNzY1NzcyMjcyLCJleHAiOjE3NjYzNzcwNzJ9.uiGnhcl1xcEmAXYxHgJ9MhNYr-ahuPts2fvuWxGsK50";
const token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YzMyNmY3Zi1mMTNjLTRjZDItYTgwYS1mOTRiZmU5ZjE5ZGQiLCJlbWFpbCI6Impob25AZ21haWwuY29tIiwiaWF0IjoxNzY1ODM5NjAzLCJleHAiOjE3NjY0NDQ0MDN9.18GsPp5q0_Tn9t_9J-izEgylpglhAWBKHJoSevw0pvU";

async function main() {
  try {
    const response = await axios.get(
      `${baseUrl}/users/me`,

      {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      }
    );

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
