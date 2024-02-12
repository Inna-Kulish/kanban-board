import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, notification } from "antd";
import { fetchIssues, fetchStars } from "./redux/issues/operations";
import NavBar from "./components/NavBar/NavBar";
import BreadCrumbs from "./components/NavBar/BreadCrumbs";
import Form from "./components/Form/Form";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import { AppDispatch, RootState, useAppDispatch } from "./redux/store";
import { changeIssues, changeSearch } from "./redux/issues/issuesSlice";

const App = (): JSX.Element => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch: AppDispatch = useAppDispatch();
  const searchValue = useSelector((state: RootState) => state.issues.search);
  const repoChanges = useSelector((state: RootState) => state.issues.repoChanges);
  const error = useSelector((state: RootState) => state.issues.error);

  useEffect(() => {
    if (!searchValue) return;

  const matchingItem = repoChanges.find(item => Object.keys(item).includes(searchValue));

  if (matchingItem) {
    dispatch(changeSearch(searchValue));
    dispatch(changeIssues(matchingItem[searchValue]));
  } else {
    dispatch(fetchIssues(searchValue));
    } 
  dispatch(fetchStars(searchValue))
  }, [dispatch, repoChanges, searchValue]);

  useEffect(() => {
    function openNotificationWithIcon() {
    api['error']({
      message: 'Oops! Something went wrong.',
      description:
        'Sorry, no issues found for this query',
    });
    }
    
    if (error) {
      openNotificationWithIcon();
    }
  }, [api, error])

  

  return (
    <Layout>
      {contextHolder}
      <NavBar />
      <Form />
      {searchValue && <BreadCrumbs />}
      <KanbanBoard />
    </Layout>
  );
};

export default App;
