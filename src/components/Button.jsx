export const Button = ({ loadMore, currentQuery }) => {
  if (currentQuery === null || currentQuery === undefined) return;

  const isLoadMore = true;

  const handleClick = () => {
    loadMore(isLoadMore);
  };

  return (
    <button type="button" onClick={handleClick}>
      Load more
    </button>
  );
};
