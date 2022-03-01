import { v4 as uuidv4 } from 'uuid';

export const Select = ({options, containerStyle, handleChange = () => {}, selectedOption = null, ...rest}) => {
    const selectContainerStyle = containerStyle ? containerStyle : "outline-none border-2 border-solid rounded-md p-2 max-w-max bg-gray-100"
    return (
        <select className={selectContainerStyle} onChange={handleChange} value={selectedOption} {...rest}>
            { options && options.map((option) => (
                <option key={uuidv4()} value={option.value}>{option.label}</option>
            )) }
        </select>
    )
}