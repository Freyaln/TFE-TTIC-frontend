import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useEffect, useState } from 'react';

interface IPhotosDefinition {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
const HomeList: React.FC = ({}) => {
    const [photos, setPhotos] = useState<IPhotosDefinition[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [ fetchPhotos ] = usePhotosMutation();
    const maxWidth = 0.95 * screen.width;
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=100')
            .then((res) => res.json())
            .then((data) => setPhotos(() => data))
            .catch((error) => console.error(error));
        setIsLoading(false);
    }, []);

    console.log(photos);

    return (
        <Box>
            {!isLoading && (
                <ImageList cols={2} sx={{ width: maxWidth, height: 'auto', margin: '0 auto', marginTop: '1rem' }}>
                    {photos.map((i) => (
                        <ImageListItem key={i.id}>
                            <img src={`${i.url}?w=248&fit=crop&auto=format`} alt={i.title} loading="lazy" />
                            <ImageListItemBar title={i.title}></ImageListItemBar>
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>
    );
};

export default HomeList;
