import { getBlogs } from '@/app/services';
import Image from 'next/image';
import styles from './Blogs.module.css';

type BlogItem = {
  id: number;
  title: string;
  link: string;
  description: string;
  imageURL: string;
};

type Blog = {
  heading: string;
  link: string;
  btnText: string;
  blogList: BlogItem[];
};

type BlogItemProps = {
  blog: BlogItem;
};

const BlogItem = ({ blog }: BlogItemProps) => {
  const { title, description, link, imageURL } = blog;
  return (
    <div className='mb-10 grid gap-6 md:grid-cols-2'>
      <div
        className={`justify-self-end md:order-2 md:mb-0 ${styles.blogImageContainer}`}
      >
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

export const Blogs = async () => {
  let blog: Blog | null = null;

  const response: Response = await getBlogs();
  blog = await response.json();

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
