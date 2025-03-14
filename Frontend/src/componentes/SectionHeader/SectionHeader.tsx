import styles from './styles.module.css'

interface sectionHeaderProps {
    currentPage: string;
}

export default function SectionHeader({ currentPage } : sectionHeaderProps) {
    return(
        <div className={styles.sectionHeaderContainer}>
            <div className={currentPage == "cart" ? styles.tabHighlight : styles.tabDefault}>
                <svg aria-label="ícone de carrinho de compras" focusable="false" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse className={styles.strokeOnlyIcon} cx="46.7696" cy="49.0255" rx="4.30769" ry="4.30769" stroke="#A4A8B0" strokeWidth="3"/>
                    <ellipse className={styles.strokeOnlyIcon} cx="23.795" cy="49.0255" rx="4.30769" ry="4.30769" stroke="#A4A8B0" strokeWidth="3"/>
                    <path className={styles.strokeOnlyIcon} d="M50.7798 41.8462H20.2608C20.0374 41.8462 19.8411 41.6979 19.7799 41.483L18.8324 38.1538M13.8339 20.5919L12.6303 16.3631C12.5692 16.1482 12.3728 16 12.1494 16H9.58444H8M13.8339 20.5919L53.3588 21.5245C53.6676 21.5318 53.896 21.8146 53.8382 22.1181L50.8573 37.7475C50.8124 37.9833 50.6062 38.1538 50.3662 38.1538H18.8324M13.8339 20.5919L18.8324 38.1538" stroke="#A4A8B0" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <h3>Carrinho</h3>
            </div>
            
            <div className={currentPage == "favorites" ? styles.tabHighlight : styles.tabDefault}>
                <svg aria-label="ícone de coração" focusable="false" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles.fillOnlyIcon} d="M7.50044 14.7219C12.8699 9.35248 21.5754 9.35248 26.9449 14.7219L48.3338 36.1108L28.8893 55.5552L7.50043 34.1664C2.13099 28.7969 2.131 20.0914 7.50044 14.7219Z" fill="#A4A8B0"/>
                    <path className={styles.fillOnlyIcon}  d="M50.2773 14.7219C55.6467 20.0913 55.6467 28.7969 50.2773 34.1663L28.8884 55.5552L9.44396 36.1108L30.8329 14.7219C36.2023 9.35243 44.9079 9.35244 50.2773 14.7219Z" fill="#A4A8B0"/>
                </svg>
                <h3>Favoritos</h3>
            </div>
        </div>
    )
}