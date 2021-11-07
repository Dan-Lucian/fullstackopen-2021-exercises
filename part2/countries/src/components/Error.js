const Error = ({ error }) => {
  console.log(error);
  return (
    <>
      <p>{error.message}</p>
    </>
  );
};

export default Error;
