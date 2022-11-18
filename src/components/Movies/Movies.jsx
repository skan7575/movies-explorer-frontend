import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
function Movies() {
    return(
        <>
            <Header />
            <main className='movies'>
                <SearchForm />
                <MoviesCardList />
                <button className='movies-card-button' type="button" name="more">Ещё</button>
            </main>
            <Footer />
        </>
    )
}
export default Movies
