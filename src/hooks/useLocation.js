import { useEffect, useState } from "react";

export default function useLocation() {

  const [location, setLocation] = useState({
    country: "in",
    city: "India"
  });

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
          );

          const data = await response.json();

          setLocation({
            country:
              data.countryCode?.toLowerCase() || "in",

            city:
              data.city ||
              data.locality ||
              "India"
          });

        }
        catch (error) {

          console.log(error);

          setLocation({
            country: "in",
            city: "India"
          });

        }

      },

      () => {

        setLocation({
          country: "in",
          city: "India"
        });

      }

    );

  }, []);

  return location;

}