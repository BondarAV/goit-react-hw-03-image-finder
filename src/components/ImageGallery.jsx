import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ data, getTargetImgID }) => {
  if (data === undefined) return;

  return (
    <ul className="gallery" onClick={getTargetImgID}>
      {data.map(element => {
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
