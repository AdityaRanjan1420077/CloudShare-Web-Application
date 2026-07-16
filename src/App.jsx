import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyFiles from "./pages/MyFiles";
import Subscription from "./pages/Subscription";
import Transaction from "./pages/Transaction";
import { RedirectToSignIn, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { UserCreditsContext, UserCreditsProvider } from "./context/UserCreditsContext";
import UploadSuccess from "./components/UploadSuccess";
import UploadFailure from "./components/UploadFailure";
import PublicFileView from "./pages/PublicFileView";
import { Receipt } from "lucide-react";
import ReceiptPage from "./pages/ReceiptPage";

const App = () => {
  return (
    <UserCreditsProvider>
    <BrowserRouter>
    <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={
          <>
            <SignedIn><Dashboard/></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>

        } />
        <Route path="/upload" element={

          <>
            <SignedIn><Upload/></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>

        } />
        <Route path="file/:fileId" element={
          <>
          <PublicFileView/>
          </>
        }/>
        <Route
  path="/receipt/:transactionId"
  element={
    <>
      <SignedIn>
        <ReceiptPage />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  }
/>
        <Route path="/my-files" element={
          <>
            <SignedIn><MyFiles/></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>
        } />
        <Route path="/subscriptions" element={
          <>
            <SignedIn><Subscription/></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>
          
        } />
        <Route path="/transactions" element={
            <>
              <SignedIn><Transaction/></SignedIn>
              <SignedOut><RedirectToSignIn/></SignedOut>
          </>
        } />
        <Route path="/*" element={<RedirectToSignIn/>}/>
        <Route
  path="/upload-success"
  element={
    <>
      <SignedIn>
        <UploadSuccess />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  }
/>
<Route
    path="/upload-failed"
    element={
        <>
            <SignedIn>
                <UploadFailure />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    }
/>
      </Routes>

    </BrowserRouter>
    </UserCreditsProvider>
  );
};

export default App;