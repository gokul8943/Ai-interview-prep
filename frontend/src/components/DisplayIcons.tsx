import React, { useEffect, useState } from 'react';
import { cn, getTechLogos } from '@/lib/utils';

interface TechIconProps {
  techStack: string[];
}

const DisplayTechIcons: React.FC<TechIconProps> = ({ techStack }) => {
  const [techIcons, setTechIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    const fetchTechIcons = async () => {
      const icons = await getTechLogos(techStack);
      setTechIcons(icons);
    };

    fetchTechIcons();
  }, [techStack]);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            'relative group bg-dark-300 rounded-full p-2 flex flex-center',
            index >= 1 && '-ml-3'
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <img
            src={url}
            alt={tech}
            width={20}
            height={20}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
