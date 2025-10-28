import { CheckIcon } from '../Icons/icons'
import './SnackBar.css'


const SnackBar = ({ open, message }) => {
    return (
        <>
            <div style={{
                visibility: open ? "visible" : "hidden"
            }} id='snack-bar'>
                <span>
                    <CheckIcon />
                </span>
                <p>
                    {message}
                </p>
            </div>
        </>
    )
}

export default SnackBar