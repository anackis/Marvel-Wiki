
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import AppBanner from "../appBanner/AppBanner";


const SinglePage = ({Component, dataType}) => {

  console.log(useParams());
  const {id} = useParams();
  const [data, setData] = useState(null);
  const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const updateData = () => {
    clearError();

    /* eslint-disable */
    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded);
        // console.log('comic');
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded); 
        // console.log('char');
        break;
      // default:
      //   /// do nothing
    }
    /* eslint-disable */
  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !data) ? <Component data={data}/> : null;

  return (
      <>
        <AppBanner/>
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  };

  export default SinglePage;