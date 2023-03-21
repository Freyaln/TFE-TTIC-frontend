import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import '../../index.css';
import { Pagination } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { countRecipes, pageRecipes } from '../slices/recipesSlices';

const PaginationTab: FC = ({}) => {
    const [page, setPage] = useState<string>('1');
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [offset, setOffset] = useState<number>(10);
    const [count, setCount] = useState<number>(10);
    const dispatch = useDispatch();

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage.toString());
        switch (rowsPerPage) {
            case 10:
                setOffset(newPage * rowsPerPage);
                break;
            case 25:
                setOffset(newPage * rowsPerPage);
                break;
        }
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
        const rows = parseInt(event.target.value, 10);
        setRowsPerPage(rows);
        setPage('1');
        dispatch(pageRecipes(1));
    };

    useEffect(() => {
        rowsPerPage === 10 ? setCount(10) : setCount(4);
        dispatch(pageRecipes(offset));
        dispatch(countRecipes(rowsPerPage));
        console.log('offset : ' + offset, 'page : ' + page, 'row : ' + rowsPerPage);
    }, [rowsPerPage, rowsPerPage, offset]);

    return (
        <Box className="pagination--container">
            <FormControl variant="standard" className="pagination--per__page">
                <InputLabel>Results per page : </InputLabel>
                <Select value={rowsPerPage.toString()} onChange={handleChangeRowsPerPage} label="Results per page :">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
            </FormControl>
            <Stack spacing={2}>
                <Pagination count={count} defaultPage={1} onChange={handleChangePage} className="pagination--page" />
            </Stack>
        </Box>
    );
};

export default PaginationTab;
