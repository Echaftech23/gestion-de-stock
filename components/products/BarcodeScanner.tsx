import React from 'react';
import { View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarcodeScanner = () => {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scannedData, setScannedData] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScannedData(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <BarCodeScanner
                onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
                style={{ flex: 1 }}
            />
            {scannedData && (
                <Button title={'Tap to Scan Again'} onPress={() => setScannedData(null)} />
            )}
            {scannedData && <Text>{scannedData}</Text>}
        </View>
    );
};

export default BarcodeScanner;