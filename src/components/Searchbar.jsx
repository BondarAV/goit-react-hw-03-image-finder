export const Searchbar = ({ loadData }) => {
  const isLoadMore = false;

  const hadleSubmit = event => {
    event.preventDefault();

    loadData(event.target.lastChild.value, isLoadMore);
  };

  return (
    <header className="Searchbar">
      <form className="form" onSubmit={hadleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};