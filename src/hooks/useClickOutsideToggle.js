import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
           // console.log(ref.current)
          // console.log(event.target)
          // console.log(!ref.current.contains(event.target))
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;

//ref allow us to reference this (Navbar.Toggle) DOM element and detect  whether the user
// clicked inside or outside of it.

// Because we called the useRef hook,  the Navbar.Toggle is saved in the ref  
// variable’s current attribute. We’ll first  check the element has been assigned to it.  
// We need this because its initial value is  set to null. And then we’ll check if the  
// user has clicked away from the referenced button.  
// If they have, we’ll call setExpanded with  false, which will close our dropdown menu.
// Ok, we’ve defined our function, but we haven’t  done anything with it yet. Let’s then add a  
// mouseup event listener to the document and  set the handleClickOutside as its callback.
// inside the return statement’s cleanup  function, we’ll remove this event listener  
// so that we’re 100% sure we’re not  leaving any event listeners behind.  