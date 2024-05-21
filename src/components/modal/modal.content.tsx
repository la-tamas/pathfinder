import { FunctionComponent } from 'react'

type ModalContentProps = {
    content: string[]
}

const ModalContent: FunctionComponent<ModalContentProps> = ({ content }) => {

    return (
        <div className="p-6 space-y-6">
            {
                content.map((item, index) => (
                    <p key={`dialog-item-${index}`} className="text-white">
                        {item}
                    </p>
                ))
            }
        </div> 
    )
}

export default ModalContent;
