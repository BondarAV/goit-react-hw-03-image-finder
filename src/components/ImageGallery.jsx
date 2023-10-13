import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ data }) => {
  if (data === undefined) return;

  return (
    <ul className="gallery">
      {data.map(element => {
        // console.log('ass', element.id);
        return (
          <ImageGalleryItem
            webformatURL={element.webformatURL}
            id={element.id}
          />
        );
      })}
    </ul>
  );
};
