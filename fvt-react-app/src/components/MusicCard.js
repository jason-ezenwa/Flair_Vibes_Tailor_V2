import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MusicCard() {
  return (
    <Card sx={{ maxWidth: 345, width: 150, height: 350}}>
      <CardActionArea>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <CardMedia
          component="img"
          image="./logo512.png"
          alt="green iguana"
          
        />
      </a>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Song Name by Artiste
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">
        <a href="https://google.com" target="_blank" rel="noreferrer">Listen on Spotify<i className="fa-brands fa-spotify fa-xl"></i></a>
        </Button>
      </CardActions>
    </Card>
  );
}