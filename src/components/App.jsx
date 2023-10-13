import { Component } from 'react';

import { getImageList } from 'api';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

import { Loader } from './Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
  };

  loadMore = isLoadMore => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.handleQuery(this.state.query, isLoadMore);
      }
    );
  };

  loadData = (query, isLoadMore) => {
    this.setState(
      _ => ({ query: query, page: 1 }),
      () => {
        this.handleQuery(query, isLoadMore);
      }
    );
  };

  sortData = data => {
    this.setState(prevState => ({
      images: [
        ...prevState.images,
        ...data.map(element => {
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
    this.setState({ loading: true });

    getImageList(query, this.state.page)
      .then(response => {
        if (response.data.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else if (query.trim() === '') {
          alert('Please, enter a non-empty query');
        } else {
          if (!isLoadMore) {
            this.setState(_ => ({ images: [] }));
          }

          this.sortData(response.data.hits);
        }
      })
      .catch(error => {
        alert(`Action failed with error: ${error}`);
      });

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <Searchbar loadData={this.loadData} />

        {this.state.loading && <Loader />}

        <ImageGallery data={this.state.images} />

        {this.state.images.length >= 12 && !this.state.loading && (
          <Button loadMore={this.loadMore} currentQuery={this.state.query} />
        )}
      </div>
    );
  }
}
