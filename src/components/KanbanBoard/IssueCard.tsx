import { Typography, Flex, Divider } from "antd";
import { IssueType } from "../../shared/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  issue: IssueType;
}

const { Text } = Typography;

const IssueCard = ({ issue }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issue.id,
    data: {
      type: "Issue",
      issue,
    },
  });

  function getDaysDifferenceFromDate(dateString: string): number {
    const currentDate: Date = new Date();
    const providedDate: Date = new Date(dateString);
    
    const timeDifference: number = currentDate.getTime() - providedDate.getTime();

    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  }
  
  
    
    const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    };
    
    if (isDragging) {
        return <Flex ref={setNodeRef} style={{ ...style, display: 'flex', minHeight: 100, padding: 8, opacity: 30, borderRadius: 12, borderWidth: 2, borderColor: 'red', backgroundColor: 'green', cursor: 'grab', position: 'relative' }} children={undefined}></Flex>;
    }

    return (
      <Flex ref={setNodeRef} {...attributes} {...listeners} style={{ ...style, flexDirection: 'column', minHeight: 100, justifyContent: 'space-around', padding: 8, borderRadius: 12, border: '1px solid black', cursor: 'grab'}}>
        <Text strong>{issue.title}</Text>
        <Text type="secondary">#{issue.number} opened {getDaysDifferenceFromDate("2024-02-08T01:33:25Z")} days ago</Text>
        <Text type="secondary">{issue.name} <Divider type="vertical" /> Comments: {issue.comments}</Text>
      </Flex>
    )
};

export default IssueCard;
