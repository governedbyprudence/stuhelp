import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ name, email, deleteFunc }) => {
  return (
    <div className="listItem">
      <div className="textFields">
        <h2>{name}</h2>
        {email ? <h3>{email}</h3> : null}
      </div>
      <div
        className="icon"
        onClick={() => {
          deleteFunc();
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
};

export default ListItem;
