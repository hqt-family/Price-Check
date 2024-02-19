import { Input, Typography } from "antd";
import { useDebouncedCallback } from "use-debounce";

function SearchForm({ isLoadingProduct, valueSearch, setValueSearch }) {
  const debounced = useDebouncedCallback((value) => {
    setValueSearch(value);
  }, 1000);
  return (
    <Input.Search
      addonBefore={<Typography.Text strong>Tìm kiếm</Typography.Text>}
      placeholder="Nhập tên của sản phẩm..."
      defaultValue={valueSearch}
      onChange={(e) => debounced(e.target.value)}
      loading={isLoadingProduct}
      enterButton="Tìm kiếm"
      size="large"
    />
  );
}

export default SearchForm;
