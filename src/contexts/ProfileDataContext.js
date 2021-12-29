import React,{ createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext"
import { followHelper, unfollowHelper } from "../utils/utils";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

function ProfileDataProvider({ children }) {
    const [profileData, setProfileData] = useState({
        // we will use the pageProfile later!
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
      });
      const currentUser = useCurrentUser();

      const handleUnfollow = async (clickedProfile)=>{
        try{
           await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

           setProfileData((prevState) => ({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.results.map((profile) =>
              unfollowHelper(profile, clickedProfile)
              ),
            },
            popularProfiles: {
              ...prevState.popularProfiles,
              results: prevState.popularProfiles.results.map((profile) =>
              unfollowHelper(profile, clickedProfile)
              ),
            },
          }));
           
        }catch(e){
          // console.log(e)
        }

      }

      const handleFollow = async (clickedProfile) => {
        try {
          //we’ll send is info about what profile the user just followed
          const { data } = await axiosRes.post("/followers/", {
            followed: clickedProfile.id,
          });

          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.results.map((profile) =>
                followHelper(profile, clickedProfile, data.id)
              ),
            },
            popularProfiles: {
              ...prevState.popularProfiles,
              results: prevState.popularProfiles.results.map((profile) =>
                followHelper(profile, clickedProfile, data.id)
              ),
            },
          }));


        } catch (err) {
          // console.log(err);
        }
      };

    
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
            // console.log(err);
          }
        };
    
        handleMount();
      }, [currentUser]);
    return (
        <div>
            <ProfileDataContext.Provider value={profileData}>
              //sedning more than 1 value, you need to add extr set of curly bracket
                <SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>
                    {children}
                </SetProfileDataContext.Provider>
            </ProfileDataContext.Provider>
            
        </div>
    )
}

export default ProfileDataProvider
