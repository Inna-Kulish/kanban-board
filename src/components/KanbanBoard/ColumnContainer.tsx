import { Divider, Flex } from "antd";
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
      <Flex
        ref={setNodeRef}
        style={{ ...style, display: 'flex', width: 450, height: 500, maxHeight: 500, }} children={undefined}></Flex>
    );
  }

  return (
    <Flex
      ref={setNodeRef}
      style={{...style, display: 'flex', flexDirection: 'column', width: 450, height: 500, maxHeight: 500, padding: 16, overflowX: 'hidden', overflowY: 'auto', backgroundColor: 'white', borderRadius: 6}}
    >
      <Divider {...attributes}
      {...listeners} orientation="left" plain style={{fontSize: 20, fontWeight: 600, cursor: 'grab'}}>
      {column.title }
    </Divider>
      <Flex
      style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 16,  overflowX: 'hidden', overflowY: 'auto' }}>
        <SortableContext items={issuesIds}>
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue}/>
          ))}
        </SortableContext>
        </Flex>
        
    </Flex>
  );
};

export default ColumnContainer;
