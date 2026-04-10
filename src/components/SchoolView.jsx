import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTopStudent, updateSchoolStats } from "../features/school/schoolSlice"

const SchoolView = () => {
    const dispatch = useDispatch()
    const students = useSelector((state) => state.students.students)
    const {totalStudents, averageAttendance, averageMarks, topStudent } = useSelector((state) => state.school)
    const teachers = useSelector((state) => state.teachers.teachers)

    useEffect(() => {
        if(students.length > 0){
            let totalAtt = 0
            let totalMrk = 0
            let bestStudent = students[0]

            students.forEach(student => {
                const attendance = Number(student.attendance) || 0
                const marks = Number(student.marks) || 0

                totalAtt += attendance
                totalMrk += marks

                if(marks > (Number(bestStudent.marks) || 0)){
                    bestStudent = student
                }
            })

            dispatch(updateSchoolStats({
                totalStudents : students.length,
                averageAttendance: (totalAtt / students.length).toFixed(2),
                averageMarks: (totalMrk / students.length).toFixed(2),
            }))

            dispatch(setTopStudent(bestStudent))
        }else{
            dispatch(updateSchoolStats({totalStudents: 0, averageAttendance: 0, averageMarks: 0}))
            dispatch(setTopStudent(null))
        }
    }, [students, dispatch])


    return(
        <div className="container mt-4">
            <h1 className="mb-4 fw-bold text-dark text-start">School View</h1>
            <p className="fw-semibold">Total Students: <span className="fw-bold">{totalStudents}</span></p>
            <p className="fw-semibold">Average Attendance: <span className="fw-bold">{averageAttendance}</span></p>
            <p className="fw-semibold">Average Marks: <span className="fw-bold">{averageMarks}</span></p>
            <p className="fw-semibold">Best Student: <span className="fw-bold">{topStudent ? topStudent.name : "-"}</span></p>
            <p className="fw-semibold">Total Teachers: <span className="fw-bold">{teachers.length}</span></p>
        </div>
    )

}

export default SchoolView