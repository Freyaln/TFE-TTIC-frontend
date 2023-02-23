import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IPhotosState, setPhotosDatas } from '../slices/recipesSlices';
import { usePhotosMutation } from '../services/photos.api';
import { useDispatch, useSelector } from 'react-redux';

export interface IPhotosDefinition {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
const HomeList: React.FC = ({}) => {
    //const [photos, setPhotos] = useState<IPhotosDefinition[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fetchPhotos] = usePhotosMutation();
    const dispatch = useDispatch();
    const maxWidth = 0.95 * screen.width;

    // TODO FIX THIS ERROR
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const photos = useSelector((state: IPhotosState) => state.photos['photos']);
    useEffect(() => {
        (async () => {
            const datas = await fetchPhotos().unwrap();
            dispatch(setPhotosDatas(datas));
            //setPhotos(datas);
            setIsLoading(false);
        })();
    }, [dispatch]);

    return (
        <Box>
            {photos && (
                <ImageList cols={2} sx={{ width: maxWidth, height: 'auto', margin: '0 auto', marginTop: '1rem' }}>
                    {photos.map((i: IPhotosDefinition) => (
                        <ImageListItem key={i.id}>
                            <Link to={`/recipe/${i.title}`}>
                                <img src={`${i.url}?w=248&fit=crop&auto=format`} alt={i.title} loading="lazy" />
                            </Link>
                            <ImageListItemBar title={i.title}></ImageListItemBar>
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>
    );
};
export default HomeList;
