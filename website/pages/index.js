import React from "react";
import Meta from "../components/meta";
import firebase from "../lib/firebase";
import { FirestoreProvider, FirestoreCollection } from "react-firestore";

function VotesCount({ voteType }) {
  return (
    <FirestoreCollection
      path="votes"
      render={({ isLoading, data }) => {
        return isLoading ? (
          <>...</>
        ) : (
          <>{data.filter(vote => vote.label === voteType).length}</>
        );
      }}
    />
  );
}

class Voting extends React.Component {
  render() {
    return (
      <>
        <h2>
          <center>Vote:</center>
        </h2>
        <div className="flex three center">
          <button
            onClick={() =>
              firebase
                .app()
                .firestore()
                .collection("votes")
                .doc(String(Number(new Date())))
                .set({ label: "standard-vote-v2-mercy" })
            }
          >
            Mercy 😇 x <VotesCount voteType="standard-vote-v2-mercy" />
          </button>
          <button
            onClick={() =>
              firebase
                .app()
                .firestore()
                .collection("votes")
                .doc(String(Number(new Date())))
                .set({ label: "standard-vote-v2-fun" })
            }
          >
            Fun 😂 x <VotesCount voteType="standard-vote-v2-fun" />
          </button>
          <button
            onClick={() =>
              firebase
                .app()
                .firestore()
                .collection("votes")
                .doc(String(Number(new Date())))
                .set({ label: "standard-vote-v2-exterminate" })
            }
          >
            Exterminate 🤖 x{" "}
            <VotesCount voteType="standard-vote-v2-exterminate" />
          </button>
          <style jsx>{`
            button {
              color: #eb3323;
              background-color: #fff;
              margin: 5px;
            }
          `}</style>
        </div>
      </>
    );
  }
}

function VideoFrame({ src }) {
  return (
    <iframe
      src={src}
      frameBorder="0"
      allowFullScreen={true}
      scrolling="no"
      style={{ minHeight: 500 }}
    />
  );
}

function App() {
  return (
    <>
      <Meta />
      <div className="App flex">
        <h1 className="MainHeading">
          <center>The Chicago Machine</center>
        </h1>
        <div className="flex center">
          <VideoFrame src="https://player.twitch.tv/?channel=slurpylizard" />
        </div>
        <Voting />
      </div>
      <div className="flex footer">
        <span>
          made by&nbsp;
          <a href="https://twitter.com/@gnarmis">@gnarmis</a>&nbsp;and&nbsp;
          <a href="https://twitter.com/@lukeshepard">@lukeshepard</a>
        </span>
      </div>
      <style jsx>{`
        .footer {
          font-family: Arial, sans-serif;
          font-size: 16px;
          width: 100%;
          text-align: center;
          z-index: -10;
          color: #eee;
          margin-top: 60px;
        }
        a {
          color: #eee;
          text-decoration: underline;
        }
      `}</style>
      <style jsx>{`
        .App {
          padding: 2%;
        }

        .MainHeading {
          text-shadow: 3px 3px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff,
            -1px 1px 0 #fff, 1px 1px 0 #fff;
          font-size: 48;
          color: #eb3323;
        }
      `}</style>
    </>
  );
}

export default () => (
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>
);
