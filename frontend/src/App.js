import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewProfile from "./components/user/View";
import EditProfile from "./components/user/Edit";
import ChangePassword from "./components/user/ChangePassword";
import Applications from "./components/user/Applications";
import UserProfile from "./components/user/UserProfile";
import CreateService from "./components/service/Create";
import ProviderServices from "./components/service/ProviderServices";
import ViewService from "./components/service/View";
import EditService from "./components/service/Edit";
import VisibleServices from "./components/service/VisibleServices";
import MyBookings from "./components/booking/MyBookings";
import ViewBooking from "./components/booking/View";
import ProviderBookings from "./components/booking/ProviderBookings";
import AllBookings from "./components/booking/AllBookings";
import CategoryServices from "./components/service/CategoryServices";
import Navigationbar from "./components/Navigationbar";
//import Check from "./components/Check";
function App() {
	return (
		<BrowserRouter>
			<Navigationbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="login" element={<Login />} />
				<Route path="/profile" element={<ViewProfile />} />
				<Route path="/edit/Profile" element={<EditProfile />} />
				<Route path="/changePassword" element={<ChangePassword />} />
				<Route path="/applications" element={<Applications />} />
				<Route path="/userProfile" element={<UserProfile />} />
				<Route path="/postService" element={<CreateService />} />
				<Route path="/myservices" element={<ProviderServices />} />
				<Route path="/viewservice/:id" element={<ViewService />} />
				<Route path="editservice/:id" element={<EditService />} />
				<Route path="/services" element={<VisibleServices />} />
				<Route path="/mybookings" element={<MyBookings />} />
				<Route path="/viewbooking/:id" element={<ViewBooking />} />
				<Route path="/providerbookings" element={<ProviderBookings />} />
				<Route path="/allbookings" element={<AllBookings />} />
				<Route path="/services/:category" element={<CategoryServices />} />

				{/* <Route path="/check" element={<Check />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
