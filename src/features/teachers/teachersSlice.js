    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";

    const API_URL = "https://dae6b9c8-9528-4c7a-b4da-04d528be0b30-00-3mw2ysr59kowh.sisko.replit.dev:3000/teachers"

    export const fetchTeachers = createAsyncThunk("teachers/fetchTeachers", async() => {
        const res = await axios.get(API_URL)
        return res.data
    })

    export const addTeacherAsync = createAsyncThunk("teachers/addTeacherAsync", async(newTeacher) => {
        const res = await axios.post(API_URL, newTeacher)
        return res.data
    })

    export const deleteTeacher = createAsyncThunk("teachers/deleteTeacher", async(id) => {
        await axios.delete(`${API_URL}/${id}`)
        return id
    })

    export const teacherSlice = createSlice({
        name: 'teachers',
        initialState: {
            teachers: [],
            status: 'idle',
            error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchTeachers.pending, (state) => {
                    state.status = "loading"
                })
                .addCase(fetchTeachers.fulfilled, (state, action) => {
                    state.status = "success"
                    state.teachers = action.payload
                })
                .addCase(fetchTeachers.rejected, (state, action) => {
                    state.status = "error"
                    state.error = action.error.message
                })
                .addCase(addTeacherAsync.fulfilled, (state, action) => {
                    state.teachers.push(action.payload)
                })
                .addCase(deleteTeacher.fulfilled, (state, action) => {
                    state.teachers = state.teachers.filter(t => t._id !== action.payload)
                })
        }
    })

    export default teacherSlice.reducer