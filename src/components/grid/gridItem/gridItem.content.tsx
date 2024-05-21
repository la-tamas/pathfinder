import { MouseEvent, MouseEventHandler, ReactNode, forwardRef } from 'react'

type GridItemContentProps = {
    children: ReactNode | ReactNode[] | JSX.Element
    classes: string
    onMouseOver: MouseEventHandler<HTMLDivElement>
    onClick: MouseEventHandler<HTMLDivElement>
}

const GridItemContent = forwardRef<HTMLDivElement, GridItemContentProps>((props, ref) => {
    const { children, classes, onMouseOver, onClick } = props;

    return (
        <div ref={ref}
            onMouseOver={onMouseOver}
            onMouseOverCapture={onMouseOver}
            onClickCapture={onClick}
            className={`w-full h-full ${classes}`}>
            {children}
        </div>
    )
})

export default GridItemContent