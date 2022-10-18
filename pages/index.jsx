import Head from "next/head";
import FormLogin from "../components/login/form";
import { useEffect } from "react";
import Router from "next/router";
import { auth } from "../utils/auth";

export async function getServerSideProps(ctx) {
  const { token } = await auth(ctx);

  if (token) {
    ctx.res.writeHead(302, { location: "/events" });
    ctx.res.end();
    return { props: {} };
  } else {
    return { props: {} };
  }
}

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Bisnis Indonesia | Admin Page</title>
        <meta
          name="description"
          content="Halaman Login Admin Bisnis Indonesia"
        />
      </Head>

      <FormLogin />

      {JSON.stringify(props, null, 2)}
    </div>
  );
}
