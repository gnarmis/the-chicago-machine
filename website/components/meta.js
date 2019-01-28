import Head from "next/head";

export default () => (
  <>
    <Head>
      <title>The Chicago Machine</title>
      <link
        href="https://cdn.jsdelivr.net/npm/picnic@6.5.0/picnic.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Bowlby+One+SC"
        rel="stylesheet"
      />
    </Head>
    <style jsx global>{`
      body {
        background-color: #bbdcf0;
        color: #000;
        font-family: "Bowlby One SC", cursive;
      }
    `}</style>
  </>
);
