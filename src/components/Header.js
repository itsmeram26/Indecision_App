import React from 'react'

const Header = (props) => {
    return (
           <div>
                <h1>{props.title}</h1>
                <h2>{props.subTitle}</h2>
            </div>
        );

}

Header.defaultProps = {
    title: 'Indecision App'
}

export default Header;