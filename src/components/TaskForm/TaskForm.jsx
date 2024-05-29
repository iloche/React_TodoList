import { useId, useRef, useState } from 'react';
import style from './TaskForm.module.scss'

//* Le composant "TaskForm"
const TaskForm = ({
    onTaskSubmit = () => {} //! Props "event" avec une NOOP par défaut (NOOP -> No Operation)
}) => {

    //* Génération d'un ID pour l'accessibilité du formulaire
    const formId = useId();

    //* State pour les éléments du formulaire
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priorite, setPriorite] = useState('normal');

    //* Utilisation d'une "ref" pour intéragir avec une balise (Access impératif)
    //* - Nécessite de le lier avec la balise -> "ref={inputRef}"
    //* - Il est possible d'interagir avec la balise via la propriété "current"
    const inputRef = useRef();

    //* Gestion du submit du formulaire
    const handleFormSubmit = (e) => {
        //* Désactivation du comportement par défaut du navigateur
        e.preventDefault();

        //* Les données à envoyer
        const data = {
            name,
            description,
            priorite
        }

        //* Envoyer les données au composant parent via la props "OnTaskSubmit"
        onTaskSubmit(data);

        //* CleanUp du formulaire
        setName('');
        setDescription('');
        setPriorite('normal');

        //* Placer le focus sur l'input "name"
        inputRef.current.focus();
    }

    //* Rendu
    return (
        <form className={style['form-task']} onSubmit={handleFormSubmit}>

            <label htmlFor={formId+'-name'}>Nom</label>
            <input id={formId+'-name'} type="text" value={name} onChange={e => setName(e.target.value)} required ref={inputRef}/>

            <label htmlFor={formId+'-descrription'}>Description</label>
            <textarea id={formId+'-description'} value={description} onChange={e => setDescription(e.target.value)}/>

            <label htmlFor={formId+'-priorite'}>Priorité</label>
            <select id={formId+'-priorite'} value={priorite} onChange={e => setPriorite(e.target.value)} required> 
                <option value='basse'>Basse</option>
                <option value='normal'>Normal</option>
                <option value='urgent'>Urgent</option>
            </select>

            <button type="submit">Ajouter</button>

        </form>
    )
}

export default TaskForm;