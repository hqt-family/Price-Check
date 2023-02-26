function HomeLeftSearch({ value, setValue }) {
  return (
    <div className="home-left-search">
      <strong>Lựa chọn sản phẩm cần kiểm tra</strong>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search-product"
            name="search-product"
            placeholder="Nhập tên của sản phẩm..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default HomeLeftSearch;
