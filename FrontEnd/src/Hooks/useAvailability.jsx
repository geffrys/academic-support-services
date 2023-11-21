import { useState, useEffect } from "react";
import { getAvailabilityById } from "../api/availability.api";

function useAvailability(id, dependency) {
    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAvailability() {
            try {
                const result = await getAvailabilityById(id);
                setAvailability(await result.data);
                setLoading(false);
            } catch (error) {
                console.error("Error", error);
                setLoading(false);
            }
        }

        fetchAvailability();
    }, [dependency]);

    if (loading) {
        return { loading: true, availability: null };
    }
    
    return availability;
}

export default useAvailability;