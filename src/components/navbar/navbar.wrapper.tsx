import { forwardRef, ChangeEventHandler } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { BiHelpCircle } from 'react-icons/bi'
import { algorithmNames, generatorNames } from '../../algorithms'
import useGridActions from '../../hooks/useGridActions'
import { AlgorithmTypes, GeneratorTypes } from '../../context/GridContext'
import { eventNames } from 'process'

const algorithms = Object.entries(algorithmNames)

const generators = Object.entries(generatorNames)

type NavbarWrapperProps = {
    onReset: () => void
}

const NavbarWrapper = forwardRef<HTMLDivElement, NavbarWrapperProps>((props, ref) => {
    const { onReset } = props
    const { resolve } = useGridActions()

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        event.preventDefault()
        resolve(event.currentTarget.value as AlgorithmTypes | GeneratorTypes)
    }

    const handleReset = () => {
        onReset();
    }

    const handleHelp = () => {
        // dispatch(toggleModal());
    }

    return (
        <div ref={ref} className="min-w-full h-14 min-h-20 bg-teal-800">
            <div className="flex flex-row py-2 px-3 max-h-full overflow-y-auto">
                <div className="absolute inline-flex min-h-12">
                <button 
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 rounded min-w-8"
                    onClick={handleReset}
                >
                    <GrPowerReset size={22} color="white" style={{ color: 'white' }} />
                </button>
                <select
                    onChange={handleChange}
                    className="appearance-none bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                    <option selected value="none" hidden>Solve</option>
                    {
                        algorithms.map((item, index) => (
                            <option key={`algorithm-${index}`}
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 min-w-8 rounded text-ellipsis"
                                value={item[0]}
                            >
                                {item[1]}
                            </option>
                        ))
                    }
                </select>
                <select
                    onChange={handleChange}
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                    <option selected value="none" hidden>Generate</option>
                    {
                        generators.map((item, index) => (
                            <option key={`generate-${index}`}
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 min-w-8 rounded text-ellipsis"
                                value={item[0]}
                            >
                                {item[1]}
                            </option>
                        ))
                    }
                </select>
                <button 
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 rounded"
                    onClick={handleHelp}
                >
                    <BiHelpCircle size={22} color="white" style={{ color: 'white' }} />
                </button>
                </div>
            </div>
        </div>
    )
});

export default NavbarWrapper;