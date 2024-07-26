import { Button } from "@mui/material";
import Footer from "./components/Footer";
import MusicCard from "./components/MusicCard";
import { useNavigate, useLocation } from "react-router-dom";
function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state)
  const { tracks, favouriteSong } = location.state;
  const recommendationCards = tracks.map((track) => {
    return <MusicCard track={track}/>
  })
  return (
    <main>
      <section className="main">
        <h3 className="text-3xl md:text-4xl mt-6 mb-16 justify-center text-center">
          Based on your favourite song, <span className="text-fvtLavender-200">{favouriteSong}</span>, here are some songs we think you might like!
        </h3>
        <div className="recommendations">
          <div className="recommendations">
            {recommendationCards}
          </div>
          <div className="w-[80%] md:w-[50%]">
            <Button
              onClick={(e) => {
                navigate("/")
              }}
              backgroundColor="black"
              style={{
                backgroundColor: "#4755A8",
                color: "white",
                borderRadius: "1px",
                marginTop: "1rem",
                padding: "0.5rem",
                width: "100%",
                textTransform: 'none'
              }}
            >
              I want to go again!
            </Button>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

export default Recommendations;