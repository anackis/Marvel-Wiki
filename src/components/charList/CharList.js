
import { Component } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();    
    }

    onRequest = (offset) => {
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)  
            .catch(this.onError)   

    }

    updateCharList = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)  
            .catch(this.onError)   
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,  /// char === char : char
            loading: false    
        })  
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false 
        })
    }

    render() {
        const {charList, loading, error} = this.state
       
        
        const list = <ListItem charList={charList} onCharSelected={this.props.onCharSelected}/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? list : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const ListItem = (props) => {
    const charList = props.charList
    const CharId = props.onCharSelected
    
    const itemOfList = charList.map((item) => 
        <li className="char__item" key={item.id} onClick={() => CharId(item.id)}>
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
