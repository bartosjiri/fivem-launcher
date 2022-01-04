import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"

import selectStyle from "./Select.module.scss"

const Select = ({current, onSelect, options, className, ...other}) => {
  if (!current) {
    console.error("No current provided in the Select component.")
  }

  if (!options) {
    console.error("No options provided in the Select component.")

  }

  const initialSelected = current ? current : {label: "", value: null}

  const [selected, setSelected] = useState(initialSelected)

  const onSelectOption = (option) => {
    setSelected(option)
    onSelect(option.value)
  }

  return (
    <div className={`${selectStyle.select} ${className ? className : ""}`}>
      <div className={selectStyle.current}>
        <span>{selected.label}</span>
      </div>
      {options.length && (
        <div className={selectStyle.options}>
          {options
            .filter(o => o.value !== selected.value)
            .map(option => (
              <div
                className={selectStyle.option}
                key={option.value}
                value={option.value}
                onClick={() => onSelectOption(option)}
              >
                <span>{option.label}</span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default Select
