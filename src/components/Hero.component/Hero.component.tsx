import './hero-styles.css';

interface HeroProps {
    backgroundImage: string;
    title?: string;
    imageUrl?: string;
}

const HeroComponent: React.FC<HeroProps> = ({ backgroundImage, imageUrl, title }) => {
    return (
        <div
            className="hero"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="hero-overlay">
                {title && <h1>{title}</h1>}
                {imageUrl && <img src={imageUrl} alt="Hero Image" className='hero-image' />}
            </div>
        </div>
    )
}

export default HeroComponent