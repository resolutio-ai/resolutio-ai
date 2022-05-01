import { Box, Container, Grid, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import * as Axios from 'axios';
import Link from "next/link";

const ImageVerification = (props) => {
  const posts = props.data;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts?.map((item) => (
          <Grid item xs={2} sm={4} md={4}  key={item.cached_file_url}>
            <img
              sx={{ width: 20, height: 20 }}
              src={`${item.cached_file_url}`}
              srcSet={`${item.cached_file_url}`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={`Similarity: ${item.similarity}`}
              subtitle={<span>Chain: {item.chain}</span>}
              position="below"
            />
          </Grid>
        ))}
      </Grid >


      {/* <ol>
        {posts?.map((post, index) => (
          <li key={index}>
            <img src={post.cached_file_url} alt="Italian Trulli" />
          </li>
        ))}
      </ol> */}
    </Box>
  )
}


export default ImageVerification;

export const getStaticProps = async () => {
  console.log('api call started');
  const instance = Axios.create({
    baseURL: 'https://api.nftport.xyz/v0/',
    // timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'a7e303a5-7023-41fb-a7a0-8fb93a6af965'
    }
  });
  // const res = await Axios.get("duplicates/urls");

  const res = await instance.post('duplicates/urls', {
    "url": "https://www.larvalabs.com/cryptopunks/cryptopunk7597.png",
    "page_number": 1,
    "page_size": 50,
    "threshold": 0.9
  })
  // .then((response) => {
  //   console.log('data recived');
  //   console.log(response);
  // }, (error) => {
  //   console.log('API error');
  //   console.log(error);
  // });
  console.log(res.data.similar_nfts)

  return {
    // props: { data: [] },
    props: { data: res.data.similar_nfts },
  };
};