import styles from '../../style';
import EditableMenu from './EditableMenu';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import NewCategoryCard from './NewCategoryCard';

const SortableMenu = ({ id, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <EditableMenu {...props} />
    </div>
  );
};

const EditableMain = () => {
  const [menus, setMenus] = useState([
    { id: '1', name: 'Oturma Odası', icon: 'fa-solid fa-faucet' },
    { id: '2', name: 'Menu 2', icon: 'fa-solid fa-faucet' },
    { id: '3', name: 'Menu 3', icon: 'fa-solid fa-faucet' },
    { id: '4', name: 'Menu 4', icon: 'fa-solid fa-faucet' },
    { id: '5', name: 'Menu 5', icon: 'fa-solid fa-faucet' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinates: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setMenus((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <section className={`flex sm:flex-row flex-col w-full justify-end items-center ${styles.paddingY}`}>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          <SortableContext items={menus.map((menu) => menu.id)}>
            {menus.map((menu) => (
              <SortableMenu key={menu.id} id={menu.id} name={menu.name} icon={menu.icon} />
            ))}
          </SortableContext>
          <NewCategoryCard />
        </div>
      </section>
    </DndContext>
  );
};

export default EditableMain;