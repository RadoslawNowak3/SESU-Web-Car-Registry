import { useHistory} from 'react-router-dom';
import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
function RedirectButton(props) {
    let history = useHistory();
    const [disabled, setDisabled] = useState(false);
    if(props.info) {
        if (props.info.condition === ("Lost" || "Totaled"))
            setDisabled(true);
        if (!disabled)
            return (
                <Button
                    onClick={() => {
                        history.push(
                            {
                                pathname: props.route + props.value,
                                state: props.info
                            }
                        );
                    }}>{props.text}</Button>
            )
        else
        {
            return(
                <div>
                    <button className="redir"
                            state = "disabled"
                    >{props.text}</button>
                </div>
            )
        }
    }
    else
    {
        return (
            <Button
                onClick={() => {
                    history.push(
                        {
                            pathname: props.route,
                            state: props.value
                        }
                    );
                }}>{props.text}</Button>
        )
    }
}

export default RedirectButton;