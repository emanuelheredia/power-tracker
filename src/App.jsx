import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserDashBoard from "./components/usersDashBoard/UserDashBoard";
import AdminDashBoard from "./components/adminDashBoard/AdminDashBoard";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Header from "./components/header/Header";
function App() {
	return (
		<>
			<Header />
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Routes>
					<Route path="/" element={<UserDashBoard />} />
					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<AdminDashBoard />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</>
	);
}

export default App;