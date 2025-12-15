import axios from "axios";

async function main() {
  try {
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
