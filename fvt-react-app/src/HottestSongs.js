import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './components/Footer';
import { Divider } from '@mui/material';

export function HottestSongs() {
  const [songsList, setSongsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fvt-backend.onrender.com/api/v1/hottest_songs');

        const { hottestSongs } = response.data;
        
        if (!hottestSongs) {
          setError('Unable to fetch hottest songs');
          return;
        }

        const songs = Object.keys(hottestSongs).map(songRank => {
          const song = hottestSongs[songRank];

          return (
            <div key={song.rank} className='p-6 w-full mb-4 lg:w-[40%] h-1/3 shadow-md hover:shadow-lg border-[1px] rounded-lg space-y-2'>
              <h3><strong className='text-fvtLavender-200'>Title:</strong> {song.title}</h3>
              <Divider/>
              <p><strong className='text-fvtLavender-200'>Artist:</strong> {song.artist}</p>
              <Divider />
              <p><strong className='text-fvtLavender-200'>Rank:</strong> {song.rank}</p>
              <Divider />
              <p><strong className='text-fvtLavender-200'>Last Week:</strong> {song['last week']}</p>
            </div>
          );
        });

        setSongsList(songs);
        
      } catch (error) {
        setError('Error fetching data');
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
    <section className="main">
      {
        songsList.length > 0 ? (
          <div className='flex flex-col items-center gap-6'>
            <h1 className='text-[24px] lg:text-[32px] text-center'>Here are the <span className='text-fvtLavender-200'>top 10</span> hottest songs in the world right now</h1>
            <div className='flex flex-col items-center justify-center lg:flex-row lg:flex-wrap gap-5'>
              {songsList}
            </div>
          </div>
        ) : <div className='p-10'><strong>Loading...</strong></div>
      }
    </section>
    <Footer/>
    </>
  );
}