import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIssues } from './redux/issues/operations';
import { AppDispatch } from './redux/store';
import NavBar from "./components/NavBar/NavBar";
import BreadCrumbs from "./components/NavBar/BreadCrumbs";
import Form from "./components/Form/Form";
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import { Layout } from 'antd';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

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
