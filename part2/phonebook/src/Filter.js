const Filter = ({ newFilter, handleChangeFilter }) => (
  <p>
    filter shown with{' '}
    <input value={newFilter} onChange={handleChangeFilter} type="text" />
  </p>
);

export default Filter;
