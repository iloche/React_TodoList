import style from './Header.module.scss';

const Header = () => {
    return (
        <header className={style.header}>
            <img src="/logo.png" alt="Logo App" />
            <p>Exercice React - TodoList</p>
        </header>
    );
};

export default Header;
