import clsx from 'clsx';
import style from './TaskList.module.scss'
import { useId, useState } from 'react';

//* Composant qui représente un élément de la liste
const TaskItem = ({id, name, description, priorite, isDone, onDelete, onFinish}) => {
    return (
        <article className={clsx(style.task, isDone && style.finish)}>
            <div className={style.info}>
                <p>{name} {priorite === 'urgent' && <span className={style.urgent}></span>} </p>
                <p>{description}</p>
            </div>
            <div className={style.action}>
                <button disabled={isDone} onClick={() => onFinish(id)}>Terminer</button>
                <button onClick={() => onDelete(id)}>Supprimer</button>
            </div>
        </article>
    )   
}

//* Composant qui représente la liste
const TaskList = ({ 
    tasks = [], //! Props "tasks" pour obtenir la liste des tâches du parent (le nom peut être différent)
    onTaskDelete = () => { }, //! Props "onTaskDelete" pour informer le parent qu'on souhaite supprimer la tâche (Par défaut: NOOP)
    onTaskFinish = () => { } //! Props "onTaskFinish" pour informer le parent qu'on souhaite terminer la tâche 
}) => {
    
    const checkboxId = useId();
    const [taskFilter, setTaskFilter] = useState({
        urgent : true,
        normal : true,
        basse : true
    })

    const handleFilterAll = () => {
        //* Si tout est coché, on décoche tout. 
        if (taskFilter.urgent && taskFilter.normal && taskFilter.basse) {
            setTaskFilter({urgent: false, normal: false, basse: false})
        }
        //* Sinon, on coche tout
        else {
            setTaskFilter({urgent: true, normal: true, basse: true})
        }
    }

    const handleFilter = (e) => {

        const checkboxName = e.target.name; //* Ça va contenir uniquement "urgent", "normal" ou "basse" (attribut "name" des balises)

        setTaskFilter(taskF => ({
            ...taskF, //* Copie des valeurs actuelles du state
            [checkboxName] : !taskF[checkboxName] //* Modification de la valeur ciblé par le "name" de la checkbox
            //! NB: Utilisation de l'opérateur d'accès [] pour manipuler les propriétés du state (Objet) via le nom de la checkbox
        }))
    }

    //! Filtre de la liste, si nécessaire
    let tasksWithFilter;
    if(taskFilter.urgent && taskFilter.normal && taskFilter.basse){
        //* Pas d'application de filtre
        tasksWithFilter = tasks;
    } else {
        //* Application des filtres
        tasksWithFilter = tasks.filter(element => (taskFilter.urgent && element.priorite === "urgent")
                             || (taskFilter.normal && element.priorite === "normal")
                             || (taskFilter.basse && element.priorite === "basse"))
    }

    return (
        <>
            <div>
                <input type="checkbox" id={checkboxId+'-all'} onChange={handleFilterAll} checked={taskFilter.urgent && taskFilter.normal && taskFilter.basse}/>
                <label htmlFor={checkboxId+'-all'}>Tous</label>

                <input type="checkbox" id={checkboxId+'-urgent'} name="urgent" onChange={handleFilter} checked={taskFilter.urgent}/>
                <label htmlFor={checkboxId+'-urgent'}>Urgent</label>

                <input type="checkbox" id={checkboxId+'-normal'} name="normal" onChange={handleFilter} checked={taskFilter.normal} />
                <label htmlFor={checkboxId+'-normal'}>Normal</label>

                <input type="checkbox" id={checkboxId+'-basse'} name="basse" onChange={handleFilter} checked={taskFilter.basse} />
                <label htmlFor={checkboxId+'-basse'}>Basse</label>
            </div>
            <section className={style["task-list"]}>
                {/* //* La fonction "map" permet de transformer les élément d'une collection en une nouvelle (exemple, on a converti notre tableau JS en composant JSX) */}
            {tasksWithFilter.map(
                (task) => <TaskItem {...task} key={task.id} onDelete={onTaskDelete} onFinish={onTaskFinish}/> //* Si je mets un _ devant un paramètre, c'est pour dire que je ne l'ai pas utilisé mais j'ai dû le mettre. Ici pas besoin de l'index car on a l'ID. Ex: (task, _index)
            )}
            </section>
        </>
    )
}

export default TaskList;