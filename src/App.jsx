import "./App.css";
import "./styles/styles.scss";
import { Route, Routes } from "react-router-dom";
import UserDashBoard from "./components/usersDashBoard/UserDashBoard";
import AdminDashBoard from "./components/adminDashBoard/AdminDashBoard";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Header from "./components/header/Header";
import Cart from "./components/cart/Cart";
import News from "./components/usersDashBoard/News";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import CarAccesories from "./components/carAccessories/CarAccesories";

function App() {
	return (
		<>
			<Header />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					minHeight: "90vh",
				}}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products/:car" element={<CarAccesories />} />
					<Route path="/lists" element={<UserDashBoard />} />
					<Route path="/news" element={<News />} />
					<Route
						path="/admin/*"
						element={
							<ProtectedRoute>
								<AdminDashBoard />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
