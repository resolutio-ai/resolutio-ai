import { FC } from 'react';

import Image from 'next/image';
import './Blogs.scss';

interface Blog {
  id: number;
  title: string;
  link: string;
  description: string;
  imageURL: string;
}

interface BlogItemProps {
  blog: Blog;
}

const BlogItem: FC<BlogItemProps> = ({ blog }) => {
  const { title, description, link, imageURL } = blog;
  return (
    <div className='blog-item mb-10 grid gap-6 md:grid-cols-2'>
      <div className='blog-image-container justify-self-end md:order-2 md:mb-0'>
        <Image src={imageURL} alt={title} className='blog-img rounded-md' height={400} width={400} />
      </div>
      <div className='blog-content order-2 basis-full md:order-1 md:basis-6/12'>
        <h4 className='blog-title mb-4 text-xl font-bold'>{title}</h4>
        <p className='blog-description font-dm-sans-text mb-6'>{description}</p>
        <a className='btn btn-outline' href={link} target='_blank'>
          See More
        </a>
      </div>
    </div>
  );
};

const Blogs: FC = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/resolutio-ai/CRM/main/data/mediumArticles.json'
  );
  const blogs: Blog[] = await response.json();
  return (
    <div className='blogs res-container'>
      <h1 className='font-secondary-heading my-10'>Blogs</h1>
      <div className='pb-4'>
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
