import PropTypes from 'prop-types';

function Cards({ name, image, description , onClick})  {
  return (
    <>
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105" onClick={onClick} >
        <img className="w-full h-48 object-cover" src={image} alt={name} />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </>
  );
}

Cards.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cards;
