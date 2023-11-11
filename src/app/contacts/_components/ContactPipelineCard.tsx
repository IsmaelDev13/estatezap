import { useSortable } from "@dnd-kit/sortable";
import { Contact } from "@prisma/client";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface ContactPipelineCardProps {
  contact: Contact;
}

const ContactPipelineCard = ({ contact }: ContactPipelineCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: contact.id,
    data: {
      type: "Contact",
      contact,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        className="opacity-30 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2  border-2 border-rose-500 cursor-grab relative"
        ref={setNodeRef}
        style={style}
      >
        Dragging task
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className=" p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p>
        {contact.firstName} {contact.lastName}
      </p>

      {/* {task.content}
    {mouseIsOver && (
      <button
        onClick={() => {
          deleteTask(task.id);
        }}
        className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
      >
        <Trash />
      </button>
    )} */}
    </div>
  );
};

export default ContactPipelineCard;
