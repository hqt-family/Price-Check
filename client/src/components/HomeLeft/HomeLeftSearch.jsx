function HomeLeftSearch({ value, setValue }) {
  return (
    <div className="home-left-search">
      <strong>Danh sách sản phẩm</strong>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search-product"
            name="search-product"
            placeholder="Nhập tên sản phẩm cần tìm kiếm"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default HomeLeftSearch;
