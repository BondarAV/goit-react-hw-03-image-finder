import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ data }) => {
  const unfoldedData = data[0];

  if (unfoldedData === undefined) return;
  console.log('boba', unfoldedData[0].id);

  return (
    <ul className="gallery">
      {unfoldedData.map(element => {
        console.log('ass', element.id);
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
