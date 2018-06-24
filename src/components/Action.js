import React from 'react'

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >Im a Button.</button>
        </div>
    )

}

export default Action;