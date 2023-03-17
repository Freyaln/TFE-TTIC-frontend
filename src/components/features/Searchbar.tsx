import { ChangeEvent, FC } from 'react';
import '../../index.css';
import SearchIcon from '@mui/icons-material/Search';
export interface ISearchBarProps {
    inputClass: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}
const SearchBar: FC<ISearchBarProps> = ({ inputClass, onChange }) => {
    return (
        <div className="searchbar--container">
            <SearchIcon className="searchbar--icon" />
            <input type="text" placeholder="Search a recipe" onChange={onChange} className={inputClass} />
        </div>
    );
};

export default SearchBar;
