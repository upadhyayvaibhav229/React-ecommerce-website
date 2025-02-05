import { useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    showSearch: false, // Added showSearch to initialState
};

const SearchFilter = createSlice({
    name: "searchFilter",
    initialState,
    reducers: {
        setShowSearch: (state, action) => {
            if (action.payload) {
                state.showSearch = true;
            } else {
                state.showSearch = false;
                state.searchTerm = "";
            }
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => {
            state.searchTerm = "";
        },
    },
});

export const useSearchFilter = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.searchFilter.searchTerm);
    const showSearch = useSelector((state) => state.searchFilter.showSearch);

    const setShowSearch = (showSearch) => dispatch(SearchFilter.actions.setShowSearch(showSearch));
    const setSearchTerm = (searchTerm) => dispatch(SearchFilter.actions.setSearchTerm(searchTerm));
    const clearSearchTerm = () => dispatch(SearchFilter.actions.clearSearchTerm());

    return { searchTerm, showSearch, setShowSearch, setSearchTerm, clearSearchTerm };
};

export default SearchFilter.reducer;
