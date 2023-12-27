import { getBlogs } from '@/app/services/cms.service';
import Image from 'next/image';
import { FC } from 'react';
import './Blogs.scss';

interface BlogItem {
  id: number;
  title: string;
  link: string;
  description: string;
  imageURL: string;
}

interface Blog {
  heading: string;
  link: string;
  btnText: string;
  blogList: BlogItem[];
}

interface BlogItemProps {
  blog: BlogItem;
}

const BlogItem: FC<BlogItemProps> = ({ blog }) => {
  const { title, description, link, imageURL } = blog;
  return (
    <div className='blog-item mb-10 grid gap-6 md:grid-cols-2'>
      <div className='blog-image-container justify-self-end md:order-2 md:mb-0'>
        <Image
          src={imageURL}
          alt={title}
          className='blog-img rounded-md'
          height={600}
          width={600}
        />
      </div>
      <div className='blog-content order-2 basis-full md:order-1 md:basis-6/12'>
        <h4 className='blog-title mb-4 text-xl font-bold'>{title}</h4>
        <p className='blog-description font-dm-sans-text mb-6'>{description}</p>
        <a
          className='btn-primary btn btn-outline'
          href={link}
          target='_blank'
          rel='noreferrer'
        >
          See More
        </a>
      </div>
    </div>
  );
};

const Blogs: FC = async () => {
  let blog: Blog | null = null;
  try {
    const response: Response = await getBlogs();
    blog = await response.json();
  } catch (error) {
    console.log(error);
  }

  if (!blog) return null;

  const { heading, link, btnText, blogList } = blog;

  return (
    <div className='blogs res-container'>
      <h1 className='font-secondary-heading my-10'>{heading}</h1>
      <div className='pb-4'>
        {blogList.map((blogItem) => (
          <BlogItem key={blogItem.id} blog={blogItem} />
        ))}
      </div>
      <div className='my-10 flex justify-center'>
        <a
          className='btn-primary btn btn-outline'
          href={link}
          target='_blank'
          rel='noreferrer'
        >
          {btnText}
        </a>
      </div>
    </div>
  );
};

export default Blogs;
