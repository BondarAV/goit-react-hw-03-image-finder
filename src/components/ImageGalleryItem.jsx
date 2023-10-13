export const ImageGalleryItem = ({ webformatURL, id }) => {
  // if (data === undefined) return;

  // console.log('poop', data);

  // return (
  //   <>
  //     {data.map(element => (
  //       <li className="gallery-item" key={element.id}>
  //         <img src={element.webformatURL} />
  //       </li>
  //     ))}
  //   </>
  // );
  console.log('popa', id);
  console.log('pipa', webformatURL);

  return (
    <li className="gallery-item" key={id}>
      <img src={webformatURL} />
    </li>
  );
};
