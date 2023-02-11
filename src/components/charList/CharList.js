
import { Component } from 'react';

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
        this.updateChar();
    }

    onCharLoaded = (charList) => {
        this.setState({
            charList     /// char === char : char
        })
        
    }

    updateChar = () => {
        this.marvelService  
            .getAllCharacters()
            // .then(res => {
            //     this.setState(res)
            //     console.log(res);
            // })
            .then(this.onCharLoaded)
            
    }

    render() {
        const {charList, res} = this.state
        // console.log(charList);
        // console.log(res)
        
        return (
            <div className="char__list">
                <ListItem charList={charList}/>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

const ListItem = (props) => {
    const charList = props.charList
    
    const itemOfList = charList.map((item, i) => 
        <li key={i++} className="char__item">
            <img src={item.thumbnail} style={item.thumbnail.includes("image_not_available.jpg") ? {objectFit: "contain"} : null} alt="abyss"/>
            <div className="char__name">{item.name}</div>
        </li> 
    )
    return (
        <ul className="char__grid">
            {itemOfList}
        </ul> 
    )

    


    // const {name, description, thumbnail, homepage, wiki} = charList
    // const itemOfList = charList.map((item) => 
    //     <li className="char__item">
    //         <img src={item.thumbnail} alt="abyss"/>
    //         <div className="char__name">{item.name}</div>
    //      </li> 
    // )
    // return itemOfList

    // const numbers = [1, 2, 3, 4, 5];
    // const listItems = numbers.map((number) =>
    // <li>{number}</li>
    // );

    // return listItems
    

   
    // const {name, description, thumbnail, homepage, wiki} = charList
    // return (
    //     <li className="char__item">
    //         <img src={thumbnail} alt="abyss"/>
    //         <div className="char__name">{name}</div>
    //     </li>
    // )
}

export default CharList;
