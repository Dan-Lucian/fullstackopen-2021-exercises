/* eslint-disable react/prop-types */
const FormCreate = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleCreateNote,
}) => (
  <form onSubmit={handleCreateNote}>
    <h2>create new</h2>
    <div>
      <label htmlFor="title">Title</label>
      <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        id="title"
        type="text"
      />
    </div>
    <div>
      <label htmlFor="author">Author</label>
      <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        id="author"
        type="text"
      />
    </div>
    <div>
      <label htmlFor="url">Url</label>
      <input
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        id="url"
        type="text"
      />
    </div>
    <button type="submit">create</button>
  </form>
);

export default FormCreate;
