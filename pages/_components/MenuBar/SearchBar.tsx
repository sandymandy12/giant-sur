import React from "react";

const SearchBar = () => {
  
  const handleClick = () => {
    
  }

  return (
    <>
      <button className="w-4 mr-5" onClick={handleClick}>
        <img
          alt="menubar icon"
          className="w-full"
          src="/images/magnifier-icon.png"
        />
      </button>
    </>
  );
};

export default SearchBar;
