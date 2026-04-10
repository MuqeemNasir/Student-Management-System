import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4" to="/students">
                    🎓 Student Management
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto fs-5 align-items-center">
                        <li className="nav-item me-4"><NavLink className={({isActive}) => isActive ? "nav-link active fw-bold text-white text-decoration-none" : "nav-link text-light text-decoration-none"} to="/students">Students</NavLink></li>
                        <li className="nav-item me-4"><NavLink className={({isActive}) => isActive ? "nav-link active fw-bold text-white text-decoration-none" : "nav-link text-light text-decoration-none"} to="/classes">Classes</NavLink></li>
                        <li className="nav-item me-4"><NavLink className={({isActive}) => isActive ? "nav-link active fw-bold text-white text-decoration-none" : "nav-link text-light text-decoration-none"} to="/school">School</NavLink></li>
                        <li className="nav-item me-4"><NavLink className={({isActive}) => isActive ? "nav-link active fw-bold text-white text-decoration-none" : "nav-link text-light text-decoration-none"} to="/teachers">Teachers</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header