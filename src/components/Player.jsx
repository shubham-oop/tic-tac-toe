import { useState } from "react";

export default function Player({initialName, symbol, isActive, onNameChange}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick(){
        setIsEditing((isEditing) => !isEditing);
        if(isEditing) onNameChange(symbol, playerName);
    }
    function handleChange(event){
        setPlayerName(event.target.value);
    }
    let editiablelayerName = <span className="player-name">{playerName}</span>;
    if(isEditing) editiablelayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    return (
        <li className={isActive?'active':undefined}>
          <span className="player">
          {editiablelayerName}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{isEditing? "Save":"Edit"}</button>
        </li>
    );
}