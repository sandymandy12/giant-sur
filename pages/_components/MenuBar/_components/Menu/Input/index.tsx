import { useState, useEffect, useRef } from "react";
import { Input, TextField } from "@material-ui/core";
import useSearch from "../../../../../../hooks/useSearch";
import { useKeyPress } from "../../../../../../hooks/useKeyPress";

const InputStyles =
  "bg-white rounded-md shadow-md focus:outline-none focus:shadow-outline-primary text-gray-700 py-2 px-4 block w-full appearance-none leading-normal";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState("");
  const { search, loading, answer } = useSearch();

  const { isPressed, setIsPressed } = useKeyPress(
    "f",
    inputRef.current!,
    "metaKey"
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (loading) return;
    search(prompt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        ref={inputRef}
        className={InputStyles}
        placeholder={isPressed ? "searching" : "see ya..."}
        onFocus={() => setIsPressed(true)}
        onBlur={() => setIsPressed(false)}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <button type="submit" />
      <p>{answer}</p>
    </form>
  );
};

export default SearchBar;
