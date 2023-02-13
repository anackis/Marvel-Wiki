
import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();    
    }

    
    updateCharList = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)  
            .catch(this.onError)   
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],  /// char === char : char
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))  
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false 
        })
    }

    
    
    // char__item_selected
    render() {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state
       
        const list = <ListItem charList={charList} handleClick={this.handleClick} onCharSelected={this.props.onCharSelected}/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? list : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.updateCharList(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeIndex: null 
        };
    }
    
    render () {
        const charList = this.props.charList
        const charId = this.props.onCharSelected
        // const activeClassName = this.state.activeIndex === i ? "char__item char__item_selected" : "char__item"
 
        const handleClick = (i) => {
            this.setState({ activeIndex: i });
        }
    
        const itemOfList = charList.map((item, i) => 
        <li 
            className={this.state.activeIndex === i ? 'char__item char__item_selected' : 'char__item'}
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
    
}

export default CharList;
