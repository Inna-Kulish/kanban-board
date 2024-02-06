import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { fetchIssues } from './redux/issues/operations';
import NavBar from "./components/NavBar/NavBar";
import BreadCrumbs from "./components/NavBar/BreadCrumbs";
import Form from "./components/Form/Form";
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import { AppDispatch, RootState, useAppDispatch } from './redux/store';

const App = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const searchValue = useSelector((state: RootState) => state.issues.search)

  useEffect(() => {
    if (!searchValue) return;
    
    dispatch(fetchIssues(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Layout>
      <NavBar />
      <BreadCrumbs />
      <Form />
      <KanbanBoard/>
    </Layout>
  )
}

export default App
