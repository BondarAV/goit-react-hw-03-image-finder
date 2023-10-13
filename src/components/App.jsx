import { Component } from 'react';

import { getImageList } from 'api';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
  };

  sortData = data => {
    this.setState(prevState => ({
      images: [
        ...prevState.images,
        data.map(element => {
          return {
            id: element.id,
            largeImageURL: element.largeImageURL,
            webformatURL: element.webformatURL,
          };
        }),
      ],
    }));
  };

  handleQuery = (query, isLoadMore) => {
    getImageList(query, this.state.page)
      .then(response => {
        console.log(response.data.hits);
        if (response.data.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else if (query.trim() === '') {
          alert('Please, enter a non-empty query');
        } else {
          if (!isLoadMore) this.state.images = [];

          this.sortData(response.data.hits);

          console.log('lula', this.state.images);
        }
      })
      .catch(error => {
        alert(`Action failed with error: ${error}`);
      });
  };

  render() {
    return (
      <div>
        <Searchbar handleQuery={this.handleQuery} />

        {/* <ImageGallery>
          <ImageGalleryItem data={this.state.images} />
        </ImageGallery> */}

        <ImageGallery data={this.state.images} />
      </div>
    );
  }
}
