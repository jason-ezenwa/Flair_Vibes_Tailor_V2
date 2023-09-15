import MusicCard from "./components/MusicCard";
import { useLocation } from "react-router-dom";
function Recommendations() {
  const location = useLocation();
  console.log(location.state)
  const { tracks, favouriteSong } = location.state;
  const recommendationCards = tracks.map((track) => {
    return <MusicCard track={track}/>
  })
  return (
    <main className="main">
      <h3 className="text-3xl md:text-4xl md:w-2/4 mt-6 mb-16 justify-center">
        Based on your favourite song, <span className="text-fvtLavender-200">{favouriteSong}</span>, here are some songs we think you might like!
      </h3>
      <div className="recommendations flex justify-center items-center ml--8">
          {recommendationCards}
      </div>
    </main>
  );
}

export default Recommendations;