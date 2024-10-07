"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Title from "./Title";

function Description({ description }: { description: string }) {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const words = description.split(" ");
  const isLongDescription = words.length > 75;

  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };

  const displayedDescription =
    isLongDescription && !isFullDescriptionShown
      ? words.splice(0, 70).join(" ") + "..."
      : description;

  return (
    <article className='mt-4'>
      <Title text='Description' />
      <p className='text-muted-foreground font-light leading-loose'>
        {displayedDescription}
      </p>
      {isLongDescription && (
        <Button variant='link' className='pl-0' onClick={toggleDescription}>
          {isFullDescriptionShown ? "show less" : "show more"}
        </Button>
      )}
    </article>
  );
}
export default Description;
