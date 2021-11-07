const Form = ({ country, handleCountryChange }) => (
  <form onSubmit={(e)=> e.preventDefault()}>
    find countries{' '}
    <input type="text" value={country} onChange={handleCountryChange} />
  </form>
);

export default Form;
