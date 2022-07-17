import React from 'react';
import imgPreloader from '../images/preload.gif'
function Preloader() {
	return (
			<div  className="preloader">
				<img  src={imgPreloader} className="preloader__image" alt="Загрузка данных"/>
			</div>
	);
}

export default Preloader;