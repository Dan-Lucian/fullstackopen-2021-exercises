function PersonForm(props) {
  const {
    addPerson,
    newName,
    handleChangeName,
    handleChangePhoneNumber,
    newPhoneNumber,
  } = props;
  
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number:{' '}
        <input
          type="tel"
          value={newPhoneNumber}
          onChange={handleChangePhoneNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
