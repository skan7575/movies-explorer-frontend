import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
function Movies() {
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
export default Movies
