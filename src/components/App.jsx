import { Component } from 'react';

import { getImageList } from 'api';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

import { perPage } from 'api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    targetImg: '',
    isModalOpen: false,
    isLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    if (this.shouldUpdate(prevState)) {
      this.handleQuery(this.state.query, this.state.isLoadMore);
    }
  }

  shouldUpdate = prevState =>
    prevState.query !== this.state.query || prevState.page !== this.state.page;

  checkIsLoadMore = currentIsLoadMore => {
    this.setState({ isLoadMore: currentIsLoadMore });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  loadData = query => {
    this.setState(prevState => {
      if (prevState.query !== query) {
        return { query: query, page: 1 };
      }
    });
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
    // console.log('cum');
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

  getTargetImgID = largeImage => {
    this.setState({
      targetImg: largeImage,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div className="App">
        <Searchbar
          loadData={this.loadData}
          checkIsLoadMore={this.checkIsLoadMore}
        />

        {this.state.loading && <Loader />}

        <ImageGallery
          data={this.state.images}
          getTargetImgID={this.getTargetImgID}
        />

        {this.state.images.length >= 12 &&
          !this.state.loading &&
          this.state.images.length >= this.state.page * perPage && (
            <Button
              loadMore={this.loadMore}
              checkIsLoadMore={this.checkIsLoadMore}
              currentQuery={this.state.query}
            />
          )}

        {this.state.isModalOpen && (
          <Modal
            targetImg={this.state.targetImg}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
