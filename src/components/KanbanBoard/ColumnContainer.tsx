import { Card } from "antd";
import { Column, IssueType } from "../../shared/types";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import IssueCard from "./IssueCard";
import { useMemo } from "react";

interface Props {
  column: Column;
  issues: IssueType[];
}

const ColumnContainer = ({ column, issues }: Props) => {

  const issuesIds = useMemo(() => {
    return issues.map((issue) => issue.id);
  }, [issues]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={{ ...style, overflow: 'scroll' }}
        bodyStyle={{
          width: 400,
          height: "100%",
          textAlign: "center",
          backgroundColor: "red",
        }}
      ></Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={{ ...style, overflow: 'scroll', textAlign: "center", width: 400, height: '100%' }}
      {...attributes}
      {...listeners}
      title={column.title}
    >
        <SortableContext items={issuesIds}>
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue}></IssueCard>
          ))}
        </SortableContext>
    </Card>
  );
};

export default ColumnContainer;
