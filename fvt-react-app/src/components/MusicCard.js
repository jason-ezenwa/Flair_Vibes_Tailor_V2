import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MusicCard(props) {
  return (
    <Card sx={{ maxWidth: 345, width: 200, height: 360}}>
      <CardActionArea>
      <a href={props.track.link} target="_blank" rel="noreferrer">
        <CardMedia
          component="img"
          image={props.track.image}
          alt="Recommended music cover art"
          
        />
      </a>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{fontSize: '16px'}}>
          {props.track.title} by {props.track.artist}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" style={{position: 'relative'}}>
        <a href={props.track.link} target="_blank" rel="noreferrer">Listen on Spotify <i className="fa-brands fa-spotify fa-xl"></i></a>
        </Button>
      </CardActions>
    </Card>
  );
}