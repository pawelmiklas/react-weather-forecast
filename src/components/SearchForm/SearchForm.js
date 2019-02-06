import React from 'react';
import './SearchForm.css';

const SearchForm = (props) => {
    return ( 
        <div className="search-form">
            <input type="text" className="search-form__input" onChange={props.change}/>
        </div>
     );
}
 
export default SearchForm;