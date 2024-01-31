import { Breadcrumb } from "antd";

const BreadCrumbs = () => {
  return (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: "Home",
          href: "",
        },
        {
          title: "Board",
          href: "",
        },
      ]}
    />
  );
};

export default BreadCrumbs;
