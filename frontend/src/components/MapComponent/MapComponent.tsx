import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
export const MapCompontent = () => {
    const geoUrl = "";
	return (
		<div>
			<ComposableMap>
				<Geographies geography={geoUrl}>
					{({ geographies }) =>
						geographies.map((geo) => (
							<Geography key={geo.rsmKey} geography={geo} />
						))
					}
				</Geographies>
			</ComposableMap>

		</div>
	);
};