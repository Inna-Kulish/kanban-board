import { Breadcrumb, Flex, Space, Typography } from "antd";
import Icon, { StarFilled } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Text } = Typography;

const BreadCrumbs = () => {
  const searchRepo = useSelector((state: RootState) => state.issues.search);
  const stars = useSelector((state: RootState) => state.issues.stars);
  const [owner, repo] = searchRepo.split('/');
 
  return (
    <Flex gap={16} style={{alignItems: 'end'}}>
    <Breadcrumb
      style={{marginTop: 8, textTransform: 'capitalize', fontSize: 16}}
      separator=">"
      items={[
        {
          title: `${owner}`,
          href: `https://github.com/${owner}/`,
        },
        {
          title: `${repo}`,
          href: `https://github.com/${owner}/${repo}`,
        },
      ]}
      />
      <Space>
        <Icon component={StarFilled as React.ForwardRefExoticComponent<unknown>} style={{ display: 'block', color: 'gold', fontSize: 24 }}/>
        <Text>{Math.round(stars / 1000)} K stars</Text>
      </Space>
      </Flex>
  );
};

export default BreadCrumbs;
