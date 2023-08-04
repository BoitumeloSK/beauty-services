import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
//import Check from "./components/Check";
function App() {
	return (
		<BrowserRouter>
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

				{/* <Route path="/check" element={<Check />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
