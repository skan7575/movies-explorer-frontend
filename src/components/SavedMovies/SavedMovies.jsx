import './SavedMovies.css'
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
function SavedMovies() {
    return(
        <>
            <Header />
            <section className='movies'>
                <SearchForm />
                <MoviesCardList />
            </section>
            <Footer />
        </>
    )
}
export default SavedMovies