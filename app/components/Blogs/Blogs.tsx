import { FC } from 'react';

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface BlogItemProps {
  blog: Blog;
}

const BlogItem: FC<BlogItemProps> = ({ blog }) => {
  const { title, description, image } = blog;
  return (
    <div className='blog-item mb-10 flex'>
      <div className='blog-content mr-4 basis-full md:basis-6/12'>
        <h4 className='blog-title font-bold'> {title}</h4>
        <p className='blog-description'>{description}</p>
      </div>
      <div className='blog-image'>
        <img src={image} alt='blog' width={450} height={250} />
      </div>
    </div>
  );
};

const Blogs: FC = () => {
  const blogs = [
    {
      id: 1,
      title: 'Art Collaboration and Authorship Issues',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      image:
        'https://miro.medium.com/v2/resize:fit:700/1*vXLhT9V3KmK5eWLhgwy0-A.jpeg',
    },
    {
      id: 2,
      title: 'Licensing vs Assignment of IP rights in PFP Projects',
      description:
        'In continuation of our discussion on PFP projects, an interesting occurrence that took place last week was the announcement made by Mousebelt, to create an ‘instruction manual to Bored Ape Yacht Club (BAYC) owners to utilize the IP rights of their NFTs.',
      image: 'https://miro.medium.com/max/700/1*HLzCLRlffwBXZ1F7RWmpIg.jpeg',
    },
    {
      id: 3,
      title: 'Specific Issues of Contract Law Concerning PFP Projects',
      description:
        'We have already established in Sushruti’s article that legal contracts play an important role in defining the rights and obligations of the parties involved in a transaction concerning PFP NFTs. Therefore, we shall now examine what such a contract actually contains and which provisions are particularly advisable.',
      image: 'https://miro.medium.com/max/700/1*TQbUrYRvYviHHuYRyzBetg.png',
    },
  ];
  return (
    <div className='blogs container mx-auto px-4'>
      <h1 className='font-montserra-heading'>Blogs</h1>
      <div className=''>
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
