import { useState, useRef } from "react";
import TaskForm from "../../TaskForm/TaskForm"
import TaskList from "../../TaskList/TaskList";

const TodoList = () => {

    //* State avec les tâches (par défaut, une liste vide)
    const [tasks, setTasks] = useState([]);
    
    //* Variable pour mémoriser le précedent ID des tâches (hors state => fonctionnement interne)
    //* - Utilisation d'unee ref pour créer une persistance de donnée
    const taskId = useRef(0);

    //* Gestion des données reçu depuis le formulaire
    const handleNewTask = (newTask) => {
        // console.log('newTask', newTask);

        //* Créer une tâche avec les valeurs du formulaire et l'id
        const task = {
            // name : newTask.name,
            // description : newTask.description,
            // priorite : newTask.priorite,
            ...newTask, //* Permet de copier TOUTES les valeurs de "newTask" dans "task" comme en commentaire
            id : taskId.current,
            isDone : false
        }

        //* Incrémentation de l'id des tâches (mémorisés paar la ref)
        taskId.current++;

        //* Ajouter la tâche dans la liste
        setTasks(prevTasks => [...prevTasks, task]); //* Utilisation de la syntaxe spread (...) pour prendre toutes les tâches existantes et ajouter la nouvelle tâche à la fin de la liste. C'est comme si on les sortait de leur boîte pour les mettre dans une boîte plus grande
    }

    //* Gestion de la suppression d'un élément via un event de la "TaskList"
    const handleDeleteTask = (taskId) => {
        // console.log('Mon super console', taskId);
        
        // //? V1 Utilisation de 'splice' (Version un peu longue à écrire mais ça marche :3)
        // setTasks(tasks => {
        //     const copy = structuredClone(tasks);
            
        //     //* Supprimer l'élément
        //     const indexTarget = copy.findIndex(element => element.id === taskId)
        //     copy.splice(indexTarget, 1)

        //     //* Renvoyer la copie modifiée
        //     return copy;
        // })

        //? V2 Utilisation de 'toSliced'
        // setTasks(tasks => tasks.toSpliced(tasks.findIndex(element => element.id === taskId), 1))

        //? V3 Utilisation de 'filter'
        setTasks((tasks => tasks.filter(element => element.id !== taskId)))
    }

    //* Gestion de la finission d'un élément via un event de la "TaskList"=
    const handleFinishTask = (taskId) => {
        // //? V1 Récupération d'un élément et sa validation
        // setTasks(tasks => {
        //     const copy = structuredClone(tasks);

        //     const taskTarget = copy.find(element => element.id === taskId)

        //     taskTarget.isDone= true;

        //     return copy;
        // })

        //? V2 Utilisation de la fonction "map" pour mettre à l'état des tâches. 
        //? Pour chaque tâche, si l'identifiant ne correspond pas à taskId, la tâche reste inchangée.
        //? Si l'identifiant correspond à taskId, la tâche est mise à jour avec isDone : true.
        setTasks(tasks => tasks.map(element => 
            (element.id !== taskId) ? element : { ...element, isDone : true }))

    }

    return (
        <>
        <h2>Ajouter une tâche</h2>
        {/* //* Formulaire */}
        <TaskForm onTaskSubmit={handleNewTask}/>

        <h2>Liste des tâches</h2>
        {/* //* Liste de tâche */}
        <TaskList tasks={tasks} onTaskDelete={handleDeleteTask} onTaskFinish={handleFinishTask}/>
        </>
    )
}

export default TodoList;