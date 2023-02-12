
import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,     /// char === char : char
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false, 
            error: true
        }) 
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMesasage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
               {skeleton}
               {errorMesasage}
               {spinner}
               {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const style = thumbnail.includes("image_not_available.jpg") ? {objectFit: "contain"} : null;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={style} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">{comics.length === 0 ? "No Comics" : "Comics:"}</div>
            <ul className="char__comics-list">
                {
                    comics.slice(0,10).map((item, i) => {
                        return(
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;