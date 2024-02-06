import { Input, } from 'antd';
import { changeSearch } from '../../redux/issues/issuesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const { Search } = Input;

const Form = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const onSearch = (value: string) => {
dispatch(changeSearch(value))
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