import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count + 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

export const unfollowHelper  = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id : null
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count - 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

export const setTokenTimestamp = (data) => {
  // this function should extract the expiry date from the access token
  // and save it to the user's browser in local storage.
  // This object comes with an expiry date with the key of exp,
  // so we can save the ‘exp’ attribute to a variable
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  // Finally, we can save that value to the user's browser using localStorage
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  //tells if an expiry date exists in the users local storage
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

// Here we used the reduce method to loop through  the new page of results that we got from our API. 
// We then appended our new results to the existing  posts in our posts.results array in the state. 
// Then, we used the some() method to loop  through the array of posts in the accumulator. 
// Inside, we compared each accumulator item  
// id to the current post id from  the newly fetched posts array.
// If the some() method returned true, this means  it found a match and we are displaying that  
// post already. So in this case we return the  accumulator without adding the post to it. 
// And if the some() method does not find a  match, we return an array containing our  
// spread accumulator with the new post added to it. Cool, now that we have the function for fetching  
// more data defined

// The some() method checks whether the  callback passed to it returns true for  
// at least one element in the array and  it stops running as soon as it does.
// So we can use it to check if any of our post  IDs in the newly fetched data matches an id that  
// already exists in our previous results. If the some() method finds a match,  
// we’ll just return the existing accumulator to the  reduce method. But if it doesn’t find a match,  
// we know this is a new post, so we can return our  spread accumulator with the new post at the end.