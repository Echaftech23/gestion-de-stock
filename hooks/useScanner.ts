import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

const useScanner = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scannedData, setScannedData] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
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