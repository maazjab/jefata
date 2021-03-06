import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { AdvertsCollection } from '../../../api/AdvertsCollection';
import { useTracker } from 'meteor/react-meteor-data';
import useStyles from './styles';
import RoomIcon from '@material-ui/icons/Room';


const AdvertDetails = () => {
    
    const classes = useStyles();

    const { _id } = useParams();
    const [coords, setCoords] = useState(null);

    const advert = useTracker(() => AdvertsCollection.findOne({_id}))

    const changeMainImage = (element) => {
        const mainImage = document.getElementById('main_image');
        mainImage.src = element.target.currentSrc;
    }

    useEffect(() => {
        setCoords({ lat: Number(advert.lat), lng: Number(advert.lng )})
        console.log(coords)
    }, [])
    return (
        <Container maxWidth='lg' className={classes.container}>
            <Card elevation={3}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={5} className={classes.first}>
                            <img src={advert?.images[0]} id='main_image' className={classes.firstMainImg} />
                            <Box className={classes.otherImgContainer}>
                                {advert?.images.map((image, i) => (
                                    <li key={i} style={{ listStyle: 'none' }}>
                                        <img src={image} className={classes.firstOtherImg} onClick={changeMainImage} />
                                    </li>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7} className={classes.second}>
                            <Box display='flex' justifyContent='space-between'>
                                <h1>{advert.name}</h1>
                                <h1>{advert.price}</h1>
                            </Box>
                            <Box>
                                {advert.description}
                            </Box>
                            <div className={classes.secondMap}>
                                <GoogleMapReact
                                   bootstrapURLKeys={{ key: 'AIzaSyCV0fwaxcIODNSeKnxTrNP0pYh8zeTRTiA' }}
                                   center={coords}
                                   defaultZoom={14}
                                   margin={[50, 50, 50, 50]}
                                >
                                 <div
                                  lat={Number(advert.lat)}
                                  lng={Number(advert.lng)}
                                 >
                                     <RoomIcon style={{ color: 'red', fontSize: 30}}/>
                                 </div>
                                </GoogleMapReact>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default AdvertDetails;