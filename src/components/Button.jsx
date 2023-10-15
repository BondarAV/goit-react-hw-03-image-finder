export const Button = ({ loadMore, checkIsLoadMore, currentQuery }) => {
  if (currentQuery === null || currentQuery === undefined) return;

  const isLoadMore = true;

  const handleClick = () => {
    loadMore(isLoadMore);
    checkIsLoadMore(isLoadMore);
  };

  return (
    <button className="load-more" type="button" onClick={handleClick}>
      Load more
    </button>
  );
};
