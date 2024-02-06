import { Card } from "antd";
import { IssueType } from "../../shared/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  issue: IssueType;
}

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
    
    const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    };
    
    if (isDragging) {
        return <Card ref={setNodeRef} style={{ ...style, height: 100, backgroundColor: 'green'}}></Card>;
    }

    return (
        <Card {...attributes} {...listeners} ref={setNodeRef} style={{ ...style, height: 100, marginBottom: 10, overflow: 'hidden' }}>{issue.title}</Card>
    )
};

export default IssueCard;
