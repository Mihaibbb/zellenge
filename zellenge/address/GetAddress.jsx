import * as Linking from "expo-linking";

const getURL = async () => {
    const url = await Linking.getInitialURL();

    const ipAddressV1 = url.split("://")[1];
    
    const ipAddress = `http://${ipAddressV1.split(":")[0]}:443`;
    console.log(ipAddress);
    return ipAddress;
};

export default getURL;
