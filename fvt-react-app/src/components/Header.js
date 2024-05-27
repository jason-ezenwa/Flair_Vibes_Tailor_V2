import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<header className='header'>
			<h2 onClick={() => navigate("/")}
			 className="header-text lg:mr-auto mb-4 text-2xl sm:text-3xl select-none cursor-pointer"><span className="text-fvtLavender-200">ViBES</span> TAILOR</h2>
			<p onClick={() => navigate("/hottest-songs")}
				className={location.pathname === "/hottest-songs" ? "nav-link-active" : "nav-link"}>{location.pathname === "/hottest-songs" ? "Hottest Songs" : "Check out the Hottest Songs"}</p>
		</header>
	);
};