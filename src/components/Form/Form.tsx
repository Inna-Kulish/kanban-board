import { Alert, Input } from "antd";
import { changeSearch } from "../../redux/issues/issuesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useState } from "react";

const { Search } = Input;

const Form = () => {
    const [warn, setWarn] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    
    const onSearch = (value: string) => {
        const regex = /[A-Z0-9._%+-]+\/[A-Z0-9._%+-]+$/i;
        
      if (regex.test(value.trim())) {
          setWarn(false);
          dispatch(changeSearch(value.trim()));
          return;
      } 
          setWarn(true);
  };

  return (
      <>
      <Search
        addonBefore="https://github.com/"
        placeholder="input owner/repo example 'facebook/react'"
        allowClear
        enterButton="Load issues"
        size="large"
        onSearch={onSearch}
      />
      {warn && <Alert message="Input owner and repo as 'facebook/react'" type="warning" />}
    </>
  );
};

export default Form;
