import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import apiEndPoints from "../util/apiEndPoints";
import toast from "react-hot-toast";

export const UserCreditsContext = createContext();

export const UserCreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(5);
  const [loading, setLoading] = useState(false);

  const { getToken, isSignedIn } = useAuth();

  // Fetch user credits
  const fetchUserCredits = useCallback(async () => {
    if (!isSignedIn) return;

    setLoading(true);

    try {
      const token = await getToken();

      const response = await axios.get(
        apiEndPoints.GET_CREDITS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCredits(response.data.credits);
      }else {
        toast.error("Unable to get the credits.")
      }
    } catch (error) {
      console.error("Error fetching in user credits:", error);
    } finally {
      setLoading(false);
    }
  }, [getToken, isSignedIn]);

  useEffect(()=>{
    if(isSignedIn) fetchUserCredits();

  },[fetchUserCredits, isSignedIn]);

  const updateCredits = useCallback(newCredits=>{
    console.log("Updating the credits", newCredits);
    setCredits(newCredits);
  },[]);

  const contextValue = {
    credits,
    loading,
    fetchUserCredits,
    setCredits,
    updateCredits
  };

  return (
    <UserCreditsContext.Provider value={contextValue}>
      {children}
    </UserCreditsContext.Provider>
  );
};