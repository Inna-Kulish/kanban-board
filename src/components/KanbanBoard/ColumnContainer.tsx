import { Card } from "antd";
import { Column } from "../../shared/types";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";

interface Props {
    column: Column;
}

const ColumnContainer = ({ column }: Props) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <Card {...attributes} {...listeners} ref={setNodeRef} title={column.title} style={style} bodyStyle={{ width: 400, textAlign: "center",}}></Card>
)
}

export default ColumnContainer;