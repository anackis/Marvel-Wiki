
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import setContent from "../../utils/setContent";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";


const SinglePage = ({Component, dataType}) => {

  console.log(useParams());
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [metaName, setMetaName] = useState(null);
  const {loading, error, getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

  useEffect(() => {
    setMetaName("Comics/Character Page")
    updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const updateData = () => {
    clearError();

    /* eslint-disable */
    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed')); 
        break;
      default: 
        console.log("Unexpected error")
    }
    /* eslint-disable */
  }

  const onDataLoaded = (data) => {
    setData(data);
    data.name ? setMetaName(data.name) : setMetaName(data.title);
  }

  // const errorMessage = error ? <ErrorMessage/> : null;
  // const spinner = loading ? <Spinner/> : null;
  // const content = !(loading || error || !data) ? <Component data={data}/> : null;


  return (
      <>
        <Helmet>
          <meta
            name="description"
            content="Comics/Character Page"
          />
          <title>{`${metaName} Page`}</title>
        </Helmet>
        <AppBanner/>
        {setContent(process, Component, data)}
        {/* {errorMessage}
        {spinner}
        {content} */}
      </>
    );
  };

  export default SinglePage;