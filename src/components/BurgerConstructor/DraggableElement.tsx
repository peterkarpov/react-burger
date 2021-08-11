import { useDrag, useDrop } from "react-dnd";

function DraggableElement(props: any) {

    const [{ opacity }, dragRef] = useDrag({
        type: 'constructor-ingredients',
        item: {
            id: props.id,
            oldIndex: props.index
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1,
        })
    });

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'constructor-ingredients',
        collect: (monitor: any) => ({
            isHover: monitor.isOver()
        }),
        drop(item: any) {

            props.onMoveItem(item.id, props.id, item.oldIndex, props.index);

        },
    });

    return (
        <>
            <span style={{ 
                outline: `2px dashed ${isHover ? '#4c4cff' : 'transparent'}`,
                //  paddingBottom: `${isHover ? '100px' : '0'}`
                 }} ref={dragRef}>
                <span style={{ 
                    opacity: opacity, 
                    cursor: 'grab', 
                    // display: `${opacity === 0 ? 'none' : 'inherit'}` 
                    }} ref={dropTarget}>

                    {props.children}

                </span>
            </span>

        </>
    );
}

export default DraggableElement;