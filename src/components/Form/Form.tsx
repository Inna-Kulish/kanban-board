import { Input,} from 'antd';
const { Search } = Input;

const Form = () => {
    const onSearch = () => {
console.log('a')
    }

    return (
        <Search
      placeholder="input search text"
      allowClear
      enterButton="Load issues"
      size="large"
      onSearch={onSearch}
    />
    )
}

export default Form;