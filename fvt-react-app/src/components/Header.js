import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	return (
		<header className='header cursor-pointer'>
			<h2 onClick={() => navigate("/")} className="header-text text-2xl sm:text-3xl sm:ml-20 select-none">FLAIR <span className="text-fvtLavender-200">ViBES</span> TAILOR</h2>
		</header>
	);
};