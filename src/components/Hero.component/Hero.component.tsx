import './hero-styles.css';

interface HeroProps {
    backgroundImage: string;
    title: string;
}

const HeroComponent: React.FC<HeroProps> = ({ backgroundImage, title }) => {
    return (
        <div
            className="hero"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="hero-overlay">
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default HeroComponent