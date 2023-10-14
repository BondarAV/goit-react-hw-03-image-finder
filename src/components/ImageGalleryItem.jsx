export const ImageGalleryItem = ({ webformatURL, id }) => {
  return (
    <li className="gallery-item" key={id}>
      <img src={webformatURL} alt="" id={id} />
    </li>
  );
};
