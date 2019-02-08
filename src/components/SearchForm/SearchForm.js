import React from 'react';
import './SearchForm.css';

const SearchForm = (props) => {
    return ( 
        <div className="search-form">
            <input 
                type="text"
                className="search-form__input"
                placeholder="Your city.."
                onChange={(e)=> props.change(e.target.value)}
            />
        </div>
     );
}
 
export default SearchForm;