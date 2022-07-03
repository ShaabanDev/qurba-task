export interface IRestaurantInputs {
    name: string;
    unique_name: string;
    location: {
        type: string,
        coordinates: [Number]
    };
    cuisine: [string];
}

