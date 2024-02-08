import { Typography, Layout } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {

  return (
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title italic style={{color: 'white'}}>KANBAN</Title>
      </Header>
  );
};

export default NavBar;