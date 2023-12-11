import { brush, music, pencil, star } from "@/app/assets/icons";
import { image1, image2 } from "@/app/assets/images";
import { StaticImageData } from "next/image";

interface Post {
    creator: string;
    creatorImage: StaticImageData;
    art: StaticImageData;
    artdescription: string;
    description: string;
    code: string;
    licence: string;
    href: string;
    id:string;
  }
  
  
  
 export const Post:Post[] = [
    {
        creator: "creator123",
        creatorImage: image2 ,
        art: image1,
        description: "My first AI creation! I am happy to post my art from my latest collections!",
        code: "CC-BY-NC-ND",
        licence: "",
        href: "",
        artdescription:star,
        id:"1"
    },
    {
        creator: "creator123",
        creatorImage: image2 ,
        art: image2,
        description: "My first AI creation! I am happy to post my art from my latest collections!",
        code: "CC-BY-NC-ND",
        licence: "",
        href: "",
        artdescription:pencil,
        id:"2"


    },
    {
        creator: "creator123",
        creatorImage: image2 ,
        art: image1,
        description: "My first AI creation! I am happy to post my art from my latest collections!",
        code: "CC-BY-NC-ND",
        licence: "",
        href: "",
        artdescription:music,
        id:"3"


    },
    {
        creator: "creator123",
        creatorImage: image2 ,
        art: image2,
        description: "My first AI creation! I am happy to post my art from my latest collections!",
        code: "CC-BY-NC-ND",
        licence: "",
        href: "",
        artdescription:brush,
        id:"4"


    },
   
]