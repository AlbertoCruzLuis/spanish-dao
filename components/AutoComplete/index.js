import { useState } from 'react';

const SuggestionList = ({filteredSuggestions, onClick}) => {
    return (
        <>
            { filteredSuggestions.length ? (
                <ul className='absolute z-10'>
                    {filteredSuggestions.map((suggestion) => (
                        <li className='outline-none bg-white hover:bg-gray-200 border-2 border-solid rounded-md p-2 md:w-96 lg:w-96 xl:w-96' key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            ) : ""}
        </>
    )
}

export const AutoComplete = ({suggestions, placeholder, state, setState}) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const onChange = (event) => {
        const userInput = event.target.value;
    
        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
        (suggestion) =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        setState(userInput)
        setFilteredSuggestions(unLinked);
        setShowSuggestions(true);
    };

    const onClick = (event) => {
        setFilteredSuggestions([]);
        setState(event.target.innerText);
        setShowSuggestions(false);
    };

    return (
        <div>
            <input
                className='outline-none border-2 border-solid rounded-md p-2 md:w-96 lg:w-96 xl:w-96'
                type="text"
                onChange={onChange}
                placeholder={placeholder}
                value={state}
            />
            {showSuggestions && state && (
                <SuggestionList 
                    filteredSuggestions={filteredSuggestions}
                    onClick={onClick} />
            )}
        </div>
    )
}