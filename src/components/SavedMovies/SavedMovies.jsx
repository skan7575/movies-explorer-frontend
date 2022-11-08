import './SavedMovies.css'
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
function SavedMovies() {
    return(
        <>
            <Header />
            <main className='movies'>
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}
export default SavedMovies