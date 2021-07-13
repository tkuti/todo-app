import Card from './Card'
import { FaTrashAlt } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';

const Dashboard = ({ datas, setChanges, id, deleteDashboard, createCard, editCard, deleteCard, drag, allowDrop, drop, copyCard }) => {

    return (

        <div className="dashboard" >
            <form onSubmit={(e) => { e.preventDefault(); e.target.firstChild.blur() }}>
                <input type="text" name="title"
                    title="click to edit"
                    onChange={(e) => setChanges(e, id)} value={datas.name} >
                </input>
                <div className="iconContainer"
                    onClick={() => deleteDashboard(id)}>
                    <FaTrashAlt title="Delete dashboard" />
                </div>
                <input type="submit" id="dashboard-submit"></input>
            </form>
            <div className="cards"
                onDrop={(ev) => drop(ev, id)}
                onDragOver={(ev) => allowDrop(ev)}>
                {datas.cards.map(obj =>
                    <Card datas={obj} key={obj.idCard} id={id}
                        editCard={editCard}
                        deleteCard={deleteCard}
                        drag={drag}
                        copyCard={copyCard}
                    />)}
                <div className="iconContainer"
                    onClick={() => createCard(id)}>
                    <BsPlusCircle title="New card" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
