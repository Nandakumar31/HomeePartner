export const getMapRegion = (origin: any, pickup: any, drop: any) => {
    // Ensure the coordinates are available
    if (!origin || !pickup || !drop) {
      console.error("Invalid coordinates");
      return null;
    }
  
    // Calculate the latitude and longitude bounds for the map
    const latitudes = [origin.latitude, pickup.latitude, drop.latitude];
    const longitudes = [origin.longitude, pickup.longitude, drop.longitude];
  
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);
  
    // Add some padding to zoom out slightly
    const latitudeDelta = maxLat - minLat + 0.05; // Adjust padding as needed
    const longitudeDelta = maxLon - minLon + 0.05; // Adjust padding as needed
  
    // Return the region object for the map
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLon + maxLon) / 2,
      latitudeDelta,
      longitudeDelta,
    };
  };
  