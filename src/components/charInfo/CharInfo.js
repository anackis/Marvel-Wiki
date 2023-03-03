
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import setConent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    

    // const skeleton = char || loading || error ? null : <Skeleton/>
    // const errorMesasage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {setConent(process, View, char)}
            {/* {skeleton}
            {errorMesasage}
            {spinner}
            {content} */}
        </div>
    )
    
    
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const style = thumbnail.includes("image_not_available.jpg") ? {objectFit: "contain"} : null;
    const comicIdFromList = comics.length === 0 ? '' : comics[0].resourceURI.substring(43);
    

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
                            <Link to={`/comics/${comicIdFromList}`}>
                                {item.name}
                            </Link>
                        </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;