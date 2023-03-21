import { SearchSharp } from '@mui/icons-material';
import { TextField, IconButton } from '@mui/material';
import {
  customMuiTextFieldBrick,
  searchFieldButton,
} from '@src/mui-theme/custom-styles';
import Link from 'next/link';
import { useState } from 'react';

const SearchField = ({ ...props }: { searchUrl: string }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="d-flex">
      <TextField
        placeholder="Search "
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          ...customMuiTextFieldBrick,
          '.MuiInputBase-root': { borderRadius: 0 },
        }}
      />
      <Link
        href={`${props.searchUrl}/${searchTerm}`}
        passHref
        style={{ marginLeft: '10px' }}
        aria-labelledby="search"
        data-testid="search-link"
      >
        <IconButton
          name="search"
          aria-label={`find ${searchTerm}`}
          data-testid="search-button"
          sx={{
            ...searchFieldButton,
            height: '100%',
            aspectRatio: '1/1',
          }}
        >
          <SearchSharp />
        </IconButton>
      </Link>
    </div>
  );
};

export default SearchField;
