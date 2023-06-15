import Login from "@/components/Login";
import Signup from "@/components/Signup";
import SubmitTest from "@/components/SumbitTest";
import Test from "@/components/Test";
import Welcome from "@/components/Welcome";
import Phone from "@/components/phone";

export default function Home() {
  return (
    <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <div>Aditya Ranjan (2005428) - CSE </div>
        <div>Kalinga Institute of Industrial Technology</div>
        <h1>REST API for a Questionnaire System</h1>
        <h2>
          Api Endpoint :
          <span style={{ backgroundColor: " #98AFC7" }}>
            {" "}
            https://mini-project-one-rouge.vercel.app/api/
          </span>
        </h2>
        This api is made using Next js 13.4.0 and Typescript , I have used
        Serverless PostgreSQL provided by Neon as the Backend and drizzle-orm as
        the typesafe orm for the database.And finally Zod for typesafe
        validation of the api. And for the frontend I have used Material UI to
        prepare a interactive doc of the api.
        <br />
        Hope you like it.!!
        <br />
        GitHub Repo : https://github.com/Aditya-ranjan-16/mini-project
      </div>
      <h2>1. [GET] /api/welcome</h2>
      <Welcome />
      <br />
      <h2>2. [POST] /api/signup</h2>
      <Signup />
      <br />

      <h2>3. [POST] /api/login</h2>
      <Login />
      <br />
      <h2>4. [PUT] /api/edit/phonenumber</h2>
      <Phone />
      <br />
      <h2>5. [GET] /api/test</h2>
      <Test />
      <br />
      <h2>6. [POST] /api/submit-test</h2>
      <SubmitTest />
    </div>
  );
}
