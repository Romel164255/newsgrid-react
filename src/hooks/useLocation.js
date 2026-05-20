import { useEffect, useState } from "react";

// India's geographic centre as the default fallback
const INDIA_DEFAULT = {
  country: "in",
  city: "India",
  lat: 20.5937,   // ← real coordinates so weather always loads
  lon: 78.9629
};

export default function useLocation() {

  const [location, setLocation] = useState(INDIA_DEFAULT);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      // SUCCESS — user granted location permission
      async (position) => {

        try {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Reverse-geocode to get human-readable country + city name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
          );

          const data = await response.json();

          setLocation({
            country: data.countryCode?.toLowerCase() || "in",
            city:    data.city || data.locality || "India",
            lat,
            lon
          });

        }
        catch (error) {
          // Reverse geocode failed — keep India defaults (already set)
          console.log("[useLocation] reverse geocode failed:", error);
        }

      },

      // DENIED or unavailable — defaults already set in useState above
      () => {
        console.log("[useLocation] location denied — using India defaults");
      }

    );

  }, []);

  return location;

}
