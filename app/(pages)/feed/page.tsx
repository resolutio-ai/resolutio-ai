'use client';

import {
  MoreIcon,
  booknnarkIcon,
  evidencForm,
  eyeIcon,
  messageIcon,
  usersIcon,
} from '@/app/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FeedPost, Search } from '@/app/components';
import { SingleFeedPost } from '@/app/components/FeedComponents';
// interface Post {
//   creator: string;
//   creatorImage: string;
//   art: string;
//   artdescription: string;
//   description: string;
//   code: string;
//   licence: string;
//   href: string;
//   id: string;
// }
const API_URL =
  'https://gist.githack.com/tamuno777/a838d3e0484b4477bf6e2031c43cbd3b/raw/3fec981e05b059fbe9d18190076f0a906ac360bd/feedPosts';

const Feed: FC = () => {
  // const [feedPosts, setFeedPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   fetch(API_URL)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const decodedPosts = data.map((item: any) => ({
  //         ...item,
  //         art: `data:image/${item.imageType};base64,${item.imageBase64}`,
  //       }));
  //       setFeedPosts(decodedPosts);
  //     });
  // }, []);

  return (
    <div className=' w-5/6  pr-2 md:pt-5   '>
      <Search placeholder={''} />
      <div
        className=' align-center md:align-center my-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:justify-center md:gap-10 
'
      >
        {FeedPost.map((feed) => (
          <SingleFeedPost key={feed.id} feed={feed} />
        ))}
      </div>
    </div>
  );
};
export default Feed;
