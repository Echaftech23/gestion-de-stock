import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

const useScanner = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scannedData, setScannedData] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScannedData(data);
        // You can add additional logic here to handle the scanned data
    };

    return {
        hasPermission,
        scannedData,
        handleBarCodeScanned,
    };
};

export default useScanner;