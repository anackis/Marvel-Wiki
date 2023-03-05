
import { useState, useEffect } from 'react';

// import setConent from '../../utils/setContent';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

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

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateCharList(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCharList = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)  
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        } 

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    }

    // const list = <ListItem charList={charList} onCharSelected={props.onCharSelected}/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {/* {errorMessage}
            {spinner} */}
            {/* {list} */}
            {setConent(process, () => ListItem(charList, props.onCharSelected), newItemLoading)}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => updateCharList(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


const ListItem = (charList, charId) => {
    const [activeIndex, setActiveIndex] = useState(null);
    
    // const charList = props.charList
    // const charId = props.onCharSelected

    const handleClick = (i) => {
        setActiveIndex(i);
    }
    
    const itemOfList = charList.map((item, i) => 
    <li 
        className={activeIndex === i ? 'char__item char__item_selected' : 'char__item'}
        key={item.id} 
        onClick={() => {
            charId(item.id);
            handleClick(i);
        }}>
        <img src={item.thumbnail} style={item.thumbnail.includes("image_not_available.jpg") ? {objectFit: "contain"} : null} alt="abyss"/>
        <div className="char__name">{item.name}</div>
    </li> 
    )
    return (
        <ul className="char__grid">
            {itemOfList}
        </ul> 
    )
}

export default CharList;
