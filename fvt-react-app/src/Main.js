import MusicCard from "./components/MusicCard";
function Main() {
  return (
    <main className="main p-10 md:ml-16 z-40">
      <h3 className='text-3xl md:text-4xl w-2/4 mt-6 mb-16'>
        Get music <span className="text-fvtLavender-200">recommendations</span> based on your favourite song!!
      </h3>
      <div className="">
          <form className="flex justify-center items-center flex-col" id="submit_songs">
              <input className="form-text-field" type="text" id="song_title" name="song_title" placeholder="Enter the name of your favourite song"/>
              <input className="form-text-field" type="text" id="artist_name" name="artist_name" placeholder="Tell us who made the song above :) "/>
              <input className="w-1/4 border bg-fvtLavender-100 h-10 rounded-lg shadow-sm cursor-pointer active:scale-95" type="submit" value="Submit!" id="submit_button"/>
          </form>
      </div>
    </main>
  );
}

export default Main;