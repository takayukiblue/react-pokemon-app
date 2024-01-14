import React from 'react';

const Card = ({ pokemon }) => {
  return (
    <div className="card" style={{ marginTop: '50px' }}>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      name: {pokemon.name}
      <br />
      weight: {pokemon.weight}
    </div>
  );
};

export default Card;
