import React,{ createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext"


export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileDataContext = () => useContext(ProfileDataContext);
export const useSetProfileDataContext = () => useContext(SetProfileDataContext);

function ProfileDataProvider({ children }) {
    const [profileData, setProfileData] = useState({
        // we will use the pageProfile later!
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
      });
      const currentUser = useCurrentUser();
    
      useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(
                //we’re fetching them in the  descending order of how many followers they have,  
                //so the most followed profile will be at the top
              "/profiles/?ordering=-followers_count"
            );
            setProfileData((prevState) => ({
              ...prevState,
              popularProfiles: data,
            }));
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [currentUser]);
    return (
        <div>
            <ProfileDataContext.Provider value={profileData}>
                <SetProfileDataContext.Provider value={setProfileData}>
                    {children}
                </SetProfileDataContext.Provider>
            </ProfileDataContext.Provider>
            
        </div>
    )
}

export default ProfileDataProvider
