import React from "react";
import firebase from "../lib/firebase";
import FileUploader from "react-firebase-file-uploader";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { ToastProvider, ToastConsumer } from "react-awesome-toasts";
import Meta from "../components/meta";
import {
  FirestoreProvider,
  FirestoreCollection,
  withFirestore
} from "react-firestore";

function AudioFiles() {
  return (
    <>
      <FirestoreCollection
        path="audio_urls"
        render={({ isLoading, data }) => {
          return isLoading ? (
            <>...</>
          ) : (
            <>
              <div>
                <h2>Uploaded Audio Files</h2>
                {data.map(item => {
                  return (
                    <div className="card" key={Number(new Date())}>
                      {item.filename} -- <audio controls src={item.url} />
                    </div>
                  );
                })}
              </div>
            </>
          );
        }}
      />
    </>
  );
}

function Soundboard() {
  const errorToast = {
    text: "Upload Error",
    ariaLabel: "File was not uploaded successfully. See console for more.",
    actionText: "Ok"
  };
  const successToast = {
    text: "Upload Success",
    ariaLabel: "File was uploaded successfully!",
    actionText: "Ok"
  };
  return (
    <div className="flex">
      <h1>Soundboard</h1>
      <ToastConsumer>
        {({ show, hide }) => (
          <>
            <FileUploader
              accept="audio/*"
              name="audio"
              storageRef={firebase
                .storage()
                .ref()
                .child("audio")}
              onUploadError={error => {
                show({ ...errorToast, onActionClick: hide });
                console.error(error);
              }}
              onUploadSuccess={filename => {
                // so... firebase storage has NO API TO GET THE URLS
                // so I literally add urls to the Firestore database...
                firebase
                  .storage()
                  .ref()
                  .child("audio")
                  .child(filename)
                  .getDownloadURL()
                  .then(url =>
                    firebase
                      .app()
                      .firestore()
                      .collection("audio_urls")
                      .doc(String(Number(new Date())))
                      .set({ url: url, filename: filename })
                  );
                // show whether it succeeded to user
                show({ ...successToast, onActionClick: hide });
                console.log(`\'${filename}\' uploaded!`);
              }}
              onProgress={progress => console.info(progress)}
              multiple
            />
            <AudioFiles />
          </>
        )}
      </ToastConsumer>
    </div>
  );
}

function Contents() {
  return (
    <ToastProvider>
      <Soundboard />
    </ToastProvider>
  );
}

class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <Meta />
          <h1>The Chicago Machine</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return (
      <div>
        <Meta />
        <h1>The Chicago Machine</h1>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </p>
        <p>
          {" "}
          <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </p>
        <Contents />
      </div>
    );
  }
}

const WrappedSignInScreen = withFirestore(SignInScreen);

export default () => (
  <FirestoreProvider firebase={firebase}>
    <WrappedSignInScreen />
  </FirestoreProvider>
);
