import { Input, Typography } from "antd";

function SearchForm({ valueSearch, setValueSearch }) {
  return (
    <Input.Search
      addonBefore={<Typography.Text strong>Tìm kiếm</Typography.Text>}
      placeholder="Nhập tên của sản phẩm..."
      defaultValue={valueSearch}
      onChange={(e) => setValueSearch(e.target.value)}
      enterButton
    />
  );
}

export default SearchForm;
