import { ChangeEvent, FC } from 'react';
export interface ISearchBarProps {
    inputClass: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}
const SearchBar: FC<ISearchBarProps> = ({ inputClass, onChange }) => {
    return (
        <div
            style={{
                marginRight: '1.5rem',
            }}
        >
            <input
                type="text"
                placeholder="Search..."
                onChange={onChange}
                className={inputClass}
                style={{ width: 120, border: 'black 1px solid', borderRadius: '5px' }}
            />
        </div>
    );
};

export default SearchBar;
