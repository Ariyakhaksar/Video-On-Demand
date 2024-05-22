import React from "react";

type Props = {
   title: string;
};

const TitleLabelPages = ({ title }: Props) => {
   return (
      <div className="w-full relative bg-zinc-200 dark:bg-zinc-800 rounded-lg px-5 py-3">
         <span className="w-[3px] h-2/3 bg-orange-500 dark:bg-orange-300 absolute right-0 top-1/2 -translate-y-1/2 rounded-lg"></span>
         <h1 className="text-2xl font-[800] text-orange-500 dark:text-orange-300">
            {title}
         </h1>
      </div>
   );
};

export default TitleLabelPages;
