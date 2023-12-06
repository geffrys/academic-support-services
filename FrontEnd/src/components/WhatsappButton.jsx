import "../css/wppIcon.css";
import wppicon from "../img/wppicon.png";

function WhatsappButton() {
    
    let message = "Hello, I'm interested in your services, can you give me more information?";

    return (
        <>
            <div className="wpp-icon-container">
                <a href={`https://wa.me/+573006664326?text=${message}`} target="_blank">
                    <img src={wppicon} alt="icono de whatsapp"/>
                </a>
            </div>
        </>
    )
}

export default WhatsappButton;