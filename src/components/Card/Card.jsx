import React from "react";

const Card = ({
  cardStyle,
  key,
  image,
  kilograms,
  title,
  name,
  description,
  children,
}) => {
  return (
    <div
      key={key}
      className="bg-white shadow-lg w-80 max-w-sm rounded-lg w-full h-auto"
    >
      <div
        className="w-full h-56 rounded-t-lg bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span className="absolute top-2 left-2 rounded-full py-4 px-2 bg-primary text-white font-semibold text-sm">
          {kilograms}/kg
        </span>
      </div>
      <div className="py-2 px-5 h-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{title}</h1>
          <h2 className="text-sm text-gray-400">{kilograms}kg</h2>
        </div>
        <section>
          <span className="text-sm text-gray-400">{name}</span>
          <div
            className={`text-sm text-gray-400 my-2 ${cardStyle}`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div>{children}</div>
        </section>
      </div>
    </div>
  );
};

export default Card;
