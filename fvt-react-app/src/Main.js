import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Footer from "./components/Footer";
import { Button } from "@mui/material";

function Main() {
  const [songName, setSongName] = useState("");

  const [artisteName, setArtisteName] = useState("");

  const [generatingRecommendations, setGeneratingRecommendations] = useState(false);
  const navigate = useNavigate();

  async function getRecommendations(event) {
    event.preventDefault();
    const apiUrl = 'https://fvt-backend.onrender.com/api/v1/get_recommendations';
    try {
      const response = await axios.post(apiUrl, {
        song_name: songName,
        artist: artisteName
      });
      console.log(response.data);
      navigate("/recommendations", {
        replace: true,
        state: {
          favouriteSong: songName,
          ...response.data
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="">
      <section className="main flex flex-col items-center">
        <h3 className="text-center text-3xl md:text-4xl lg:w-2/4 mt-6 mb-16">
          Get music <span className="text-fvtLavender-200">recommendations</span> based on your favourite song!!
        </h3>
        <div className="">
          <form className="flex items-center flex-col" 
            id="submit_songs"
          >
            <input className="form-text-field" type="text" id="songName" name="song_name"
            placeholder="Enter the name of your favourite song"
            onChange={(event) => setSongName(event.target.value)}/>
            <input className="form-text-field" type="text" id="artisteName" name="artist_name"
            placeholder="Tell us who made the song above :) "
            onChange={(event) => setArtisteName(event.target.value)}/>
            <Button
              onClick={(e) => {
                setGeneratingRecommendations(true);
                getRecommendations(e);
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
              {generatingRecommendations ? "Generating Recommendations..." : "Generate Recommendations"}
            </Button>
          </form>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

export default Main;