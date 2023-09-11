// The initial page Expo Go starts. Redirect to our index ( login / signup ) page

import { Redirect } from "expo-router";

export default () => {
    return (
    <Redirect href="/index" />
    );
}