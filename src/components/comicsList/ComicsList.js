
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import './comicsList.scss';


const setConent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting': 
            return <Spinner/>;
            // break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            // break;
        case 'confirmed':
            return <Component/>;
            // break;
        case 'error':
            return <ErrorMessage/>;
            // break;
        default: 
            throw new Error('Unexpected process state');
    }
}


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsOffset, setComicsOffset] = useState(20000);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComicsList(comicsOffset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateComicsList = (comicsOffset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(comicsOffset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 7) {
            ended = true;
        } 

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setComicsOffset(comicsOffset => comicsOffset + 9);
        setComicsEnded(comicsEnded => ended);
    }

    const list = <ComicsListItem comicsList={comicsList}/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {setConent(process, () => list, newItemLoading)}
            {/* {list} */}
            {/* {errorMessage}
            {spinner} */}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => updateComicsList(comicsOffset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicsListItem = (props) => {
    const comicsList = props.comicsList
    
    
    const comicsItemOfList = comicsList.map((item) => {
        return (
            <li className="comics__item" key={item.id}>
            <Link to={`/comics/${item.id}`}>
                <img src={item.thumbnail} alt="comics_img" className="comics__item-img"/>
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price}</div>
            </Link>
        </li>
        )
    })

    return (
        <ul className="comics__grid">
            {comicsItemOfList}
        </ul>
    )


}

export default ComicsList;