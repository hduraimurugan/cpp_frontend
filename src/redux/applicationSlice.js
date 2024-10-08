import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
        applications:null,
        searchJobByText:"",
        searchedQuery:"",
        loading:false,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        setAllApplications:(state, action) => {
            state.applications = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setLoading:(state,action) => {
            state.loading = action.payload;
        }
    }
});
export const {setAllApplicants,setAllApplications,setSearchJobByText, setSearchedQuery,setLoading} = applicationSlice.actions;
export default applicationSlice.reducer;