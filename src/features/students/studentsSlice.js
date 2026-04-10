import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

const API_URL = "https://dae6b9c8-9528-4c7a-b4da-04d528be0b30-00-3mw2ysr59kowh.sisko.replit.dev:3000/students"

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
    const res = await axios.get(API_URL)
    return res.data
})

export const fetchStudentById = createAsyncThunk("students/fetchStudentById", async (id) => {
    const res = await axios.get(`${API_URL}/${id}`)
    return res.data
})

export const addStudentAsync = createAsyncThunk("students/addStudentAsync", async (newStudent) => {
    const res = await axios.post(API_URL, newStudent)
    return res.data
})

export const updateStudentAsync = createAsyncThunk("students/updateStudentAsync", async ({id, updatedStudent}) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedStudent)
    return res.data
})

export const deleteStudentAsync = createAsyncThunk("students/deleteStudentAsync", async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
})

// const initialState = {
//   students: [
//     // { _id: "1", name: "John Smith", age: 14, grade: "8th", gender: "Male", attendance: 90, marks: 85 },
//     // { _id: "2", name: "Alice", age: 13, grade: "7th", gender: "Female", attendance: 85, marks: 92 },
//     // { _id: "3", name: "bob", age: 23, grade: "A", gender: "Male", attendance: 25, marks: 23 }
//   ],
//   filter: "All",
//   sortBy: "Name",
// }


export const studentsSlice = createSlice({
    name: "students",
    initialState: {
        students: [],
        status: "idle",
        error: null,
        filter: "All",
        sortBy: "name",
    },
    
    reducers: {
        addStudents: (state, action) => {
            state.students.push(action.payload)
        },

        updateStudents: (state, action) => {
            const index = state.students.findIndex(s => s._id === action.payload._id)
            if(index !== -1){
                state.students[index] = action.payload
            }
        },

        deleteStudent: (state, action) => {
            state.students = state.students.filter(s => s._id !== action.payload)
        },

        setFilter: (state, action) => {
            state.filter = action.payload
        },

        setSortBy: (state, action) => {
            state.sortBy = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = "success"
                state.students = action.payload
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = "error"
                state.error = action.error.message
            })
            .addCase(fetchStudentById.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchStudentById.fulfilled, (state, action) => {
                state.status = "success"

                const existingStudent = state.students.find(s => s._id === action.payload._id)
                if(!existingStudent){
                    state.students.push(action.payload)
                }
            })
            .addCase(fetchStudentById.rejected, (state, action) => {
                state.status = "error"
                state.error = action.error.message
            })
            .addCase(addStudentAsync.fulfilled, (state, action) => {
                state.students.push(action.payload)
            })
            .addCase(updateStudentAsync.fulfilled, (state, action) => {
                const index = state.students.findIndex(s => s._id === action.payload._id)
                if(index !== -1){
                    state.students[index] = action.payload
                }
            })
            .addCase(deleteStudentAsync.fulfilled, (state, action) => {
                state.students = state.students.filter(s => s._id !== action.payload)
            })
    }
})

export const { setFilter, setSortBy} = studentsSlice.actions

export default studentsSlice.reducer