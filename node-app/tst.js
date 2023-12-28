const [songsList, setSongsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/hottest_songs');
        console.log(response)
        const { hottestSongs } = response.data;
        console.log(hottestSongs)
        if (!hottestSongs) {
          setError('Unable to fetch hottest songs');
          return;
        }
        const songs = Object.keys(hottestSongs).map(songRank => {
          const song = hottestSongs[songRank];
          return (
            <div key={song.rank} className='bg-gray-400 shadow-md rounded-xl'>
              <h3>{song.title}</h3>
              <p>
                <strong>Artist:</strong> {song.artist}<br />
                <strong>Rank:</strong> {song.rank}<br />
                <strong>Last Week:</strong> {song['last week']}<br />
              </p>
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