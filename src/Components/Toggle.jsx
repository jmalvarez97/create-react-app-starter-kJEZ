import "../Styles/Toggle.css";

export const Toggle = ({setCurrentSala, currentSala, }) => {
    return (
        <div className="switch-container">
          <span className="sala-label">Placa 1</span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => setCurrentSala(currentSala === 1 ? 3 : 1)}
              checked={currentSala === 3}
            />
            <span className="slider"></span>
          </label>
          <span className="sala-label">Placa 2</span>
        </div> 
    )
}