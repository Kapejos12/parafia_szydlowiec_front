import image404 from '../assets/404.svg';

const PageNotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "center", paddingTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "50%" }}>
                <img src={image404} alt='404' />
                <a href="https://pl.freepik.com/darmowe-wektory/blad-404-z-ilustracja-koncepcji-krajobrazu_20602785.htm#fromView=search&page=1&position=1&uuid=3ccf3456-fb11-4170-b25b-883d7cd2f6a9&query=404">Obraz autorstwa storyset na Freepik</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Ooops..</h1>
                <h3>Strona, której szukasz nie istnieje</h3>
            </div>
        </div>
    )
}

export default PageNotFound