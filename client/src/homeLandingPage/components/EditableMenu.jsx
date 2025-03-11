import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from "../../style";
import EditableProductCard from './EditableProductCard';
import NewProductCard from './NewProductCard';

const SortableProductCard = ({ id, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`${props.rowSpan} ${props.colSpan}`}
    >
      <EditableProductCard {...props} />
    </div>
  );
};

const EditableMenu = (props) => {
  const [cards, setCards] = useState([
    { id: '1', icon: "fa-solid fa-faucet", name: "Su", status: "Açık", isIncludePercantage: false, rowSpan: "row-span-2", colSpan: "col-span-2", color: "bg-yellow-600" },
    { id: '2', icon: "fa-regular fa-lightbulb", name: "Koltuk Işık", status: "Açık", isIncludePercantage: false, rowSpan: "row-span-8", colSpan: "col-span-2", color: "bg-green-600" },
    { id: '3', icon: "fa-solid fa-fire-flame-simple", name: "Şömine", status: "Açık", isIncludePercantage: false, rowSpan: "row-span-2", colSpan: "col-span-2", color: "bg-red-600" },
    { id: '4', icon: "fa-regular fa-lightbulb", name: "Oda Lambasi", status: "100", isIncludePercantage: true, rowSpan: "row-span-4", colSpan: "col-span-2", color: "bg-blue-300" }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col items-center w-full min-h-[300px] max-w-[450px] col-span-1 border border-slate-200 rounded-md p-4 shadow-md">
        <div className="flex w-full items-center justify-between px-1">
          <input className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border
           border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none
            focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            value={props.name} />
          {/*           
          <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            Oturma Odası
          </p> */}
          
          <p className={`${styles.paragraph} text-primary max-w-[400px] mt-5 text-center md:text-start`}>
            <i className="fa-solid fa-trash text-red-800 font-bold"></i>
          </p>
        </div>

        <div className="w-full grid grid-cols-4 auto-rows-fr gap-2">
          <SortableContext items={cards.map(card => card.id)}>
            {cards.map((card) => (
              <SortableProductCard
                key={card.id}
                id={card.id}
                icon={card.icon}
                name={card.name}
                status={card.status}
                isIncludePercantage={card.isIncludePercantage}
                rowSpan={card.rowSpan}
                colSpan={card.colSpan}
                color={card.color}
              />
            ))}
          </SortableContext>
          <NewProductCard/>
        </div>
      </div>
    </DndContext>
  );
};

export default EditableMenu;