interface ImageProps {
    image: any; 
}
const RandomImage: React.FC<ImageProps> = ({image}) => {

    return (
        <figure className="max-w-lg mx-auto">
          <img className="h-auto max-w-full rounded-lg" src={image?.image} alt="image description" />
          <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{image?.name}</figcaption>
        </figure>
    );
}

export default RandomImage;